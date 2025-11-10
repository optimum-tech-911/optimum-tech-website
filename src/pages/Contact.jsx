import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useI18n } from "../i18n.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Send, Paperclip } from "lucide-react";

export const Contact = () => {
  const { t } = useI18n();
  const [landing, setLanding] = React.useState(true);
  const [form, setForm] = React.useState({ name: "", phone: "", email: "", message: "" });
  const [fileName, setFileName] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValid = form.name && isEmail(form.email) && form.message.length >= 5;

  React.useEffect(() => {
    const id = setTimeout(() => setLanding(false), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {landing && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-b from-[#0b1020] to-[#0d1117]">
                <div className="stars-layer" />
                <motion.div
                  initial={{ y: 0, scale: 1, opacity: 1 }}
                  animate={{ y: -260, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.9, ease: "easeInOut" }}
                  className="relative w-[160px] h-[200px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex flex-col items-center justify-center shadow-2xl cursor-default"
                  style={{ animation: "shipFloat 4s ease-in-out infinite" }}
                >
                  <Rocket className="h-16 w-16 text-white/90" />
                  <div className="thrust-glow" />
                  <div className="mt-4 text-white font-semibold">{t("contact.title")}</div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Contact form */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: landing ? 0.2 : 1, y: landing ? 12 : 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-3xl py-16"
        >
          <motion.h1 className="text-3xl md:text-4xl font-bold text-white mb-8" initial={false}>
            {t("contact.title")}
          </motion.h1>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isValid) return;
                setSent(true);
                setTimeout(() => setSent(false), 3000);
              }}
              className="grid grid-cols-1 gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Nom</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="(+33) 6 12 34 56 78"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    form.email && !isEmail(form.email)
                      ? "border-red-500/60 focus:ring-red-500/50 bg-black/40"
                      : "border-white/10 focus:ring-primary/60 bg-black/30"
                  }`}
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="Décrivez votre projet, budget et délais souhaités."
                  required
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                />
                <label
                  htmlFor="attachment"
                  className="file-anim inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
                >
                  <Paperclip className="h-4 w-4" />
                  <span>Ajouter un fichier</span>
                </label>
                {fileName && <span className="text-xs text-gray-400">{fileName}</span>}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-gray-400">Nous répondons généralement sous 24h.</p>
                <motion.button
                  type="submit"
                  disabled={!isValid}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white shadow-sm ${
                    isValid
                      ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 animate-gradient"
                      : "bg-white/10 cursor-not-allowed"
                  }`}
                >
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </motion.button>
              </div>
            </form>
          </div>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-4 rounded-lg border border-white/10 bg-green-500/10 text-green-300 px-4 py-3"
              >
                Merci ! Votre message a été envoyé.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};
