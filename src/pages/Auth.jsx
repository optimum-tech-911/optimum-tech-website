import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { Lock, LogIn, UserPlus, Phone, Mail, User } from 'lucide-react';
import { supabase } from '../../supabaseClient';

import { useTheme } from '../context/ThemeContext';
import { isAdminSession } from '../utils/adminAuth';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [mode, setMode] = React.useState('login'); // login | signup
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = React.useState(null);
  const allowSignup = import.meta.env.DEV && import.meta.env.VITE_ENABLE_ADMIN_SIGNUP === 'true';

  const onChange = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }));

  React.useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isAdminSession(session)) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    setError(null);

    try {
      if (mode === 'signup') {
        if (!allowSignup) {
          throw new Error('Sign up is disabled.');
        }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              name: form.name,
              phone: form.phone,
            },
          },
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;

        if (!isAdminSession(data?.session)) {
          setError(
            'Login succeeded, but this account is not recognized as an admin yet. Please check the admin role setup.'
          );
        }

        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const heading = mode === 'login' ? 'Welcome back' : 'Create an account';
  const cta = mode === 'login' ? 'Log in' : 'Sign up';
  const sub = mode === 'login' ? 'Use your credentials to access the admin panel.' : 'Enter your details to manage the admin panel.';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO path="/auth" title="Connexion | Optimum Tech" description="Espace de connexion administrateur." robots="noindex, nofollow" />
      <Navbar />
      <main className="flex-1 w-full flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative h-full overflow-hidden rounded-3xl border p-10 shadow-2xl transition-colors duration-500 ${
                theme === 'dark' ? 'border-white/10 bg-white/5 backdrop-blur' : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl shadow-xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-fuchsia-500/10 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-sm mb-4">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                    theme === 'dark' ? 'bg-white/10' : 'bg-black/5'
                  }`}>
                    <Lock className="h-5 w-5 text-[#007BFF]" />
                  </span>
                  <span className={`uppercase tracking-[0.2em] font-semibold text-xs ${
                    theme === 'dark' ? 'text-white/70' : 'text-black/70'
                  }`}>
                    Admin Console
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-4">Optimum Tech Control Center</h1>
                <p className={`leading-relaxed mb-8 ${
                  theme === 'dark' ? 'text-white/70' : 'text-black/70'
                }`}>
                  Manage projects, gallery items, inbound messages, and user roles from one clean,
                  ChatGPT-inspired dashboard. Fast, focused, and distraction-free.
                </p>
                <div className="space-y-4">
                  {['Unified sidebar navigation', 'Secure login with email + password', 'Quick actions for content updates', 'Minimal, high-contrast UI'].map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                        theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#007BFF] shadow-[0_0_12px_rgba(0,123,255,0.8)]" />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-white/80' : 'text-black/80'
                      }`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-3xl border p-8 shadow-2xl transition-colors duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-white/5 backdrop-blur' : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Admin access</p>
                <h2 className="text-2xl font-semibold">{heading}</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{sub}</p>
              </div>
              <div className={`inline-flex rounded-full border p-1 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'
              }`}>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    mode === 'login' 
                      ? (theme === 'dark' ? 'bg-white/15 text-white shadow' : 'bg-black/10 text-black shadow') 
                      : (theme === 'dark' ? 'text-white/60' : 'text-black/60')
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </button>
                {allowSignup && (
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      mode === 'signup' 
                        ? (theme === 'dark' ? 'bg-white/15 text-white shadow' : 'bg-black/10 text-black shadow') 
                        : (theme === 'dark' ? 'text-white/60' : 'text-black/60')
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign up
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className={`mb-4 rounded-xl border p-3 text-sm ${
                theme === 'dark' 
                  ? 'border-red-500/20 bg-red-500/10 text-red-200' 
                  : 'border-red-500/30 bg-red-500/5 text-red-600'
              }`}>
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} htmlFor="name">
                      Name
                    </label>
                    <div className="relative">
                      <User className={`h-4 w-4 absolute left-3 top-3 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={onChange('name')}
                        className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]/70 ${
                          theme === 'dark' 
                            ? 'border-white/10 bg-white/5 text-white placeholder:text-white/40' 
                            : 'border-black/10 bg-black/5 text-black placeholder:text-black/40'
                        }`}
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} htmlFor="phone">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className={`h-4 w-4 absolute left-3 top-3 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={onChange('phone')}
                        className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]/70 ${
                          theme === 'dark' 
                            ? 'border-white/10 bg-white/5 text-white placeholder:text-white/40' 
                            : 'border-black/10 bg-black/5 text-black placeholder:text-black/40'
                        }`}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className={`h-4 w-4 absolute left-3 top-3 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange('email')}
                    className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]/70 ${
                      theme === 'dark' 
                        ? 'border-white/10 bg-white/5 text-white placeholder:text-white/40' 
                        : 'border-black/10 bg-black/5 text-black placeholder:text-black/40'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`h-4 w-4 absolute left-3 top-3 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} />
                  <input
                    id="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={onChange('password')}
                    className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF]/70 ${
                      theme === 'dark' 
                        ? 'border-white/10 bg-white/5 text-white placeholder:text-white/40' 
                        : 'border-black/10 bg-black/5 text-black placeholder:text-black/40'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#007BFF] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 hover:scale-[1.01] transition-transform"
              >
                {cta}
              </button>
            </form>

            <div className={`mt-6 text-center text-xs ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              By continuing you agree to the terms and privacy of Optimum Tech.
            </div>
            <div className="mt-4 text-center text-xs">
              <Link to="/" className="text-[#007BFF] hover:underline underline-offset-4">
                Back to site
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
