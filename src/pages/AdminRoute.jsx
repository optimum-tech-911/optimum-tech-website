import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import { AdminPanel } from './AdminPanel.jsx';

export const AdminRoute = () => (
  <ProtectedRoute>
    <AdminPanel />
  </ProtectedRoute>
);
