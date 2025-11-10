import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Monitor, Tablet, Smartphone } from "lucide-react";

export const ProjectCard = ({ title, desc, href }) => {
  const [device, setDevice] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const previewAnim = useMemo(() => {
    switch (device) {
      case "tablet":
        return { width: "85%", radius: 18 };
      case "mobile":
        return { width: "55%", radius: 22 };
      default:
        return { width: "100%", radius: 12 };
    }
  }, [device]);
  let host = href;
  try {
    host = new URL(href).hostname.replace("www.", "");
  } catch {}

  return (
    <motion.div
      className="group rounded-2xl p-[1px] bg-[linear-gradient(90deg,#0A84FF,#7c3aed,#00E0B8,#0A84FF)] animate-gradient hover:shadow-glow transition-shadow"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="rounded-2xl bg-secondary/70 border border-gray-700/40 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700/60 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-2 flex-1">
            <div className="truncate text-xs text-gray-300/90 rounded-md border border-white/10 bg-black/30 px-2 py-1">
              {host}
            </div>
          </div>
          {/* Device switcher: desktop-only */}
          <div className="hidden xl:flex items-center gap-1 mr-2">
            <button
              type="button"
              aria-label="Desktop preview"
              aria-pressed={device === "desktop"}
              onClick={() => setDevice("desktop")}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border ${
                device === "desktop" ? "border-primary/60 bg-white/10 text-white" : "border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Tablet preview"
              aria-pressed={device === "tablet"}
              onClick={() => setDevice("tablet")}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border ${
                device === "tablet" ? "border-primary/60 bg-white/10 text-white" : "border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Mobile preview"
              aria-pressed={device === "mobile"}
              onClick={() => setDevice("mobile")}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border ${
                device === "mobile" ? "border-primary/60 bg-white/10 text-white" : "border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs font-medium text-white hover:bg-white/20"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Live, scrollable preview with device-size animation */}
        <div className="bg-[#0f1520] px-2 py-3">
          <motion.div
            className="mx-auto overflow-hidden border border-gray-700/60 bg-black/40"
            style={{ borderRadius: 12 }}
            animate={{ width: previewAnim.width, borderRadius: previewAnim.radius }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            <iframe
              src={href}
              title={title}
              loading="lazy"
              className="w-full h-[380px] md:h-[460px] bg-[#0f1520]"
            />
          </motion.div>
        </div>

        {/* Meta */}
        <div className="p-4 border-t border-gray-700/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-gray-400 mt-1">{desc}</p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-white/90 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Visit <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            If the preview is blocked by the site’s security, use Open.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
