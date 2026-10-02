import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import { AdminPanel } from './AdminPanel.jsx';
import { SEO } from '../components/SEO.jsx';

export const AdminRoute = () => (
  <>
    <SEO path="/admin" title="Administration | Optimum Tech" description="Espace d’administration." robots="noindex, nofollow" />
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  </>
);
