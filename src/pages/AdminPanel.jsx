import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  LogOut,
  Mail,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  X,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SEO } from '../components/SEO.jsx';
import { supabase } from '../../supabaseClient';
import { useTheme } from '../context/ThemeContext';
import { AdminAnalytics } from '../components/AdminAnalytics.jsx';

const SECTIONS = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Clics, projets et parcours visiteurs.' },
  { id: 'projects', label: 'Projets', icon: FolderKanban, description: 'Catalogue réellement publié sur le portfolio.' },
  { id: 'messages', label: 'Messages', icon: Mail, description: 'Demandes reçues depuis le formulaire.' },
];

const emptyAnalytics = {
  total_events: 0,
  total_clicks: 0,
  unique_sessions: 0,
  project_clicks: 0,
  top_buttons: [],
  top_projects: [],
  top_pages: [],
  daily: [],
};

const inputClass = (theme) => `w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#1688ff]/60 ${
  theme === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-black/[0.03] text-black'
}`;

const slugify = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const sortProjects = (items) =>
  [...items].sort((left, right) => Number(left.sort_order || 0) - Number(right.sort_order || 0));

const buildEmptyProject = (items) => ({
  title: '',
  sector: 'Santé & Dentaire',
  category: 'health',
  project_type: '',
  url: '',
  image: '',
  logo: '',
  description: '',
  capabilitiesText: '',
  project_key: '',
  slug: '',
  source: 'client',
  status: 'Launched',
  visibility: 'public',
  owner: 'Client',
  featured: false,
  case_study: false,
  sort_order: items.length + 1,
});

