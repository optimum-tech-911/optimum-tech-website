import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectCard = ({ title, desc, href }) => {
  const { theme } = useTheme();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const previewAnim = useMemo(() => {
    switch (device) {
      case 'tablet':
        return { width: '85%', radius: 18 };
      case 'mobile':
        return { width: '55%', radius: 22 };
      default:
        return { width: '100%', radius: 12 };
    }
  }, [device]);
  let host = href;
  try {
    host = new URL(href).hostname.replace('www.', '');
  } catch (err) {
    /* ignore invalid URL */
  }

  return (
    <motion.div
      className={`group rounded-3xl p-[1px] animate-gradient transition-shadow duration-500 ${
        theme === 'dark' 
          ? 'bg-[linear-gradient(90deg,#0A84FF,#7c3aed,#00E0B8,#0A84FF)] hover:shadow-glow shadow-2xl shadow-blue-500/10' 
          : 'bg-black/5 hover:shadow-xl'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className={`rounded-3xl overflow-hidden transition-colors duration-500 border ${
        theme === 'dark' ? 'bg-[#0D0D0F] border-white/10' : 'bg-black/5 border-black/10'
      }`}>
        {/* Browser chrome */}
        <div className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-500 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/10'
        }`}>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-lg shadow-yellow-500/20" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20" />
          </div>
          <div className="mx-4 flex-1">
            <div className={`truncate text-xs rounded-xl border px-3 py-1.5 font-medium transition-colors duration-500 ${
              theme === 'dark' 
                ? 'text-white/70 border-white/10 bg-black/40' 
                : 'text-black/60 border-black/20 bg-black/10'
            }`}>
              {host}
            </div>
          </div>
          {/* Device switcher: desktop-only */}
          <div className="hidden xl:flex items-center gap-1.5 mr-4">
            <button
              type="button"
              aria-label="Desktop preview"
              aria-pressed={device === 'desktop'}
              onClick={() => setDevice('desktop')}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-xl border transition-all ${
                device === 'desktop'
                  ? (theme === 'dark' ? 'border-[#007BFF]/50 bg-[#007BFF]/20 text-[#007BFF]' : 'border-[#007BFF]/50 bg-[#007BFF]/10 text-[#007BFF]')
                  : (theme === 'dark' ? 'border-white/10 text-white/40 hover:bg-white/10 hover:text-white' : 'border-black/10 text-black/40 hover:bg-black/5 hover:text-black')
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Tablet preview"
              aria-pressed={device === 'tablet'}
              onClick={() => setDevice('tablet')}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-xl border transition-all ${
                device === 'tablet'
                  ? (theme === 'dark' ? 'border-[#007BFF]/50 bg-[#007BFF]/20 text-[#007BFF]' : 'border-[#007BFF]/50 bg-[#007BFF]/10 text-[#007BFF]')
                  : (theme === 'dark' ? 'border-white/10 text-white/40 hover:bg-white/10 hover:text-white' : 'border-black/10 text-black/40 hover:bg-black/5 hover:text-black')
              }`}
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Mobile preview"
              aria-pressed={device === 'mobile'}
              onClick={() => setDevice('mobile')}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-xl border transition-all ${
                device === 'mobile'
                  ? (theme === 'dark' ? 'border-[#007BFF]/50 bg-[#007BFF]/20 text-[#007BFF]' : 'border-[#007BFF]/50 bg-[#007BFF]/10 text-[#007BFF]')
                  : (theme === 'dark' ? 'border-white/10 text-white/40 hover:bg-white/10 hover:text-white' : 'border-black/10 text-black/40 hover:bg-black/5 hover:text-black')
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              theme === 'dark' 
                ? 'bg-[#007BFF] text-white hover:bg-[#007BFF]/90 shadow-lg shadow-[#007BFF]/20' 
                : 'bg-black text-white hover:bg-black/90 shadow-lg shadow-black/20'
            }`}
          >
            Visit <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Live, scrollable preview with device-size animation */}
        <div className={`p-4 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#050505]' : 'bg-black/5'
        }`}>
          <motion.div
            className={`mx-auto overflow-hidden border shadow-inner transition-colors duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white'
            }`}
            animate={{ width: previewAnim.width, borderRadius: previewAnim.radius }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <iframe
              src={href}
              title={title}
              loading="lazy"
              sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups allow-same-origin allow-top-navigation-by-user-activation"
              referrerPolicy="no-referrer"
              className={`w-full h-[380px] md:h-[460px] transition-colors duration-500 ${
                theme === 'dark' ? 'bg-[#0f1520]' : 'bg-white'
              }`}
            />
          </motion.div>
        </div>

        {/* Meta */}
        <div className={`p-6 border-t transition-colors duration-500 ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>{title}</h3>
              <p className={`text-sm mt-2 font-light leading-relaxed ${
                theme === 'dark' ? 'text-white/50' : 'text-black/50'
              }`}>{desc}</p>
            </div>
          </div>
          <p className={`mt-4 text-[10px] uppercase tracking-widest font-bold ${
            theme === 'dark' ? 'text-white/20' : 'text-black/20'
          }`}>
            If the preview is blocked by the site’s security, use Open.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
