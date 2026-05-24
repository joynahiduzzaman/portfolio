import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiSend, FiMapPin, FiMail, FiLinkedin, FiGithub,
  FiCheck, FiAlertCircle,
} from 'react-icons/fi';
import { SectionTitle, GlowBlob } from './ui/index';
import { staggerContainer, staggerItem } from '../utils/animations';

import SITE_CONFIG from '../config/site';

const contactInfo = [
  { icon: FiMail,     label: 'Email',    value: SITE_CONFIG.email,        href: SITE_CONFIG.social.email           },
  { icon: FiMapPin,   label: 'Location', value: SITE_CONFIG.location,     href: null                               },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'LinkedIn Profile',       href: SITE_CONFIG.social.linkedin        },
  { icon: FiGithub,   label: 'GitHub',   value: 'GitHub Profile',         href: SITE_CONFIG.social.github          },
];

function InputField({ label, type = 'text', name, value, onChange, error, placeholder, rows }) {
  const isTextarea = type === 'textarea';
  const El = isTextarea ? 'textarea' : 'input';

  return (
    <div>
      <label className="block text-xs font-mono mb-2 tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <El
        type={isTextarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 resize-none font-light contact-input"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: error ? '1px solid rgba(239,68,68,0.45)' : '1px solid rgba(255,255,255,0.07)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)';
          e.currentTarget.style.background  = 'rgba(0,245,255,0.03)';
          e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(0,245,255,0.06)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.07)';
          e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
        >
          <FiAlertCircle size={11} /> {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef();
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      await emailjs.sendForm(SITE_CONFIG.emailjs.serviceId, SITE_CONFIG.emailjs.templateId, formRef.current, SITE_CONFIG.emailjs.publicKey);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(139,92,246,0.07)" size={450} bottom="-5%" right="0%" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// get in touch"
          title={<>Let's <span className="gradient-text">Work Together</span></>}
          subtitle="Have a project in mind or want to chat? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">

          {/* ── Left: Info ── */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                whileHover={{ y: -3, x: 2 }}
                transition={{ duration: 0.25 }}
                className="glass-card glow-border rounded-2xl p-4 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(0,245,255,0.07)',
                    border: '1px solid rgba(0,245,255,0.14)',
                  }}
                >
                  <Icon size={16} style={{ color: '#00F5FF' }} />
                </div>
                <div className="min-w-0">
                  <p className="section-label text-slate-600 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors truncate block hover:text-cyan-500" style={{ color: "var(--text-secondary)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-5 mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(0,245,255,0.05))',
                border: '1px solid rgba(16,185,129,0.18)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="text-emerald-400 text-sm font-medium">Available for work</span>
              </div>
              <p className="body-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Open to full-time positions and exciting freelance projects.
                Response within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 glass-card rounded-3xl p-8 sm:p-10"
          >
            <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                />
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                />
              </div>

              <InputField
                label="Message"
                type="textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Tell me about your project or idea..."
                rows={6}
              />

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    <FiCheck size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span className="text-sm text-emerald-400">Message sent! I'll reply within 24 hours.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <FiAlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
                    <span className="text-sm text-red-400">
                      {`Something went wrong. Email me directly at ${SITE_CONFIG.email}`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.97 }           : {}}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold text-black transition-all duration-300"
                style={{
                  background:
                    status === 'sending'
                      ? 'rgba(0,245,255,0.45)'
                      : 'linear-gradient(135deg, #00F5FF, #3B82F6)',
                  boxShadow: status !== 'sending' ? '0 0 36px rgba(0,245,255,0.22), 0 2px 12px rgba(0,0,0,0.4)' : 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend size={14} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}