-- Add new fields to portfolio_projects for enhanced project details
ALTER TABLE public.portfolio_projects
ADD COLUMN IF NOT EXISTS objectives TEXT,
ADD COLUMN IF NOT EXISTS problem TEXT,
ADD COLUMN IF NOT EXISTS solution TEXT,
ADD COLUMN IF NOT EXISTS results TEXT,
ADD COLUMN IF NOT EXISTS technologies TEXT[],
ADD COLUMN IF NOT EXISTS services_provided TEXT[],
ADD COLUMN IF NOT EXISTS project_url TEXT,
ADD COLUMN IF NOT EXISTS testimonial TEXT,
ADD COLUMN IF NOT EXISTS testimonial_author TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS year TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.portfolio_projects.objectives IS 'Project objectives and goals';
COMMENT ON COLUMN public.portfolio_projects.problem IS 'Client problem or challenge';
COMMENT ON COLUMN public.portfolio_projects.solution IS 'Solution provided';
COMMENT ON COLUMN public.portfolio_projects.results IS 'Results and benefits achieved';
COMMENT ON COLUMN public.portfolio_projects.technologies IS 'Technologies and tools used';
COMMENT ON COLUMN public.portfolio_projects.services_provided IS 'Services provided for this project';
COMMENT ON COLUMN public.portfolio_projects.project_url IS 'Live project URL if available';
COMMENT ON COLUMN public.portfolio_projects.testimonial IS 'Client testimonial quote';
COMMENT ON COLUMN public.portfolio_projects.testimonial_author IS 'Author of the testimonial';
COMMENT ON COLUMN public.portfolio_projects.duration IS 'Project duration';
COMMENT ON COLUMN public.portfolio_projects.year IS 'Year of completion';