import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setSession(null);
      setRole(null);
      setRoleLoading(false);
      return;
    }
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadRole = async () => {
      if (!supabase) return;
      if (!session?.user?.id) {
        setRole(null);
        setRoleLoading(false);
        return;
      }
      setRoleLoading(true);
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        if (error) throw error;
        setRole(data?.role || null);
      } catch {
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };
    loadRole();
  }, [session]);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white px-6">
        <div className="max-w-lg text-center">
          <div className="text-xl font-semibold mb-2">Supabase is not configured</div>
          <div className="text-white/60 text-sm">
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable admin access.
          </div>
        </div>
      </div>
    );
  }

  if (loading || roleLoading) {
    // Show a spinner or nothing while checking session
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
