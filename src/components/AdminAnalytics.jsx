import React from 'react';
import { BarChart3, MousePointerClick, RefreshCw, Users, FolderKanban } from 'lucide-react';

const emptySummary = {
  total_events: 0,
  total_clicks: 0,
  unique_sessions: 0,
  project_clicks: 0,
  top_buttons: [],
  top_projects: [],
  top_pages: [],
  daily: [],
};

const Metric = ({ icon: Icon, label, value, theme }) => (
  <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white'}`}>
    <div className="flex items-center justify-between">
      <p className={`text-xs ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>{label}</p>
      <Icon className="h-4 w-4 text-[#1688ff]" />
    </div>
    <p className="mt-3 text-3xl font-bold tracking-tight">{Number(value || 0).toLocaleString('fr-FR')}</p>
  </div>
);

const Ranking = ({ title, items, empty, theme, renderLabel }) => {
  const maximum = Math.max(...items.map((item) => Number(item.clicks || item.views || 0)), 1);

  return (
    <section className={`rounded-2xl border p-5 ${theme === 'dark' ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {items.length === 0 ? (
        <p className={`mt-5 text-sm ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>{empty}</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item, index) => {
            const count = Number(item.clicks || item.views || 0);
            return (
              <div key={`${renderLabel(item)}-${index}`}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="min-w-0 truncate font-medium">{renderLabel(item)}</span>
                  <span className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>{count.toLocaleString('fr-FR')}</span>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  <div className="h-full rounded-full bg-[#1688ff]" style={{ width: `${Math.max((count / maximum) * 100, 3)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export const AdminAnalytics = ({ summary = emptySummary, days, onDaysChange, onRefresh, loading, theme }) => {
  const data = { ...emptySummary, ...summary };
  const maxDaily = Math.max(...data.daily.map((item) => Number(item.events || 0)), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Comportement des visiteurs</h3>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>
            Données first-party collectées uniquement après consentement analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={days}
            onChange={(event) => onDaysChange(Number(event.target.value))}
            className={`rounded-xl border px-3 py-2 text-sm ${theme === 'dark' ? 'border-white/10 bg-[#111] text-white' : 'border-black/10 bg-white text-black'}`}
          >
            <option value={7}>7 jours</option>
            <option value={30}>30 jours</option>
            <option value={90}>90 jours</option>
          </select>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className={`rounded-xl border p-2.5 transition ${theme === 'dark' ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-white hover:bg-black/5'}`}
            aria-label="Actualiser les statistiques"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={MousePointerClick} label="Clics suivis" value={data.total_clicks} theme={theme} />
        <Metric icon={FolderKanban} label="Clics sur les projets" value={data.project_clicks} theme={theme} />
        <Metric icon={Users} label="Sessions uniques" value={data.unique_sessions} theme={theme} />
        <Metric icon={BarChart3} label="Événements totaux" value={data.total_events} theme={theme} />
      </div>

      <section className={`rounded-2xl border p-5 ${theme === 'dark' ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
        <h3 className="text-lg font-semibold">Activité quotidienne</h3>
        <div className="mt-6 flex h-44 items-end gap-1 overflow-hidden">
          {data.daily.length === 0 ? (
            <p className={`self-center text-sm ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>Les premières données apparaîtront après des visites consenties.</p>
          ) : data.daily.map((item) => (
            <div key={item.day} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2" title={`${item.day}: ${item.events} événements`}>
              <div
                className="w-full min-w-1 rounded-t bg-[#1688ff]/80 transition group-hover:bg-[#1688ff]"
                style={{ height: `${Math.max((Number(item.events) / maxDaily) * 130, 4)}px` }}
              />
              <span className={`hidden text-[9px] xl:block ${theme === 'dark' ? 'text-white/35' : 'text-black/35'}`}>{String(item.day).slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <Ranking title="Boutons les plus cliqués" items={data.top_buttons} empty="Aucun clic de bouton pour cette période." theme={theme} renderLabel={(item) => item.label || 'Sans libellé'} />
        <Ranking title="Projets les plus cliqués" items={data.top_projects} empty="Aucun clic de projet pour cette période." theme={theme} renderLabel={(item) => item.label || item.project_id || 'Projet'} />
        <Ranking title="Pages les plus consultées" items={data.top_pages} empty="Aucune page consultée pour cette période." theme={theme} renderLabel={(item) => item.path || '/'} />
      </div>
    </div>
  );
};
