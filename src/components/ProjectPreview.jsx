import React, { useMemo, useState } from 'react';
import { ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const devices = {
  desktop: { label: 'Ordinateur', icon: Monitor, width: '100%', radius: 18 },
  tablet: { label: 'Tablette', icon: Tablet, width: '78%', radius: 24 },
  mobile: { label: 'Mobile', icon: Smartphone, width: '44%', radius: 28 },
};

export const ProjectPreview = ({ project, height = 'h-[460px] md:h-[620px]' }) => {
  const { theme } = useTheme();
  const [device, setDevice] = useState('desktop');
  const activeDevice = useMemo(() => devices[device], [device]);

  return (
    <div className={`overflow-hidden rounded-[2rem] border shadow-2xl ${
      theme === 'dark'
        ? 'border-white/10 bg-[#0a0a0d] shadow-blue-950/20'
        : 'border-black/10 bg-white shadow-black/10'
    }`}>
      <div className={`flex flex-wrap items-center gap-3 border-b px-4 py-3 md:px-5 ${
        theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'
      }`}>
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className={`order-3 min-w-0 flex-1 basis-full truncate rounded-full border px-4 py-2 text-center text-xs font-medium sm:order-none sm:basis-auto ${
          theme === 'dark'
            ? 'border-white/10 bg-black/40 text-white/65'
            : 'border-black/10 bg-white text-black/60'
        }`}>
          Aperçu Optimum Tech · {project.title}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          {Object.entries(devices).map(([key, item]) => {
            const Icon = item.icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setDevice(key)}
                aria-label={`Afficher en mode ${item.label.toLowerCase()}`}
                aria-pressed={device === key}
                className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                  device === key
                    ? 'border-[#007BFF]/60 bg-[#007BFF]/15 text-[#43a1ff]'
                    : theme === 'dark'
                      ? 'border-white/10 text-white/45 hover:text-white'
                      : 'border-black/10 text-black/45 hover:text-black'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#007BFF] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1688ff]"
          >
            Voir le projet
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className={`overflow-hidden p-3 md:p-5 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#eef1f5]'}`}>
        <div
          className={`mx-auto overflow-hidden border shadow-xl transition-[width,border-radius] duration-500 ${height} ${
            theme === 'dark' ? 'border-white/10 bg-[#10131a]' : 'border-black/10 bg-white'
          }`}
          style={{ width: activeDevice.width, borderRadius: activeDevice.radius }}
        >
          {project.url ? (
            <iframe
              src={project.url}
              title={`Aperçu du projet ${project.title}`}
              loading="lazy"
              sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups allow-same-origin allow-top-navigation-by-user-activation"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full bg-white"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-[#007BFF]/20 via-[#111827] to-[#7c3aed]/20 px-8 text-center text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6bb7ff]">Optimum Tech</p>
                <p className="mt-3 text-3xl font-bold">{project.title}</p>
                <p className="mt-3 text-sm text-white/60">Aperçu bientôt disponible</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
