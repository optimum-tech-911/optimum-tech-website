const normalizeEmail = (value) => value?.trim().toLowerCase() || '';

export const getAdminEmailAllowlist = () =>
  (import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean);

export const getSessionRole = (session, profileRole = null) =>
  profileRole ||
  session?.user?.app_metadata?.role ||
  session?.user?.user_metadata?.role ||
  null;

export const isAdminSession = (session, profileRole = null) => {
  if (!session?.user) return false;

  if (getSessionRole(session, profileRole) === 'admin') {
    return true;
  }

  const email = normalizeEmail(session.user.email);
  return !!email && getAdminEmailAllowlist().includes(email);
};
