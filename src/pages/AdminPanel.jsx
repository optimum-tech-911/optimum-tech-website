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
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
  Save,
  Eye,
} from 'lucide-react';

const SECTIONS = [
  { id: 'projects', label: 'Projects', icon: <FolderGit2 className="h-4 w-4" /> },
  { id: 'gallery', label: 'Gallery', icon: <Images className="h-4 w-4" /> },
  { id: 'messages', label: 'Messages', icon: <MessagesSquare className="h-4 w-4" /> },
  { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
];

export const AdminPanel = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
      const { data: gallery } = await supabase.from('gallery').select('*');
      const { data: messages } = await supabase.from('messages').select('*');
      const { data: users } = await supabase.from('users').select('*');

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
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

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
      if (active === 'projects') {
        if (editingItem) {
          const { error } = await supabase
            .from('projects')
            .update(formData)
            .eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('projects')
            .insert([formData]);
          if (error) throw error;
        }
        fetchData();
        handleCloseModal();
      } else if (active === 'messages') {
        // Only allow updating status for messages
        const { error } = await supabase
          .from('messages')
          .update({ status: formData.status })
          .eq('id', editingItem.id);
        
        if (error) throw error;
        fetchData();
        handleCloseModal();
      } else if (active === 'gallery') {
        if (editingItem) {
          const { error } = await supabase.from('gallery').update(formData).eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('gallery').insert([formData]);
          if (error) throw error;
        }
        fetchData();
        handleCloseModal();
      } else if (active === 'users') {
         if (editingItem) {
           const { error } = await supabase.from('users').update(formData).eq('id', editingItem.id);
           if (error) throw error;
         }
         fetchData();
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
      if (active === 'projects') {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        fetchData();
      } else if (active === 'messages') {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw error;
        fetchData();
      } else if (active === 'gallery') {
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) throw error;
        fetchData();
      } else if (active === 'users') {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;
        fetchData();
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
      case 'projects':
        const launchedProjects = content.projects.filter(p => p.status !== 'In progress');
        const progressProjects = content.projects.filter(p => p.status === 'In progress');

        return (
          <div className="space-y-8">
            {/* Launched Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Launched Projects</h3>
                <button
                    onClick={() => handleOpenModal(null, 'launched')}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add Launched
                </button>
              </div>
              {launchedProjects.length === 0 ? (
                <p className="text-white/50">No launched projects found.</p>
              ) : (
                <div className="space-y-4">
                {launchedProjects.map((p) => (
                  <div
                    key={p.id || p.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-mono text-white/40 w-6 text-center">{p.sort_order || '-'}</span>
                       <div>
                        <p className="font-semibold text-white">{p.title}</p>
                        <p className="text-xs text-white/60">Owner: {p.owner}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-emerald-500/15 text-emerald-200 border border-emerald-400/30">
                        {p.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
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
              <div className="flex items-center justify-between mb-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white">Current Progress Projects</h3>
                <button
                    onClick={() => handleOpenModal(null, 'progress')}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add Progress
                </button>
              </div>
              {progressProjects.length === 0 ? (
                <p className="text-white/50">No progress projects found.</p>
              ) : (
                <div className="space-y-4">
                {progressProjects.map((p) => (
                  <div
                    key={p.id || p.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-mono text-white/40 w-6 text-center">{p.sort_order || '-'}</span>
                       <div>
                        <p className="font-semibold text-white">{p.title}</p>
                        <p className="text-xs text-white/60">Owner: {p.owner}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-blue-500/15 text-blue-200 border border-blue-400/30">
                        {p.status}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
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
      case 'gallery':
        return (
          <div className="space-y-4">
            {content.gallery.length === 0 ? (
              <p className="text-white/50">No gallery items found.</p>
            ) : (
              content.gallery.map((item) => (
                <div
                  key={item.id || item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {item.type === 'Video' ? (
                       <video src={item.url} className="w-12 h-12 object-cover rounded-lg bg-black/50" />
                    ) : (
                       <img src={item.url} alt={item.title} className="w-12 h-12 object-cover rounded-lg bg-black/50" />
                    )}
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-white/60">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-white/60 mr-4">Updated: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}</p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
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
              <p className="text-white/50">No messages found.</p>
            ) : (
              content.messages.map((item) => (
                <div
                  key={item.id || item.subject}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white">{item.subject}</p>
                    <p className="text-xs text-white/60">{item.from_email || item.from}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      item.status === 'Unread' 
                        ? 'bg-blue-500/10 text-blue-200 border-blue-500/30' 
                        : 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30'
                    }`}>
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
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
              <p className="text-white/50">No users found.</p>
            ) : (
              content.users.map((item) => (
                <div
                  key={item.id || item.email}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/60">{item.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-blue-500/10 text-blue-100 border border-blue-400/30">
                      {item.role}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1020] via-[#0d1117] to-[#0b1020] text-white">
      <SEO path="/admin" title="Admin | Optimum Tech" description="Admin panel for projects, gallery, messages, and users." />
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                <LayoutDashboard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-white/60">Control</p>
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
                      ? 'border-white/20 bg-white/10 text-white shadow-lg'
                      : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500" />
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/20 via-indigo-500/15 to-fuchsia-500/15 p-4">
                <p className="text-xs text-white/70 mb-2">Quick actions</p>
                <div className="space-y-2 text-sm">
                  <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 w-full rounded-xl bg-white/10 px-3 py-2 hover:bg-white/15 transition"
                  >
                    <Plus className="h-4 w-4" />
                    New item
                  </button>
                  <button className="flex items-center gap-2 w-full rounded-xl bg-white/10 px-3 py-2 hover:bg-white/15 transition">
                    <Edit3 className="h-4 w-4" />
                    Edit selected
                  </button>
                  <button className="flex items-center gap-2 w-full rounded-xl bg-white/10 px-3 py-2 hover:bg-white/15 transition">
                    <Send className="h-4 w-4" />
                    Publish changes
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
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/50">Section</p>
                <h2 className="text-2xl font-semibold">{SECTIONS.find((s) => s.id === active)?.label}</h2>
                <p className="text-sm text-white/60">Manage {active} content from here.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="h-4 w-4" />
                Protected area
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 p-4">
                <p className="text-xs text-white/60">Status</p>
                <p className="text-lg font-semibold text-white">Online</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Last updated</p>
                <p className="text-lg font-semibold text-white">Moments ago</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-200" />
                <div>
                  <p className="text-xs text-white/60">Mode</p>
                  <p className="text-lg font-semibold text-white">Focus</p>
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
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f1520] p-6 shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-xl font-semibold">
                  {editingItem ? 'Edit Item' : 'New Item'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full p-2 hover:bg-white/10 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {active === 'projects' && (
                  <>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition h-24 resize-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Status</label>
                        <select
                          value={formData.status || 'In progress'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
                        >
                          <option value="Launched" className="bg-[#0f1520]">Launched</option>
                          <option value="In progress" className="bg-[#0f1520]">In progress</option>
                          <option value="Review" className="bg-[#0f1520]">Review</option>
                          <option value="Planning" className="bg-[#0f1520]">Planning</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Owner / Client</label>
                        <input
                          type="text"
                          value={formData.owner || ''}
                          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Project URL</label>
                      <input
                        type="url"
                        value={formData.url || ''}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Display Order (e.g. 1, 2, 3)</label>
                      <input
                        type="number"
                        value={formData.sort_order || 0}
                        onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-blue-500/50 transition"
                      />
                    </div>
                  </>
                )}
                
                {active === 'gallery' && (
                  <>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Upload Media</label>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition">
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
                          <span className="text-xs text-green-400">File uploaded!</span>
                        )}
                      </div>
                    </div>
                    {formData.url && (
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 p-2">
                        {formData.type === 'Video' ? (
                          <video src={formData.url} controls className="w-full h-48 object-cover rounded-lg" />
                        ) : (
                          <img src={formData.url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Type</label>
                      <select
                        value={formData.type || 'Image'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Image" className="bg-[#0f1520]">Image</option>
                        <option value="Video" className="bg-[#0f1520]">Video</option>
                      </select>
                    </div>
                  </>
                )}

                {active === 'users' && (
                  <>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Name</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.name || ''}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Email</label>
                      <input
                        type="email"
                        readOnly
                        value={formData.email || ''}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Role</label>
                      <select
                        value={formData.role || 'user'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="user" className="bg-[#0f1520]">User</option>
                        <option value="admin" className="bg-[#0f1520]">Admin</option>
                        <option value="visitor" className="bg-[#0f1520]">Visitor</option>
                      </select>
                    </div>
                  </>
                )}

                  <>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">From</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.from_email || ''}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Phone</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.phone || 'N/A'}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Subject</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.subject || ''}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Message Body</label>
                      <textarea
                        readOnly
                        value={formData.body || 'No content available.'}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none h-32 resize-none opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Status</label>
                      <select
                        value={formData.status || 'Unread'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Unread" className="bg-[#0f1520]">Unread</option>
                        <option value="Read" className="bg-[#0f1520]">Read</option>
                        <option value="Replied" className="bg-[#0f1520]">Replied</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Fallback for other sections */}
                {active !== 'projects' && active !== 'messages' && (
                  <div className="text-center py-8 text-white/50">
                    Editing for {active} is not yet implemented.
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-500/20"
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
