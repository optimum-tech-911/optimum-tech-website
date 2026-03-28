import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getAdminEmailAllowlist, isAdminSession } from '../utils/adminAuth';

export const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileRole, setProfileRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setSession(null);
      setProfileRole(null);
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
        setProfileRole(null);
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
        setProfileRole(data?.role || null);
      } catch (error) {
        console.warn('Unable to load admin role from users table:', error);
        setProfileRole(null);
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

  if (!isAdminSession(session, profileRole)) {
    const allowlistConfigured = getAdminEmailAllowlist().length > 0;
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white px-6">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
          <div className="text-xl font-semibold mb-2">Admin access not available</div>
          <div className="text-white/70 text-sm leading-relaxed">
            You are signed in, but this account is not recognized as an admin yet.
            {!allowlistConfigured && ' The app is currently relying on the database role check only.'}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/auth"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
            >
              Back to login
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5 transition"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
