import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string;
  status: 'draft' | 'published';
  author_id: string | null;
  author_name: string;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category: string;
  status: 'draft' | 'published';
  author_name?: string;
}

export const useBlogPosts = (adminMode: boolean = false) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // In public mode, only fetch published posts
      if (!adminMode) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts((data as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('blog_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newPost = payload.new as BlogPost;
            // In public mode, only add if published
            if (adminMode || newPost.status === 'published') {
              setPosts(prev => [newPost, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedPost = payload.new as BlogPost;
            setPosts(prev => {
              // In public mode, filter out unpublished posts
              if (!adminMode && updatedPost.status !== 'published') {
                return prev.filter(p => p.id !== updatedPost.id);
              }
              // Update existing or add new (if just published)
              const exists = prev.find(p => p.id === updatedPost.id);
              if (exists) {
                return prev.map(p => p.id === updatedPost.id ? updatedPost : p);
              } else if (updatedPost.status === 'published') {
                return [updatedPost, ...prev];
              }
              return prev;
            });
          } else if (payload.eventType === 'DELETE') {
            const deletedPost = payload.old as BlogPost;
            setPosts(prev => prev.filter(p => p.id !== deletedPost.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [adminMode]);

  const createPost = async (input: BlogPostInput): Promise<BlogPost | null> => {
    try {
      const postData = {
        ...input,
        published_at: input.status === 'published' ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Article créé",
        description: input.status === 'published' ? "L'article a été publié." : "L'article a été enregistré comme brouillon.",
      });
      
      return data as BlogPost;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de créer l'article.",
      });
      return null;
    }
  };

  const updatePost = async (id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> => {
    try {
      // If changing to published, set published_at
      const updateData: any = { ...input };
      if (input.status === 'published') {
        const currentPost = posts.find(p => p.id === id);
        if (!currentPost?.published_at) {
          updateData.published_at = new Date().toISOString();
        }
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Article mis à jour",
        description: "Les modifications ont été enregistrées.",
      });
      
      return data as BlogPost;
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour l'article.",
      });
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé définitivement.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'article.",
      });
      return false;
    }
  };

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as BlogPost;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  };

  const incrementViews = async (id: string): Promise<void> => {
    try {
      const post = posts.find(p => p.id === id);
      if (post) {
        await supabase
          .from('blog_posts')
          .update({ views: post.views + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  return {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
    incrementViews,
    refetch: fetchPosts
  };
};
