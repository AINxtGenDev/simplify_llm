import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Layers, ArrowDown, Repeat, Cpu, Database, Sparkles } from 'lucide-react'

export function Transformer() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm mb-6">
          <Layers size={16} />
          <span>Architektur-Übersicht</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Die <span className="gradient-text">Transformer</span>-Architektur
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Wie Encoder, Decoder und Attention zusammenspielen
        </p>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Encoder-Decoder Struktur</h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Encoder */}
          <div className="flex-1 max-w-sm">
            <div className="text-center mb-4">
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 font-bold">
                ENCODER
              </span>
            </div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30"
              >
                <h4 className="font-bold text-purple-300 mb-2">Multi-Head Self-Attention</h4>
                <p className="text-white/60 text-sm">
                  Jedes Token kann auf alle anderen Tokens achten
                </p>
              </motion.div>

              <div className="flex justify-center">
                <ArrowDown className="text-white/30" />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30"
              >
                <h4 className="font-bold text-purple-300 mb-2">Feed-Forward Network</h4>
                <p className="text-white/60 text-sm">
                  Positionsweise vollständig verbundene Schichten
                </p>
              </motion.div>

              <div className="flex justify-center items-center gap-2 text-white/40 text-sm">
                <Repeat size={14} />
                <span>× N Schichten</span>
              </div>
            </div>
          </div>

          {/* Arrow between */}
          <div className="hidden md:flex items-center">
            <ArrowDown className="rotate-[-90deg] text-white/30" size={32} />
          </div>

          {/* Decoder */}
          <div className="flex-1 max-w-sm">
            <div className="text-center mb-4">
              <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 font-bold">
                DECODER
              </span>
            </div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/30"
              >
                <h4 className="font-bold text-pink-300 mb-2">Masked Self-Attention</h4>
                <p className="text-white/60 text-sm">
                  Kann nur auf vorherige Tokens achten (kausal)
                </p>
              </motion.div>

              <div className="flex justify-center">
                <ArrowDown className="text-white/30" />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30"
              >
                <h4 className="font-bold text-cyan-300 mb-2">Cross-Attention</h4>
                <p className="text-white/60 text-sm">
                  Decoder achtet auf Encoder-Ausgabe
                </p>
              </motion.div>

              <div className="flex justify-center">
                <ArrowDown className="text-white/30" />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/30"
              >
                <h4 className="font-bold text-pink-300 mb-2">Feed-Forward Network</h4>
                <p className="text-white/60 text-sm">
                  Gleiche Struktur wie im Encoder
                </p>
              </motion.div>

              <div className="flex justify-center items-center gap-2 text-white/40 text-sm">
                <Repeat size={14} />
                <span>× N Schichten</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Components */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Wichtige Komponenten</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
              <Database size={24} className="text-amber-400" />
            </div>
            <h3 className="font-bold text-amber-400 text-lg mb-2">Positional Encoding</h3>
            <p className="text-white/70 text-sm">
              Da Transformer keine inhärente Positionsinformation haben, werden
              sinusförmige Positionskodierungen zu den Embeddings addiert.
            </p>
            <div className="mt-3 p-2 bg-slate-800/50 rounded-lg font-mono text-xs text-white/60">
              PE(pos,2i) = sin(pos/10000^(2i/d))
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Layers size={24} className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-emerald-400 text-lg mb-2">Layer Normalization</h3>
            <p className="text-white/70 text-sm">
              Normalisiert die Aktivierungen innerhalb jeder Schicht, was das
              Training stabilisiert und beschleunigt.
            </p>
            <div className="mt-3 p-2 bg-slate-800/50 rounded-lg font-mono text-xs text-white/60">
              output = LayerNorm(x + Sublayer(x))
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
              <Repeat size={24} className="text-cyan-400" />
            </div>
            <h3 className="font-bold text-cyan-400 text-lg mb-2">Residual Connections</h3>
            <p className="text-white/70 text-sm">
              Skip-Verbindungen ermöglichen den Gradientenfluss durch tiefe
              Netzwerke und verhindern das Verschwinden der Gradienten.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
              <Cpu size={24} className="text-pink-400" />
            </div>
            <h3 className="font-bold text-pink-400 text-lg mb-2">Feed-Forward Network</h3>
            <p className="text-white/70 text-sm">
              Zwei lineare Transformationen mit einer ReLU/GELU-Aktivierung
              dazwischen. Typischerweise 4× die Modell-Dimension.
            </p>
            <div className="mt-3 p-2 bg-slate-800/50 rounded-lg font-mono text-xs text-white/60">
              FFN(x) = GELU(xW₁ + b₁)W₂ + b₂
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Model Variants */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-6">Transformer-Varianten</h2>

        <div className="space-y-4">
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-purple-400" size={20} />
              <h4 className="font-bold text-purple-300">Nur-Encoder (BERT)</h4>
            </div>
            <p className="text-white/60 text-sm">
              Bidirektionale Attention - jedes Token sieht alle anderen. Ideal für
              Klassifikation, Named Entity Recognition, Frage-Antwort.
            </p>
          </div>

          <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-pink-400" size={20} />
              <h4 className="font-bold text-pink-300">Nur-Decoder (GPT, Claude)</h4>
            </div>
            <p className="text-white/60 text-sm">
              Kausale/Autoregressive Attention - Tokens sehen nur vorherige.
              Ideal für Textgenerierung, Chat, Code-Completion.
            </p>
          </div>

          <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-cyan-400" size={20} />
              <h4 className="font-bold text-cyan-300">Encoder-Decoder (T5, BART)</h4>
            </div>
            <p className="text-white/60 text-sm">
              Vollständige Architektur wie im Original-Paper. Ideal für
              Übersetzung, Zusammenfassung, Seq2Seq-Aufgaben.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Scale Information */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Modell-Größen im Vergleich</h2>
        <p className="text-white/60 mb-6">
          Die Anzahl der Parameter wächst mit der Modellgröße exponentiell:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-white/40">Modell</th>
                <th className="text-right p-3 text-white/40">Parameter</th>
                <th className="text-right p-3 text-white/40">Schichten</th>
                <th className="text-right p-3 text-white/40">Attention Heads</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">BERT-base</td>
                <td className="p-3 text-right text-purple-400">110M</td>
                <td className="p-3 text-right">12</td>
                <td className="p-3 text-right">12</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">GPT-2</td>
                <td className="p-3 text-right text-cyan-400">1.5B</td>
                <td className="p-3 text-right">48</td>
                <td className="p-3 text-right">25</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">GPT-3</td>
                <td className="p-3 text-right text-pink-400">175B</td>
                <td className="p-3 text-right">96</td>
                <td className="p-3 text-right">96</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">Claude 3</td>
                <td className="p-3 text-right text-emerald-400">~137B+</td>
                <td className="p-3 text-right">-</td>
                <td className="p-3 text-right">-</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">GPT-4</td>
                <td className="p-3 text-right text-amber-400">~1.8T*</td>
                <td className="p-3 text-right">-</td>
                <td className="p-3 text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/40 text-xs mt-4">
          * Geschätzt, keine offiziellen Zahlen veröffentlicht
        </p>
      </motion.section>

      {/* Summary */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
      >
        <h2 className="text-xl font-bold mb-4">Zusammenfassung</h2>
        <div className="space-y-3 text-white/70">
          <p>
            Du hast jetzt die drei fundamentalen Konzepte moderner LLMs kennengelernt:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">1.</span>
              <span>
                <strong className="text-white">Softmax</strong> - Wandelt Zahlen in Wahrscheinlichkeiten um
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">2.</span>
              <span>
                <strong className="text-white">Self-Attention</strong> - Ermöglicht Tokens, aufeinander zu achten
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">3.</span>
              <span>
                <strong className="text-white">Transformer</strong> - Kombiniert alles zu einer mächtigen Architektur
              </span>
            </li>
          </ul>
          <p className="mt-4">
            Diese Konzepte bilden die Grundlage für GPT, Claude, LLaMA und alle anderen
            modernen Sprachmodelle!
          </p>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          to="/attention"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Zurück zu Attention</span>
        </Link>
        <Link to="/" className="glow-button inline-flex items-center gap-2">
          <span>Zur Startseite</span>
        </Link>
      </motion.div>
    </div>
  )
}
