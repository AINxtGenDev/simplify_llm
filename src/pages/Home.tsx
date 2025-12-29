import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Sigma, Layers, Box, Sparkles, BookOpen, Code2 } from 'lucide-react'

const features = [
  {
    icon: Sigma,
    title: 'Softmax-Funktion',
    description: 'Verstehe, wie Wahrscheinlichkeitsverteilungen aus Rohdaten berechnet werden.',
    gradient: 'from-purple-500 to-pink-500',
    path: '/softmax',
  },
  {
    icon: Brain,
    title: 'Self-Attention',
    description: 'Lerne, wie Transformer Query, Key und Value verwenden um Kontext zu verstehen.',
    gradient: 'from-cyan-500 to-blue-500',
    path: '/attention',
  },
  {
    icon: Layers,
    title: 'Transformer-Architektur',
    description: 'Entdecke den Aufbau moderner Large Language Models wie GPT und Claude.',
    gradient: 'from-emerald-500 to-teal-500',
    path: '/transformer',
  },
  {
    icon: Box,
    title: 'Tensoren & Hardware',
    description: 'Erfahre, was Tensoren sind und warum GPUs und TPUs sie so schnell verarbeiten.',
    gradient: 'from-amber-500 to-orange-500',
    path: '/tensor',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 md:py-24"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-8"
        >
          <Sparkles size={16} />
          <span>Interaktives Lernen auf Deutsch</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="gradient-text">Softmax & Attention</span>
          <br />
          <span className="text-white/90">einfach erklärt</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Verstehe die mathematischen Grundlagen hinter modernen KI-Modellen
          wie GPT, Claude und LLaMA durch interaktive Visualisierungen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/softmax" className="glow-button inline-flex items-center justify-center gap-2">
            <span>Jetzt lernen</span>
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://arxiv.org/abs/1706.03762"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <BookOpen size={18} />
            <span>Original Paper</span>
          </a>
        </div>

        {/* Example Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 glass-card p-6 md:p-8 max-w-2xl mx-auto"
        >
          <p className="text-white/60 text-sm mb-3">Unser Beispielsatz</p>
          <p className="text-2xl md:text-3xl font-semibold gradient-text">
            "Welche Farbe hat der Himmel?"
          </p>
          <p className="text-white/50 text-sm mt-4">
            Mit diesem Satz zeigen wir dir jeden Schritt der Verarbeitung
          </p>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Was du lernen wirst
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/60 text-center mb-12 max-w-2xl mx-auto"
        >
          Schritt für Schritt durch die fundamentalen Konzepte moderner LLMs
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 group cursor-pointer"
              >
                <Link to={feature.path} className="block">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Mehr erfahren</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Key Concepts */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Code2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Die Kernformel</h2>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-8 overflow-x-auto border border-purple-500/20">
            <pre className="text-purple-300 font-mono text-lg md:text-xl">
              Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) × V
            </pre>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <h4 className="font-bold text-purple-300 mb-2">Q (Query)</h4>
              <p className="text-white/60 text-sm">
                "Was suche ich?" - Die Anfrage für jedes Token
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h4 className="font-bold text-cyan-300 mb-2">K (Key)</h4>
              <p className="text-white/60 text-sm">
                "Was biete ich an?" - Der Schlüssel jedes Tokens
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-bold text-emerald-300 mb-2">V (Value)</h4>
              <p className="text-white/60 text-sm">
                "Welche Information trage ich?" - Der Inhalt
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 text-center"
      >
        <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit zu lernen?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Starte mit der Softmax-Funktion - dem Baustein für alle
            Wahrscheinlichkeitsberechnungen in neuronalen Netzen.
          </p>
          <Link to="/softmax" className="glow-button inline-flex items-center gap-2">
            <span>Mit Softmax beginnen</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
