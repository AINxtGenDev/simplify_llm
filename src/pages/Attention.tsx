import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Brain, Zap, Target, Key, FileText } from 'lucide-react'
import { AttentionHeatmap } from '../components/AttentionHeatmap'

export function Attention() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm mb-6">
          <Brain size={16} />
          <span>Self-Attention Mechanismus</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Attention</span> is All You Need
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Der revolutionäre Mechanismus, der Transformern ermöglicht, Kontext zu verstehen
        </p>
      </motion.div>

      {/* Paper Reference */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-amber-900/20 to-orange-900/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <FileText size={24} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Das Paper, das alles veränderte</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              <strong className="text-white">"Attention is All You Need"</strong> wurde 2017 von
              Vaswani et al. bei Google veröffentlicht und führte die <strong className="text-white">
              Transformer-Architektur</strong> ein - die Grundlage für GPT, BERT, Claude und alle
              modernen LLMs.
            </p>
            <a
              href="https://arxiv.org/abs/1706.03762"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Zum Original-Paper</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Query, Key, Value */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Die drei Vektoren: Q, K, V</h2>
        <p className="text-white/60 mb-6">
          Für jedes Token werden drei Vektoren berechnet, die zusammen den Attention-Mechanismus bilden:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Target size={24} className="text-purple-400" />
            </div>
            <h3 className="font-bold text-purple-400 text-lg mb-2">Query (Q)</h3>
            <p className="text-white/60 text-sm mb-3">
              "Was suche ich?"
            </p>
            <p className="text-white/70 text-sm">
              Die Anfrage eines Tokens - definiert, nach welcher Art von Information gesucht wird.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
              <Key size={24} className="text-cyan-400" />
            </div>
            <h3 className="font-bold text-cyan-400 text-lg mb-2">Key (K)</h3>
            <p className="text-white/60 text-sm mb-3">
              "Was biete ich an?"
            </p>
            <p className="text-white/70 text-sm">
              Der Schlüssel eines Tokens - beschreibt, welche Art von Information es enthält.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-emerald-400 text-lg mb-2">Value (V)</h3>
            <p className="text-white/60 text-sm mb-3">
              "Welche Info trage ich?"
            </p>
            <p className="text-white/70 text-sm">
              Der Wert eines Tokens - die tatsächliche Information, die weitergegeben wird.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* The Formula */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Die Attention-Formel</h2>
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6 overflow-x-auto border border-purple-500/20">
          <pre className="text-center font-mono text-xl md:text-2xl">
            <span className="text-pink-400">Attention</span>
            <span className="text-white">(Q, K, V) = </span>
            <span className="text-purple-400">softmax</span>
            <span className="text-white">(</span>
            <span className="text-cyan-400">QK</span>
            <sup className="text-cyan-400">T</sup>
            <span className="text-white"> / </span>
            <span className="text-emerald-400">√d<sub>k</sub></span>
            <span className="text-white">) × </span>
            <span className="text-amber-400">V</span>
          </pre>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-cyan-400 font-mono font-bold">QK<sup>T</sup></span>
            <span className="text-white/70">
              Dot-Product zwischen Query und allen Keys - berechnet die Ähnlichkeit
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-emerald-400 font-mono font-bold">√d<sub>k</sub></span>
            <span className="text-white/70">
              Skalierung durch Wurzel der Key-Dimension - stabilisiert das Training
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400 font-mono font-bold">softmax</span>
            <span className="text-white/70">
              Wandelt Scores in Wahrscheinlichkeiten um (Summe = 1)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-400 font-mono font-bold">× V</span>
            <span className="text-white/70">
              Gewichtete Summe der Values basierend auf den Attention-Gewichten
            </span>
          </div>
        </div>
      </motion.section>

      {/* Interactive Heatmap */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Interaktive Attention-Visualisierung</h2>
        <p className="text-white/60 mb-6">
          Klicke auf ein Token, um zu sehen, wie stark es auf die anderen Tokens achtet.
          Die Farbe und Balkenlänge zeigen die Attention-Gewichte.
        </p>
        <AttentionHeatmap />
      </motion.section>

      {/* Example Explanation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Beispiel erklärt</h2>
        <div className="p-4 bg-slate-800/50 rounded-xl mb-6">
          <p className="font-mono text-lg text-center gradient-text">
            "Welche Farbe hat der Himmel?"
          </p>
        </div>

        <div className="space-y-4 text-white/70">
          <p>
            In diesem Satz zeigt die Attention-Analyse interessante Muster:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">•</span>
              <span>
                <strong className="text-white">"Farbe"</strong> achtet stark auf
                <strong className="text-white"> "Himmel"</strong> - das Modell erkennt
                die semantische Beziehung zwischen Attribut und Objekt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span>
                <strong className="text-white">"Himmel"</strong> achtet ebenfalls auf
                <strong className="text-white"> "Farbe"</strong> - bidirektionale Verknüpfung.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">•</span>
              <span>
                <strong className="text-white">"Welche"</strong> und <strong className="text-white">"?"</strong>
                rahmen die Frage ein und achten auf den gesamten Kontext.
              </span>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* Multi-Head Attention */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Multi-Head Attention</h2>
        <p className="text-white/70 mb-6">
          Statt einer einzelnen Attention-Berechnung verwendet der Transformer mehrere
          parallele "Köpfe" (Heads), die verschiedene Aspekte der Beziehungen lernen:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h4 className="font-bold text-purple-300 mb-2">Kopf 1</h4>
            <p className="text-white/60 text-sm">
              Könnte syntaktische Beziehungen lernen (Subjekt-Verb)
            </p>
          </div>
          <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <h4 className="font-bold text-cyan-300 mb-2">Kopf 2</h4>
            <p className="text-white/60 text-sm">
              Könnte semantische Ähnlichkeiten erkennen
            </p>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <h4 className="font-bold text-emerald-300 mb-2">Kopf 3</h4>
            <p className="text-white/60 text-sm">
              Könnte Positions-Informationen verarbeiten
            </p>
          </div>
          <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <h4 className="font-bold text-pink-300 mb-2">Kopf N</h4>
            <p className="text-white/60 text-sm">
              GPT-3 verwendet 96 Köpfe, BERT 12 Köpfe
            </p>
          </div>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          to="/softmax"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Zurück zu Softmax</span>
        </Link>
        <Link to="/transformer" className="glow-button inline-flex items-center gap-2">
          <span>Weiter zu Transformer</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  )
}
