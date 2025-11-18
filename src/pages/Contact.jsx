import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Send, Paperclip, Check, AlertCircle, Loader2, Cloud, HardDrive, ArrowDownToLine, Globe, Plane, MailCheck } from "lucide-react";
import LetterGlitch from "../components/LetterGlitch/LetterGlitch.jsx";
import BallpitBackground from "../components/Ballpit";

export const Contact = () => {
  const { t } = useI18n();
  const [landing, setLanding] = React.useState(true);
  const [form, setForm] = React.useState({ name: "", phone: "", email: "", message: "" });
  const [fileName, setFileName] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadStatus, setUploadStatus] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [sendProgress, setSendProgress] = React.useState(0);
  const [sendStatus, setSendStatus] = React.useState(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [formHidden, setFormHidden] = React.useState(false);

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
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <LetterGlitch
            glitchColors={["#0A84FF", "#7c3aed", "#00E0B8"]}
            glitchSpeed={60}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </div>
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
          className="container mx-auto px-6 md:px-8 py-14 md:py-20 max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw] xl:max-w-[60vw] 2xl:max-w-[55vw]"
        >
          <div
            style={{ position: "relative", minHeight: "500px", width: "100%" }}
            className={`${sending ? "sending-active" : ""} ${formHidden ? "form-hidden" : ""}`}
          >
            <BallpitBackground />
            <motion.h1 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12" initial={false}>
              {t("contact.title")}
            </motion.h1>
            <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 lg:p-10 shadow-xl sending-wrap">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!isValid || sending) return;
                  setSending(true);
                  setSendStatus(null);
                  setSendProgress(0);
                  const simulateAjax = () => new Promise((resolve, reject) => {
                    const shouldFail = Math.random() < 0.12;
                    let progress = 0;
                    const id = setInterval(() => {
                      progress = Math.min(100, progress + 3);
                      setSendProgress(progress);
                      if (progress >= 100) {
                        clearInterval(id);
                        setTimeout(() => (shouldFail ? reject(new Error("fail")) : resolve({ ok: true })), 300);
                      }
                    }, 60);
                  });
                  try {
                    await simulateAjax();
                    setSendStatus("success");
                    setSent(true);
                    setShowConfirm(true);
                    setFormHidden(true);
                    setTimeout(() => setSending(false), 750);
                  } catch (err) {
                    setSendStatus("error");
                    setSent(true);
                    setFormHidden(true);
                    setTimeout(() => setSending(false), 750);
                  }
                }}
                className="grid grid-cols-1 gap-6 md:gap-7 lg:gap-8"
                aria-busy={sending ? "true" : "false"}
              >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-300 mb-2">{t("contact.form.nameLabel")}</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-field w-full px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                    disabled={sending}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">{t("contact.form.phoneLabel")}</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-field w-full px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
                    placeholder={t("contact.form.phonePlaceholder")}
                    disabled={sending}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t("contact.form.emailLabel")}</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`form-field w-full px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none ${
                    form.email && !isEmail(form.email) ? "is-invalid" : ""
                  }`}
                  placeholder={t("contact.form.emailPlaceholder")}
                  required
                  aria-invalid={!!(form.email && !isEmail(form.email))}
                  disabled={sending}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-300 mb-2">{t("contact.form.messageLabel")}</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-field w-full px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                  required
                  disabled={sending}
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const n = e.target.files?.[0]?.name || "";
                    setFileName(n);
                    if (n) {
                      setUploading(true);
                      setUploadProgress(0);
                      setUploadStatus(null);
                      const shouldFail = Math.random() < 0.15;
                      const id = setInterval(() => {
                        setUploadProgress((p) => {
                          const next = Math.min(100, p + 3);
                          if (next >= 100) {
                            clearInterval(id);
                            setTimeout(() => {
                              setUploading(false);
                              setUploadStatus(shouldFail ? "error" : "success");
                            }, 300);
                          }
                          return next;
                        });
                      }, 60);
                    }
                  }}
                />
                <label
                  htmlFor="attachment"
                  className={`file-anim inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer ${uploading ? "uploading-active animate-pulse" : ""} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                  aria-live="polite"
                  aria-busy={uploading ? "true" : "false"}
                  aria-label={uploading ? t("contact.form.uploading") : t("contact.form.attachLabel")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      const el = document.getElementById("attachment");
                      if (el) el.click();
                    }
                  }}
                >
                  <span className="default-upload-content inline-flex items-center gap-2 transition-all duration-300">
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t("contact.form.uploading")}</span>
                      </>
                    ) : uploadStatus === "success" ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span>{t("contact.form.uploadSuccess")}</span>
                      </>
                    ) : uploadStatus === "error" ? (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span>{t("contact.form.uploadFailure")}</span>
                      </>
                    ) : (
                      <>
                        <Paperclip className="h-4 w-4" />
                        <span>{t("contact.form.attachLabel")}</span>
                      </>
                    )}
                  </span>
                  <span className={`upload-orbit ${uploading ? "upload-orbit-active" : ""}`} aria-hidden="true">
                    <Globe className="orbit-globe" />
                    <span className="orbit-ring">
                      <Plane className="orbit-plane" />
                    </span>
                  </span>
                  {uploading && (
                    <>
                      <span className="ml-2 text-xs opacity-80">{uploadProgress}%</span>
                      <span className="upload-trails" />
                      <span className="upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
                      <span className="ml-2 inline-flex items-center text-xs opacity-80">
                        <Cloud className="h-3.5 w-3.5 mr-1" />
                        <ArrowDownToLine className="h-3.5 w-3.5 mx-1" />
                        <HardDrive className="h-3.5 w-3.5 ml-1" />
                      </span>
                    </>
                  )}
                </label>
                {fileName && <span className="text-xs text-gray-400">{fileName}</span>}
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-gray-400">{t("footer.hours")}</p>
                <motion.button
                  type="submit"
                  disabled={!isValid || sending}
                  whileTap={{ scale: 0.96 }}
                  className={`send-button send-aurora inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white shadow-sm ${
                    sending
                      ? "bg-blue-600/80 send-loading send-glow"
                      : isValid
                        ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 animate-gradient"
                        : "bg-white/10 cursor-not-allowed"
                  }`}
                >
                  {sending ? <span>{sendProgress}%</span> : <><Send className="h-4 w-4" />{t("contact.form.sendButton")}</>}
                </motion.button>
              </div>
            </form>
            </div>
          </div>

          {/* Confirmation overlay */}
          <div className={`confirmation-overlay ${sent ? "confirm-visible" : ""}`} role="status" aria-live="polite">
            {showConfirm && sendStatus === "success" && (
              <div className="confirm-pane">
                <div className="flex items-center gap-3 mb-3">
                  <span className="confirm-icons">
                    <Check className="confirm-check" />
                    <MailCheck className="confirm-envelope" />
                  </span>
                  <span className="text-sm md:text-base font-semibold">{t("contact.confirm.message")}</span>
                </div>
                <div className="confirm-actions">
                  <button
                    type="button"
                    className="confirm-btn confirm-primary"
                    onClick={() => {
                      setForm({ name: "", phone: "", email: "", message: "" });
                      setFileName("");
                      setSent(false);
                      setShowConfirm(false);
                      setSendProgress(0);
                      setSendStatus(null);
                      setFormHidden(false);
                    }}
                    aria-label={t("contact.confirm.writeAnother")}
                  >
                    {t("contact.confirm.writeAnother")}
                  </button>
                  <Link to="/projects" className="confirm-btn confirm-secondary" aria-label={t("contact.confirm.exploreMore")}>
                    {t("contact.confirm.exploreMore")}
                  </Link>
                </div>
              </div>
            )}
            {!showConfirm && sent && sendStatus === "error" && (
              <div className="confirm-pane">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="text-red-400" />
                  <span className="text-sm md:text-base font-semibold">{t("contact.form.failure")}</span>
                </div>
                <div className="confirm-actions">
                  <button
                    type="button"
                    className="confirm-btn confirm-primary"
                    onClick={() => {
                      setSent(false);
                      setSendProgress(0);
                      setSendStatus(null);
                      setFormHidden(false);
                    }}
                    aria-label={t("contact.confirm.writeAnother")}
                  >
                    {t("contact.confirm.writeAnother")}
                  </button>
                  <Link to="/projects" className="confirm-btn confirm-secondary" aria-label={t("contact.confirm.exploreMore")}>
                    {t("contact.confirm.exploreMore")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

