import { useParams } from 'react-router-dom';
import { localPages, servicePages } from '../data/seoPages.js';
import { SeoLandingPage } from './SeoLandingPage.jsx';
import { NotFoundPage } from './NotFound.jsx';

export const SeoLandingRoute = () => {
  const { slug } = useParams();
  const servicePage = servicePages.find((page) => page.slug === slug);
  const localPage = localPages.find((page) => page.slug === slug);
  const page = servicePage || localPage;

  if (!page) return <NotFoundPage />;

  return (
    <SeoLandingPage
      page={page}
      categoryLabel={localPage ? 'Local' : 'Services'}
    />
  );
};
