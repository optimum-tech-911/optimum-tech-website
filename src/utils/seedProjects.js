import { supabase } from '../../supabaseClient';

export const seedProjects = async () => {
  try {
    const launchedProjects = [
      { title: 'CandyPlanet.fr', url: 'https://candyplanet.fr' },
      { title: 'cabinetdentairesete.fr', url: 'https://cabinetdentairesete.fr/' },
      { title: 'Marcellino Mockup', url: 'https://marcellino-mockup.pages.dev/' },
      { title: 'Abattoire Seddik', url: 'https://abattoire-seddik.pages.dev/' },
      { title: 'Sweet Serve Admin', url: 'https://sweet-serve-admin1.pages.dev/' },
      { title: 'Carioca Artisan Orders', url: 'https://carioca-artisan-orders.pages.dev/' },
      { title: 'MedicalPost.co.uk', url: 'https://medicalpost.co.uk/' },
      { title: 'CertifiedRubbish.co.uk', url: 'https://certifiedrubbish.co.uk/' },
      { title: 'EasySMS.uk', url: 'https://easysms.uk/' },
      { title: 'Medidesk.pl', url: 'https://medidesk.pl/' },
      { title: 'team-nkg-reimagine-round1', url: 'https://team-nkg-reimagine-round1.vercel.app/' },
      { title: 'VOPA.se', url: 'https://www.vopa.se/' },
      { title: 'ABEV.ai', url: 'https://www.abev.ai/' },
      { title: 'NutriFoodKeto.sk', url: 'https://nutrifoodketo.sk/' },
      { title: 'RoadAngel.sk', url: 'https://main.roadangel.sk/' },
      { title: 'AVIS.sk', url: 'https://www.avis.sk/' },
      { title: 'Camasys.com', url: 'https://www.camasys.com/' }
    ];

    const progressProjects = [
      { title: 'DentalPole - Implantologie & Parodontologie', url: 'https://dentalpole-frontignan.vercel.app/', description: 'Implants dentaires, rééducation du sourire et chirurgie guidée.' },
      { title: 'HB ELEC', url: 'https://hb-elec.vercel.app/', description: 'Votre Électricien à Balaruc-les-Bains.' },
      { title: 'Chafik Hamdi', url: 'https://chafik-hamdi.vercel.app/', description: 'Plaquiste & Peintre à Toulouse.' },
      { title: 'Multi Travaux By Chris', url: 'https://chris-multi.vercel.app/', description: 'Rénovation intérieure et aménagements extérieurs.' },
      { title: 'Maison de Saney', url: 'https://maison-de-saney.vercel.app/', description: 'Salon d\'onglerie & nail art à Béziers.' },
      { title: 'Boucherie Sidi Boucif', url: 'https://boucherie-sidi-boucif.vercel.app/', description: 'Artisan Boucher Béziers - Excellence Halal & Française.' },
      { title: 'Stylook Coiffure', url: 'https://stylook-coiffure-bien-tre.vercel.app/', description: 'L\'excellence de la Coiffure & Esthétique à Béziers.' },
      { title: 'Guyajeux Agde', url: 'https://guyajeux-agde.vercel.app/', description: 'Jeux de Société & Café Ludique.' },
      { title: 'Happy Sharing Events', url: 'https://happy-sharing-events.vercel.app/', description: 'Consultante RH & RSE Occitanie.' },
      { title: 'B.Barbaracreations', url: 'https://b-barbaracreations.vercel.app/', description: 'Bijoux Uniques faits main en Occitanie.' }
    ];

    // Deduplicate projects
    const { data: allProjects } = await supabase
      .from('projects')
      .select('id, url, created_at')
      .order('created_at', { ascending: true });

    if (allProjects && allProjects.length > 0) {
      const seenUrls = new Set();
      const duplicatesToDelete = [];

      for (const p of allProjects) {
        // Normalize URL for comparison (remove trailing slash)
        const normalizedUrl = p.url ? p.url.replace(/\/$/, '').toLowerCase() : '';
        
        if (seenUrls.has(normalizedUrl)) {
          duplicatesToDelete.push(p.id);
        } else {
          seenUrls.add(normalizedUrl);
        }
      }

      if (duplicatesToDelete.length > 0) {
        console.log(`Removing ${duplicatesToDelete.length} duplicate projects...`);
        await supabase.from('projects').delete().in('id', duplicatesToDelete);
      }
    }

    console.log('Syncing projects...');

    // Sync Launched Projects
    let launchedIndex = 1;
    for (const project of launchedProjects) {
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('url', project.url)
        .maybeSingle();

      if (!existing) {
        console.log(`Adding Launched project: ${project.title}`);
        await supabase.from('projects').insert({
          title: project.title,
          description: 'Project imported from legacy list.',
          url: project.url,
          status: 'Launched',
          owner: 'Client',
          sort_order: launchedIndex
        });
      } else {
         await supabase.from('projects').update({ sort_order: launchedIndex, status: 'Launched' }).eq('id', existing.id);
      }
      launchedIndex++;
    }

    // Sync Progress Projects
    let progressIndex = 1;
    for (const project of progressProjects) {
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('url', project.url)
        .maybeSingle();

      if (!existing) {
        console.log(`Adding Progress project: ${project.title}`);
        await supabase.from('projects').insert({
          title: project.title,
          description: project.description || 'Work in progress.',
          url: project.url,
          status: 'In progress',
          owner: 'Client',
          sort_order: progressIndex
        });
      } else {
         await supabase.from('projects').update({ 
           sort_order: progressIndex, 
           status: 'In progress',
           description: project.description // Update description if it exists
         }).eq('id', existing.id);
      }
      progressIndex++;
    }

  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};
