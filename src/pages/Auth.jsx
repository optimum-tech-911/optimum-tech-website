import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { Lock, LogIn, UserPlus, Phone, Mail, User } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('login'); // login | signup
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onChange = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
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
        if (data.session) {
          // If email confirmation is disabled, we get a session immediately
          navigate('/admin');
        } else {
          // Otherwise, we wait for email
          alert('Check your email for the confirmation link!');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const heading = mode === 'login' ? 'Welcome back' : 'Create an account';
  const cta = mode === 'login' ? 'Log in' : 'Sign up';
  const sub = mode === 'login' ? 'Use your credentials to access the admin panel.' : 'Enter your details to manage the admin panel.';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b1020] via-[#0d1117] to-[#0b1020] text-white">
      <SEO path="/auth" title="Auth | Optimum Tech" description="Admin login and signup page." />
      <Navbar />
      <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-fuchsia-500/10 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-sm text-blue-200/90 mb-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <Lock className="h-5 w-5" />
                  </span>
                  <span className="uppercase tracking-[0.2em] font-semibold text-xs text-white/70">
                    Admin Console
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-4">Optimum Tech Control Center</h1>
                <p className="text-white/70 leading-relaxed mb-8">
                  Manage projects, gallery items, inbound messages, and user roles from one clean,
                  ChatGPT-inspired dashboard. Fast, focused, and distraction-free.
                </p>
                <div className="space-y-4">
                  {['Unified sidebar navigation', 'Secure login with email + password', 'Quick actions for content updates', 'Minimal, high-contrast UI'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/5"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-xs text-white/50">
                  Tip: hook this form to Supabase Auth or your preferred provider to go live.
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-white/60">Admin access</p>
                <h2 className="text-2xl font-semibold">{heading}</h2>
                <p className="text-sm text-white/60">{sub}</p>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    mode === 'login' ? 'bg-white/15 text-white shadow' : 'text-white/60'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    mode === 'signup' ? 'bg-white/15 text-white shadow' : 'text-white/60'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  Sign up
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="text-xs text-white/60 mb-2 block" htmlFor="name">
                      Name
                    </label>
                    <div className="relative">
                      <User className="h-4 w-4 text-white/40 absolute left-3 top-3" />
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={onChange('name')}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/60 mb-2 block" htmlFor="phone">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-white/40 absolute left-3 top-3" />
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={onChange('phone')}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="text-xs text-white/60 mb-2 block" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-white/40 absolute left-3 top-3" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange('email')}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/60 mb-2 block" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 text-white/40 absolute left-3 top-3" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={onChange('password')}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 hover:scale-[1.01] transition-transform"
              >
                {cta}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-white/50">
              By continuing you agree to the terms and privacy of Optimum Tech.
            </div>
            <div className="mt-4 text-center text-xs">
              <Link to="/" className="text-blue-200 hover:text-blue-100 underline underline-offset-4">
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
