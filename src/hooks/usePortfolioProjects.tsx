import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  client: string | null;
  service_category: string;
  featured_image: string | null;
  images: string[];
  status: 'draft' | 'published';
  display_order: number;
  created_at: string;
  updated_at: string;
  // New enhanced fields
  objectives: string | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  technologies: string[] | null;
  services_provided: string[] | null;
  project_url: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  duration: string | null;
  year: string | null;
}

export type PortfolioProjectInsert = Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>;
export type PortfolioProjectUpdate = Partial<PortfolioProjectInsert>;

export function usePortfolioProjects(adminMode = false) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!adminMode) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;
      setProjects((data as PortfolioProject[]) || []);
    } catch (error) {
      console.error('Error fetching portfolio projects:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de charger les projets',
      });
    } finally {
      setIsLoading(false);
    }
  }, [adminMode, toast]);

  useEffect(() => {
    fetchProjects();

    // Subscribe to realtime updates for immediate sync
    const channel = supabase
      .channel('portfolio-projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_projects',
        },
        (payload) => {
          console.log('Portfolio project changed:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newProject = payload.new as PortfolioProject;
            if (adminMode || newProject.status === 'published') {
              setProjects((prev) => [...prev, newProject].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedProject = payload.new as PortfolioProject;
            setProjects((prev) => {
              if (!adminMode && updatedProject.status !== 'published') {
                // Remove from list if unpublished in public mode
                return prev.filter((p) => p.id !== updatedProject.id);
              }
              const exists = prev.find((p) => p.id === updatedProject.id);
              if (exists) {
                return prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
                  .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
              } else if (adminMode || updatedProject.status === 'published') {
                return [...prev, updatedProject].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
              }
              return prev;
            });
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setProjects((prev) => prev.filter((p) => p.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects, adminMode]);

  const createProject = async (project: PortfolioProjectInsert) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      
      setProjects((prev) => [...prev, data as PortfolioProject]);
      toast({
        title: 'Projet créé',
        description: 'Le projet a été ajouté au portfolio',
      });
      return data as PortfolioProject;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de créer le projet',
      });
      return null;
    }
  };

  const updateProject = async (id: string, updates: PortfolioProjectUpdate) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? (data as PortfolioProject) : p))
      );
      toast({
        title: 'Projet mis à jour',
        description: 'Les modifications ont été enregistrées',
      });
      return data as PortfolioProject;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet',
      });
      return null;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: 'Projet supprimé',
        description: 'Le projet a été retiré du portfolio',
      });
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer le projet',
      });
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `portfolio/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('media').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Impossible d'uploader l'image",
      });
      return null;
    }
  };

  return {
    projects,
    isLoading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadImage,
  };
}

export const serviceCategories = [
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'community-management', label: 'Community Management' },
  { value: 'creation-contenu', label: 'Création de Contenu' },
  { value: 'design-branding', label: 'Design & Branding' },
  { value: 'developpement-web', label: 'Développement Web' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'applications-mobiles', label: 'Applications Mobiles' },
  { value: 'automatisation-ia', label: 'Automatisation & IA' },
  { value: 'seo', label: 'SEO & Visibilité' },
  { value: 'gadgets-numeriques', label: 'Gadgets Numériques' },
  { value: 'audit-digital', label: 'Audit Digital' },
];