export const AdminPanel = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState('analytics');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [analyticsDays, setAnalyticsDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const loadCoreData = async () => {
    if (!supabase) return;
    setLoading(true);
    setError('');
    try {
      const [projectResult, messageResult] = await Promise.all([
        supabase.from('projects').select('*').eq('visibility', 'public').order('sort_order'),
        supabase.from('messages').select('*').order('created_at', { ascending: false }),
      ]);
      if (projectResult.error) throw projectResult.error;
      if (messageResult.error) throw messageResult.error;
      setProjects(projectResult.data || []);
      setMessages(messageResult.data || []);
    } catch (loadError) {
      console.error(loadError);
      setError('Les données de l’administration ne peuvent pas être chargées.');
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async (days = analyticsDays) => {
    if (!supabase) return;
    setAnalyticsLoading(true);
    setError('');
    try {
      const { data, error: analyticsError } = await supabase.rpc('get_analytics_summary', { p_days: days });
      if (analyticsError) throw analyticsError;
      setAnalytics({ ...emptyAnalytics, ...data });
    } catch (loadError) {
      console.error(loadError);
      setError('Les statistiques ne peuvent pas être chargées.');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    loadCoreData();
    supabase?.auth.getUser().then(({ data }) => setAdminEmail(data?.user?.email || ''));
  }, []);

  useEffect(() => {
    if (active === 'analytics') loadAnalytics(analyticsDays);
  }, [active, analyticsDays]);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter((project) =>
      [project.title, project.sector, project.project_type, project.description]
        .some((value) => String(value || '').toLowerCase().includes(normalized)),
    );
  }, [projects, query]);

  const unreadMessages = messages.filter((message) => message.status === 'Unread').length;
  const activeSection = SECTIONS.find((section) => section.id === active);
  const isCreatingProject = Boolean(editingProject && !editingProject.id);

  const saveProject = async (event) => {
    event.preventDefault();
    if (!supabase || !editingProject) return;
    setSaving(true);
    setError('');
    const generatedKey = editingProject.project_key?.trim() || slugify(editingProject.title);
    const generatedSlug = editingProject.slug?.trim() || slugify(editingProject.title);
    const payload = {
      project_key: generatedKey,
      slug: generatedSlug,
      title: editingProject.title.trim(),
      description: editingProject.description.trim(),
      url: editingProject.url?.trim() || null,
      sector: editingProject.sector.trim(),
      category: editingProject.category || 'services',
      project_type: editingProject.project_type.trim(),
      image: editingProject.image?.trim() || `/projects/${generatedKey}.jpg`,
      logo: editingProject.logo?.trim() || null,
      source: editingProject.source || 'client',
      featured: Boolean(editingProject.featured),
      case_study: Boolean(editingProject.case_study),
      visibility: 'public',
      owner: editingProject.owner?.trim() || 'Client',
      sort_order: Number(editingProject.sort_order) || projects.length + 1,
      capabilities: String(editingProject.capabilitiesText || '')
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean)
        .slice(0, 8),
      status: 'Launched',
    };

    if (!generatedKey || !generatedSlug) {
      setError('Le projet a besoin d’un titre pour générer sa clé et son slug.');
      setSaving(false);
      return;
    }

    if (isCreatingProject) {
      const { data, error: insertError } = await supabase.from('projects').insert(payload).select('*').single();
      if (insertError) {
        setError('Le projet n’a pas pu être créé.');
      } else {
        setProjects((current) => sortProjects([...current, data]));
        setEditingProject(null);
      }
    } else {
      const { data, error: updateError } = await supabase
        .from('projects')
        .update(payload)
        .eq('project_key', editingProject.project_key)
        .select('*')
        .single();
      if (updateError) {
        setError('Le projet n’a pas pu être enregistré.');
      } else {
        setProjects((current) => sortProjects(current.map((project) => (
          project.project_key === editingProject.project_key ? data : project
        ))));
        setEditingProject(null);
      }
    }
    setSaving(false);
  };

  const openProject = (project) => setEditingProject({
    ...project,
    capabilitiesText: Array.isArray(project.capabilities) ? project.capabilities.join('\n') : '',
  });

  const openCreateProject = () => setEditingProject(buildEmptyProject(projects));

  const openMessage = async (message) => {
    setViewingMessage(message);
    if (message.status !== 'Unread' || !supabase) return;
    const { error: updateError } = await supabase.from('messages').update({ status: 'Read' }).eq('id', message.id);
    if (!updateError) {
      setMessages((current) => current.map((item) => item.id === message.id ? { ...item, status: 'Read' } : item));
      setViewingMessage({ ...message, status: 'Read' });
    }
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    window.location.assign('/auth');
  };

  const renderProjects = () => (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-bold">{projects.length} projets publiés</p>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Synchronisés avec le catalogue vérifié du portfolio.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 sm:w-80 ${theme === 'dark' ? 'border-white/10 bg-black/25' : 'border-black/10 bg-white'}`}>
            <Search className="h-4 w-4 text-[#1688ff]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un projet" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </label>
          <button type="button" onClick={openCreateProject} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1688ff] px-4 py-2.5 text-sm font-bold text-white">
            <Plus className="h-4 w-4" />
            Ajouter un projet
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredProjects.map((project) => (
          <article key={project.project_key} className={`overflow-hidden rounded-2xl border ${theme === 'dark' ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
            <div className="flex gap-4 p-4">
              <img src={project.image} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover object-top" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={`truncate text-xs font-semibold uppercase tracking-[0.14em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>{project.sector}</p>
                    <h3 className="mt-1 truncate text-lg font-bold">{project.title}</h3>
                    <p className={`mt-1 truncate text-[11px] ${theme === 'dark' ? 'text-white/35' : 'text-black/35'}`}>{project.project_key}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> En ligne
                  </span>
                </div>
                <p className={`mt-2 line-clamp-2 text-xs leading-5 ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>{project.description}</p>
              </div>
            </div>
            <div className={`flex items-center justify-between border-t px-4 py-3 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <span className={`truncate text-xs ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{project.project_type}</span>
              <div className="flex items-center gap-2">
                {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="rounded-lg p-2 hover:bg-white/10" aria-label={`Ouvrir ${project.title}`}><ExternalLink className="h-4 w-4" /></a>}
                <button type="button" onClick={() => openProject(project)} className="rounded-lg bg-[#1688ff]/10 p-2 text-[#1688ff] hover:bg-[#1688ff]/20" aria-label={`Modifier ${project.title}`}><Pencil className="h-4 w-4" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-3">
      {messages.length === 0 ? (
        <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>Aucun message reçu.</p>
      ) : messages.map((message) => (
        <button key={message.id} type="button" onClick={() => openMessage(message)} className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition hover:border-[#1688ff]/40 ${theme === 'dark' ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {message.status === 'Unread' && <span className="h-2 w-2 rounded-full bg-[#1688ff]" />}
              <p className="truncate font-semibold">{message.subject}</p>
            </div>
            <p className={`mt-1 truncate text-sm ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{message.from_email}</p>
          </div>
          <time className={`shrink-0 text-xs ${theme === 'dark' ? 'text-white/35' : 'text-black/35'}`}>{new Date(message.created_at).toLocaleDateString('fr-FR')}</time>
        </button>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#f4f4f6] text-black'}`}>
      <SEO path="/admin" title="Administration | Optimum Tech" description="Espace d’administration." robots="noindex, nofollow" />
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 pt-28 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-6 lg:pt-32">
        <aside className={`h-fit rounded-3xl border p-3 lg:sticky lg:top-28 ${theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'}`}>
          <div className="px-3 py-3">
            <p className="font-bold">Administration</p>
            <p className={`mt-1 truncate text-xs ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>{adminEmail}</p>
          </div>
          <nav className="mt-2 space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const count = section.id === 'projects' ? projects.length : section.id === 'messages' ? unreadMessages : null;
              return (
                <button key={section.id} type="button" onClick={() => setActive(section.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active === section.id ? 'bg-[#1688ff] text-white' : theme === 'dark' ? 'text-white/65 hover:bg-white/5 hover:text-white' : 'text-black/65 hover:bg-black/5 hover:text-black'}`}>
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                  {count !== null && <span className="ml-auto rounded-full bg-black/20 px-2 py-0.5 text-[10px]">{count}</span>}
                </button>
              );
            })}
          </nav>
          <button type="button" onClick={signOut} className={`mt-4 flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold text-red-400 transition ${theme === 'dark' ? 'border-white/10 hover:bg-red-500/10' : 'border-black/10 hover:bg-red-500/5'}`}>
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </aside>

        <section className={`min-h-[680px] rounded-3xl border p-5 md:p-7 ${theme === 'dark' ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
          <header className={`mb-7 flex items-start justify-between gap-4 border-b pb-6 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1688ff]">{activeSection.label}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{activeSection.description}</h1>
            </div>
            <button type="button" onClick={() => active === 'analytics' ? loadAnalytics() : loadCoreData()} className={`rounded-xl border p-2.5 ${theme === 'dark' ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`} aria-label="Actualiser">
              <RefreshCw className={`h-4 w-4 ${(loading || analyticsLoading) ? 'animate-spin' : ''}`} />
            </button>
          </header>

          {error && <div className="mb-6 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</div>}
          {loading && active !== 'analytics' ? <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>Chargement...</p> : null}
          {!loading && active === 'projects' ? renderProjects() : null}
          {!loading && active === 'messages' ? renderMessages() : null}
          {active === 'analytics' ? <AdminAnalytics summary={analytics} days={analyticsDays} onDaysChange={setAnalyticsDays} onRefresh={() => loadAnalytics()} loading={analyticsLoading} theme={theme} /> : null}
        </section>
      </main>

      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-[80] grid place-items-center p-4">
            <motion.button aria-label="Fermer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProject(null)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.form onSubmit={saveProject} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border p-6 ${theme === 'dark' ? 'border-white/10 bg-[#111]' : 'border-black/10 bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#1688ff]">{isCreatingProject ? 'Ajouter un projet' : 'Modifier le projet'}</p>
                  <h2 className="mt-1 text-2xl font-bold">{editingProject.title || 'Nouveau projet'}</h2>
                </div>
                <button type="button" onClick={() => setEditingProject(null)} className="rounded-full p-2 hover:bg-white/10"><X className="h-5 w-5" /></button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm">Nom<input required className={`mt-2 ${inputClass(theme)}`} value={editingProject.title} onChange={(event) => setEditingProject({ ...editingProject, title: event.target.value })} /></label>
                <label className="text-sm">Secteur<input required className={`mt-2 ${inputClass(theme)}`} value={editingProject.sector || ''} onChange={(event) => setEditingProject({ ...editingProject, sector: event.target.value })} /></label>
                <label className="text-sm">Catégorie
                  <select className={`mt-2 ${inputClass(theme)}`} value={editingProject.category || 'services'} onChange={(event) => setEditingProject({ ...editingProject, category: event.target.value })}>
                    <option value="health">Santé & Dentaire</option>
                    <option value="food">Restaurants & Food</option>
                    <option value="beauty">Beauté & Bien-être</option>
                    <option value="services">Artisans & Services</option>
                    <option value="auto">Auto & Garage</option>
                    <option value="apps">Applications web</option>
                  </select>
                </label>
                <label className="text-sm">Ordre d’affichage<input type="number" className={`mt-2 ${inputClass(theme)}`} value={editingProject.sort_order || 0} onChange={(event) => setEditingProject({ ...editingProject, sort_order: event.target.value })} /></label>
                <label className="text-sm sm:col-span-2">Type de projet<input required className={`mt-2 ${inputClass(theme)}`} value={editingProject.project_type || ''} onChange={(event) => setEditingProject({ ...editingProject, project_type: event.target.value })} /></label>
                <label className="text-sm sm:col-span-2">URL publique<input type="url" className={`mt-2 ${inputClass(theme)}`} value={editingProject.url || ''} onChange={(event) => setEditingProject({ ...editingProject, url: event.target.value })} /></label>
                <label className="text-sm">Clé projet
                  <input className={`mt-2 ${inputClass(theme)}`} value={editingProject.project_key || ''} onChange={(event) => setEditingProject({ ...editingProject, project_key: event.target.value })} placeholder={slugify(editingProject.title)} />
                </label>
                <label className="text-sm">Slug
                  <input className={`mt-2 ${inputClass(theme)}`} value={editingProject.slug || ''} onChange={(event) => setEditingProject({ ...editingProject, slug: event.target.value })} placeholder={slugify(editingProject.title)} />
                </label>
                <label className="text-sm sm:col-span-2">Image
                  <input className={`mt-2 ${inputClass(theme)}`} value={editingProject.image || ''} onChange={(event) => setEditingProject({ ...editingProject, image: event.target.value })} placeholder={`/projects/${(editingProject.project_key || slugify(editingProject.title) || 'nouveau-projet')}.jpg`} />
                </label>
                <label className="text-sm sm:col-span-2">Logo
                  <input className={`mt-2 ${inputClass(theme)}`} value={editingProject.logo || ''} onChange={(event) => setEditingProject({ ...editingProject, logo: event.target.value })} placeholder={`/projects/logos/${(editingProject.project_key || slugify(editingProject.title) || 'nouveau-projet')}.png`} />
                </label>
                <label className="text-sm sm:col-span-2">Description<textarea required rows="4" className={`mt-2 resize-none ${inputClass(theme)}`} value={editingProject.description || ''} onChange={(event) => setEditingProject({ ...editingProject, description: event.target.value })} /></label>
                <label className="text-sm sm:col-span-2">Fonctionnalités, une par ligne<textarea rows="5" className={`mt-2 resize-none ${inputClass(theme)}`} value={editingProject.capabilitiesText || ''} onChange={(event) => setEditingProject({ ...editingProject, capabilitiesText: event.target.value })} /></label>
              </div>
              <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-5">
                <button type="button" onClick={() => setEditingProject(null)} className="rounded-xl px-4 py-2 text-sm">Annuler</button>
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#1688ff] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Enregistrement...' : (isCreatingProject ? 'Créer le projet' : 'Enregistrer')}</button>
              </div>
            </motion.form>
          </div>
        )}

        {viewingMessage && (
          <div className="fixed inset-0 z-[80] grid place-items-center p-4">
            <button type="button" aria-label="Fermer" onClick={() => setViewingMessage(null)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <div className={`relative w-full max-w-xl rounded-3xl border p-6 ${theme === 'dark' ? 'border-white/10 bg-[#111]' : 'border-black/10 bg-white'}`}>
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-[#1688ff]">Message</p><h2 className="mt-1 text-2xl font-bold">{viewingMessage.subject}</h2></div><button type="button" onClick={() => setViewingMessage(null)} className="rounded-full p-2 hover:bg-white/10"><X className="h-5 w-5" /></button></div>
              <div className={`mt-5 space-y-2 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}><p>{viewingMessage.from_email}</p>{viewingMessage.phone && <p>{viewingMessage.phone}</p>}</div>
              <p className={`mt-6 whitespace-pre-wrap rounded-2xl p-4 leading-7 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>{viewingMessage.body}</p>
              <a href={`mailto:${viewingMessage.from_email}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1688ff] px-5 py-2.5 text-sm font-bold text-white"><Mail className="h-4 w-4" />Répondre par e-mail</a>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
