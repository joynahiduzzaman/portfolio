import { motion } from 'framer-motion';
import { SectionTitle, GlowBlob } from './ui/index';
import { services } from '../data/services';
import { staggerContainer, staggerItem } from '../utils/animations';

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass-card glow-border rounded-2xl p-7 overflow-hidden cursor-default"
      style={{ isolation: 'isolate' }}
    >
      {/* Hover gradient wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle at 30% 20%, ${service.color}0A, transparent 70%)` }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6"
        style={{
          background: `${service.color}12`,
          border: `1px solid ${service.color}22`,
        }}
      >
        {service.icon}
      </motion.div>

      {/* Title */}
      <h3
        className="text-white font-semibold text-base mb-3 leading-snug"
        style={{ fontFamily: 'Clash Display, sans-serif' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 body-sm leading-relaxed mb-6">{service.description}</p>

      {/* Feature list */}
      <ul className="space-y-2.5">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: service.color }}
            />
            {feat}
          </li>
        ))}
      </ul>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}80, transparent)` }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(0,245,255,0.06)" size={450} top="0%" right="0%" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// what I offer"
          title={<>My <span className="gradient-text">Services</span></>}
          subtitle="From architecture to deployment — I cover the full development lifecycle."
          center
        />

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 p-8 sm:p-10 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(59,130,246,0.05), rgba(139,92,246,0.04))',
            border: '1px solid rgba(0,245,255,0.09)',
          }}
        >
          <h3
            className="text-white display-md mb-3"
          >
            Have a project in mind?
          </h3>
          <p className="text-slate-400 body-sm max-w-sm mx-auto mb-7">
            Let's discuss your requirements and build something amazing together.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-black"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #3B82F6)',
              boxShadow: '0 0 36px rgba(0,245,255,0.28)',
            }}
          >
            Start a Conversation →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
