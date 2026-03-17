import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { supabase } from '../../supabaseClient';
import {
  LayoutDashboard,
  FolderGit2,
  Images,
  MessagesSquare,
  Users,
  Plus,
  Edit3,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
  Save,
  Eye,
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const SECTIONS = [
  { id: 'projects', label: 'Projects', icon: <FolderGit2 className="h-4 w-4" /> },
  { id: 'gallery', label: 'Gallery', icon: <Images className="h-4 w-4" /> },
  { id: 'messages', label: 'Messages', icon: <MessagesSquare className="h-4 w-4" /> },
  { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
];

export const AdminPanel = () => {
  const { theme } = useTheme();
  const [active, setActive] = React.useState('projects');
  const [content, setContent] = useState({
    projects: [],
    gallery: [],
    messages: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // If null, we are creating
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const ensureSupabase = () => {
    if (!supabase) {
      alert('Supabase is not configured.');
      return false;
    }
    return true;
  };

  const projectPayload = (v) => ({
    title: v.title || '',
    description: v.description || '',
    url: v.url || '',
    status: v.status || 'Launched',
    owner: v.owner || '',
    sort_order: Number.isFinite(Number(v.sort_order)) ? Number(v.sort_order) : 0,
  });

  const galleryPayload = (v) => ({
    title: v.title || '',
    url: v.url || '',
    type: v.type || 'Image',
  });

  const userPayload = (v) => ({
    role: v.role || 'user',
  });

  const getGalleryStoragePathFromUrl = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const marker = '/storage/v1/object/public/gallery/';
      const idx = u.pathname.indexOf(marker);
      if (idx === -1) return null;
      const path = u.pathname.slice(idx + marker.length);
      return decodeURIComponent(path);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!supabase) {
      console.warn('Supabase not configured.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (projectsError) throw projectsError;

      const { data: gallery, error: galleryError } = await supabase.from('gallery').select('*');
      if (galleryError) throw galleryError;

      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (messagesError) throw messagesError;

      const { data: users, error: usersError } = await supabase.from('users').select('*');
      if (usersError) throw usersError;

      setContent({
        projects: projects || [],
        gallery: gallery || [],
        messages: messages || [],
        users: users || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null, section = 'default') => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      // Default empty form based on active section
      if (active === 'projects') {
        const defaultStatus = section === 'progress' ? 'In progress' : 'Launched';
        setFormData({ title: '', description: '', url: '', status: defaultStatus, owner: '', sort_order: 0 });
      } else if (active === 'gallery') {
        setFormData({ title: '', url: '', type: 'Image' });
      } else {
        setFormData({});
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleFileUpload = async (e) => {
    try {
      if (!ensureSupabase()) return;
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const filePath = `${fileName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file, { upsert: false, cacheControl: '3600', contentType: file.type });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from('gallery').getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) throw new Error('Unable to generate public URL.');

      setFormData({ 
        ...formData, 
        url: publicUrl,
        type: file.type.startsWith('image/') ? 'Image' : 'Video'
      });
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (!ensureSupabase()) return;
      if (active === 'projects') {
        const payload = projectPayload(formData);
        if (editingItem) {
          const { error } = await supabase
            .from('projects')
            .update(payload)
            .eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('projects')
            .insert([payload]);
          if (error) throw error;
        }
        await fetchData();
        handleCloseModal();
      } else if (active === 'messages') {
        // Only allow updating status for messages
        const { error } = await supabase
          .from('messages')
          .update({ status: formData.status })
          .eq('id', editingItem.id);
        
        if (error) throw error;
        await fetchData();
        handleCloseModal();
      } else if (active === 'gallery') {
        const payload = galleryPayload(formData);
        if (editingItem) {
          const { error } = await supabase.from('gallery').update(payload).eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('gallery').insert([payload]);
          if (error) throw error;
        }
        await fetchData();
        handleCloseModal();
      } else if (active === 'users') {
         if (editingItem) {
           const { error } = await supabase.from('users').update(userPayload(formData)).eq('id', editingItem.id);
           if (error) throw error;
         }
         await fetchData();
         handleCloseModal();
      }
      // Add logic for other sections here if needed
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (!ensureSupabase()) return;
      if (active === 'projects') {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else if (active === 'messages') {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else if (active === 'gallery') {
        const item = content.gallery.find((g) => g.id === id);
        const path = getGalleryStoragePathFromUrl(item?.url);
        if (path) {
          await supabase.storage.from('gallery').remove([path]);
        }
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else if (active === 'users') {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };


  const renderSection = () => {
    if (loading) {
      return <div className="p-4 text-center text-white/60">Loading data...</div>;
    }

    switch (active) {
      case 'projects': {
        const launchedProjects = content.projects.filter((p) => p.status !== 'In progress');
        const progressProjects = content.projects.filter((p) => p.status === 'In progress');

        return (
          <div className="space-y-8">
            {/* Launched Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Launched Projects</h3>
                <button
                    onClick={() => handleOpenModal(null, 'launched')}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Launched
                </button>
              </div>
              {launchedProjects.length === 0 ? (
                <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>No launched projects found.</p>
              ) : (
                <div className="space-y-4">
                {launchedProjects.map((p) => (
                  <div
                    key={p.id || p.title}
                    className={`rounded-2xl border p-4 flex items-center justify-between group ${
                      theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <span className={`text-xs font-mono w-6 text-center ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{p.sort_order || '-'}</span>
                       <div>
                        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{p.title}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Owner: {p.owner}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${
                        theme === 'dark' ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                      }`}>
                        {p.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className={`p-1.5 rounded-lg transition ${
                            theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                          }`}
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>

            {/* Current Progress Projects Section */}
            <div>
              <div className={`flex items-center justify-between mb-4 pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Current Progress Projects</h3>
                <button
                    onClick={() => handleOpenModal(null, 'progress')}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Progress
                </button>
              </div>
              {progressProjects.length === 0 ? (
                <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>No progress projects found.</p>
              ) : (
                <div className="space-y-4">
                {progressProjects.map((p) => (
                  <div
                    key={p.id || p.title}
                    className={`rounded-2xl border p-4 flex items-center justify-between group ${
                      theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <span className={`text-xs font-mono w-6 text-center ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{p.sort_order || '-'}</span>
                       <div>
                        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{p.title}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Owner: {p.owner}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${
                        theme === 'dark' ? 'bg-blue-500/15 text-blue-200 border-blue-400/30' : 'bg-blue-500/10 text-blue-700 border-blue-500/20'
                      }`}>
                        {p.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className={`p-1.5 rounded-lg transition ${
                            theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                          }`}
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'gallery':
        return (
          <div className="space-y-4">
            {content.gallery.length === 0 ? (
              <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>No gallery items found.</p>
            ) : (
              content.gallery.map((item) => (
                <div
                  key={item.id || item.title}
                  className={`rounded-2xl border p-4 flex items-center justify-between group ${
                    theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {item.type === 'Video' ? (
                       <video src={item.url} className={`w-12 h-12 object-cover rounded-lg ${theme === 'dark' ? 'bg-black/50' : 'bg-black/10'}`} />
                    ) : (
                       <img src={item.url} alt={item.title} className={`w-12 h-12 object-cover rounded-lg ${theme === 'dark' ? 'bg-black/50' : 'bg-black/10'}`} />
                    )}
                    <div>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.title}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs mr-4 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Updated: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}</p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className={`p-1.5 rounded-lg transition ${
                          theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                        }`}
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-4">
            {content.messages.length === 0 ? (
              <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>No messages found.</p>
            ) : (
              content.messages.map((item) => (
                <div
                  key={item.id || item.subject}
                  className={`rounded-2xl border p-4 flex items-center justify-between group ${
                    theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.subject}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item.from_email || item.from}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      item.status === 'Unread' 
                        ? (theme === 'dark' ? 'bg-blue-500/10 text-blue-200 border-blue-500/30' : 'bg-blue-500/10 text-blue-700 border-blue-500/20')
                        : (theme === 'dark' ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20')
                    }`}>
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className={`p-2 rounded-lg transition ${
                        theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                      }`}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'users':
        return (
          <div className="space-y-4">
            {content.users.length === 0 ? (
              <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>No users found.</p>
            ) : (
              content.users.map((item) => (
                <div
                  key={item.id || item.email}
                  className={`rounded-2xl border p-4 flex items-center justify-between group ${
                    theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.name}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${
                      theme === 'dark' ? 'bg-blue-500/10 text-blue-100 border-blue-400/30' : 'bg-blue-500/10 text-blue-700 border-blue-500/20'
                    }`}>
                      {item.role}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className={`p-1.5 rounded-lg transition ${
                          theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                        }`}
                        title="Edit Role"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO path="/admin" title="Admin | Optimum Tech" description="Admin panel for projects, gallery, messages, and users." />
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 py-32 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`rounded-3xl border shadow-2xl transition-colors duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-white/5 backdrop-blur' : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl shadow-xl'
            }`}
          >
            <div className={`flex items-center gap-3 px-4 py-4 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-black/5'
            }`}>
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${
                theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <LayoutDashboard className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
              </span>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Control</p>
                <p className="font-semibold">Admin panel</p>
              </div>
            </div>
            <div className="p-3 space-y-2">
              {SECTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all border ${
                    active === item.id
                      ? (theme === 'dark' ? 'border-white/20 bg-white/10 text-white shadow-lg' : 'border-[#007BFF]/20 bg-[#007BFF]/10 text-[#007BFF] shadow-lg')
                      : (theme === 'dark' ? 'border-transparent text-white/70 hover:text-white hover:bg-white/5' : 'border-transparent text-black/70 hover:text-black hover:bg-black/5')
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${
                    active === item.id ? 'bg-[#007BFF]' : 'bg-gray-400'
                  }`} />
                </button>
              ))}
            </div>
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}>
              <div className={`rounded-2xl border p-4 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-[#007BFF]/10 bg-[#007BFF]/5'
              }`}>
                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-[#007BFF]/70'}`}>Quick actions</p>
                <div className="space-y-2 text-sm">
                  <button
                    onClick={() => handleOpenModal()}
                    className={`flex items-center gap-2 w-full rounded-xl px-3 py-2 transition ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-[#007BFF]/10 hover:bg-[#007BFF]/15 text-[#007BFF]'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    New item
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.section
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border p-6 shadow-2xl transition-colors duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-white/5 backdrop-blur' : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className={`text-xs uppercase tracking-[0.15em] ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Section</p>
                <h2 className="text-2xl font-semibold">{SECTIONS.find((s) => s.id === active)?.label}</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Manage {active} content from here.</p>
              </div>
              <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                <ShieldCheck className="h-4 w-4 text-[#007BFF]" />
                Protected area
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className={`rounded-2xl border p-4 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'
              }`}>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Status</p>
                <p className="text-lg font-semibold">Online</p>
              </div>
              <div className={`rounded-2xl border p-4 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'
              }`}>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Last updated</p>
                <p className="text-lg font-semibold">Moments ago</p>
              </div>
              <div className={`rounded-2xl border p-4 flex items-center gap-3 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'
              }`}>
                <Sparkles className="h-5 w-5 text-[#007BFF]" />
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Mode</p>
                  <p className="text-lg font-semibold">Focus</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
          </motion.section>
        </div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl flex flex-col max-h-[85vh] ${
                theme === 'dark' ? 'bg-[#0f1520] border-white/10 text-white' : 'bg-white border-black/10 text-black'
              }`}
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-xl font-semibold">
                  {editingItem ? 'Edit Item' : 'New Item'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className={`rounded-full p-2 transition ${
                    theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex flex-col h-full">
                <div className="flex-grow">
                {active === 'projects' && (
                  <>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition h-24 resize-none ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Status</label>
                        <select
                          value={formData.status || 'In progress'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                          }`}
                        >
                          <option value="Launched" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Launched</option>
                          <option value="In progress" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>In progress</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Owner / Client</label>
                        <input
                          type="text"
                          value={formData.owner || ''}
                          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                          className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Project URL</label>
                      <input
                        type="url"
                        value={formData.url || ''}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Display Order</label>
                      <input
                        type="number"
                        value={formData.sort_order || 0}
                        onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      />
                    </div>
                  </>
                )}
                
                {active === 'gallery' && (
                  <>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Upload Media</label>
                      <div className="flex items-center gap-4">
                        <label className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition ${
                          theme === 'dark' ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-black/5 hover:bg-black/10'
                        }`}>
                          <input 
                            type="file" 
                            accept="image/*,video/*" 
                            className="hidden" 
                            onChange={handleFileUpload}
                            disabled={uploading}
                          />
                          {uploading ? 'Uploading...' : 'Choose File'}
                        </label>
                        {formData.url && (
                          <span className="text-xs text-green-500 font-medium">File uploaded!</span>
                        )}
                      </div>
                    </div>
                    {formData.url && (
                      <div className={`rounded-xl overflow-hidden border p-2 ${
                        theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/5 bg-black/5'
                      }`}>
                        {formData.type === 'Video' ? (
                          <video src={formData.url} controls className="w-full h-48 object-cover rounded-lg" />
                        ) : (
                          <img src={formData.url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                        )}
                      </div>
                    )}
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Type</label>
                      <select
                        value={formData.type || 'Image'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      >
                        <option value="Image" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Image</option>
                        <option value="Video" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Video</option>
                      </select>
                    </div>
                  </>
                )}

                {active === 'users' && (
                  <>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Name</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.name || ''}
                        className={`w-full rounded-xl border px-4 py-2 opacity-70 cursor-not-allowed transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Role</label>
                      <select
                        value={formData.role || 'user'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      >
                        <option value="user" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>User</option>
                        <option value="admin" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Admin</option>
                      </select>
                    </div>
                  </>
                )}

                {active === 'messages' && (
                  <>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>From</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.from_email || ''}
                        className={`w-full rounded-xl border px-4 py-2 opacity-70 cursor-not-allowed transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Message Body</label>
                      <textarea
                        readOnly
                        value={formData.body || ''}
                        className={`w-full rounded-xl border px-4 py-2 h-32 resize-none opacity-70 cursor-not-allowed transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Status</label>
                      <select
                        value={formData.status || 'Unread'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:border-[#007BFF]/50 transition ${
                          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                        }`}
                      >
                        <option value="Unread" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Unread</option>
                        <option value="Read" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Read</option>
                        <option value="Replied" className={theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'}>Replied</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Fallback for other sections */}
                {active !== 'projects' && active !== 'messages' && active !== 'gallery' && active !== 'users' && (
                  <div className="text-center py-8 text-white/50">
                    Editing for {active} is not yet implemented.
                  </div>
                )}
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10 shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007BFF] text-white text-sm font-medium hover:bg-[#007BFF]/90 transition shadow-lg shadow-[#007BFF]/20"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};
