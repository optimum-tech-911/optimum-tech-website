import { supabase } from '../../supabaseClient';

export const seedProjects = async () => {
  try {
    // Check if projects exist
    const { count, error } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error checking projects:', error);
      return;
    }

    if (count === 0) {
      console.log('Seeding projects...');
      const sampleProjects = [
        {
          title: 'E-Commerce Platform',
          description: 'A high-performance online store built with Next.js and Shopify, featuring AI-powered product recommendations and lightning-fast checkout.',
          url: 'https://example.com/ecommerce',
          status: 'Launched',
          owner: 'Client A'
        },
        {
          title: 'Corporate Website',
          description: 'Modern, responsive website for a leading tech firm. Optimized for SEO and accessibility, achieving a 100/100 Lighthouse score.',
          url: 'https://example.com/corporate',
          status: 'Launched',
          owner: 'Client B'
        },
        {
          title: 'AI Automation Tool',
          description: 'Custom workflow automation to save 20+ hours per week. Integrates with Slack, Notion, and OpenAI to streamline internal processes.',
          url: 'https://example.com/ai-tool',
          status: 'In progress',
          owner: 'Internal'
        },
        {
          title: 'SaaS Dashboard',
          description: 'Real-time analytics dashboard for data visualization. Features interactive charts, dark mode, and user management.',
          url: 'https://example.com/dashboard',
          status: 'Review',
          owner: 'Client C'
        }
      ];

      const { error: insertError } = await supabase
        .from('projects')
        .insert(sampleProjects);

      if (insertError) {
        console.error('Error seeding projects:', insertError);
      } else {
        console.log('Projects seeded successfully!');
      }
    }
  } catch (err) {
    console.error('Unexpected error during seeding:', err);
  }
};
