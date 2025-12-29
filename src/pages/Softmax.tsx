import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Info, Lightbulb, Calculator, Thermometer } from 'lucide-react'
import { SoftmaxVisualizer } from '../components/SoftmaxVisualizer'

export function Softmax() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
          <Calculator size={16} />
          <span>Mathematische Grundlagen</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Die <span className="gradient-text">Softmax</span>-Funktion
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Wie beliebige Zahlen in eine Wahrscheinlichkeitsverteilung umgewandelt werden
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Info size={24} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Was ist Softmax?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Die <strong className="text-white">Softmax-Funktion</strong> ist eine mathematische
              Funktion, die einen Vektor von beliebigen reellen Zahlen (Logits) in eine
              <strong className="text-white"> Wahrscheinlichkeitsverteilung</strong> umwandelt.
            </p>
            <p className="text-white/70 leading-relaxed">
              Jeder Ausgabewert liegt zwischen 0 und 1, und die Summe aller Ausgabewerte ist
              immer exakt 1. Das macht Softmax perfekt für Klassifikationsaufgaben und die
              Berechnung von Attention-Gewichten.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Key Properties */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        <div className="glass-card p-5">
          <h3 className="font-bold text-emerald-400 mb-2">Wertebereich</h3>
          <p className="text-white/60 text-sm">
            Alle Ausgabewerte liegen zwischen 0 und 1
          </p>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-cyan-400 mb-2">Summe = 1</h3>
          <p className="text-white/60 text-sm">
            Die Summe aller Ausgabewerte ist immer exakt 1
          </p>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-bold text-pink-400 mb-2">Differenzierbar</h3>
          <p className="text-white/60 text-sm">
            Überall differenzierbar - wichtig für Backpropagation
          </p>
        </div>
      </motion.section>

      {/* Interactive Visualizer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Lightbulb className="text-amber-400" />
          Interaktive Visualisierung
        </h2>
        <p className="text-white/60 mb-6">
          Experimentiere mit verschiedenen Temperaturen und beobachte, wie sich die
          Wahrscheinlichkeitsverteilung verändert. Fahre mit der Maus über die Balken
          um die Berechnungen zu sehen.
        </p>
        <SoftmaxVisualizer />
      </motion.section>

      {/* Temperature Explanation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Thermometer size={24} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Der Temperatur-Parameter</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Die <strong className="text-white">Temperatur τ</strong> (tau) beeinflusst die
              "Schärfe" der Wahrscheinlichkeitsverteilung:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">τ &lt; 1:</span>
                <span className="text-white/70">
                  Schärfere Verteilung - der höchste Wert dominiert stärker.
                  Nützlich für deterministische Ausgaben.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">τ = 1:</span>
                <span className="text-white/70">
                  Standard-Softmax - die ursprünglichen Verhältnisse bleiben erhalten.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 font-bold">τ &gt; 1:</span>
                <span className="text-white/70">
                  Gleichmäßigere Verteilung - mehr Exploration und Kreativität.
                  Nützlich für vielfältigere Ausgaben.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Step by Step Calculation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-6">Schritt-für-Schritt Berechnung</h2>
        <p className="text-white/60 mb-6">
          Für den Eingabevektor <code className="text-purple-400">x = [2.0, 1.0, 0.1]</code>:
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-400 mb-2">Schritt 1: Exponentialwerte</h4>
            <pre className="font-mono text-sm text-white/80">
e<sup>2.0</sup> = 7.389{'\n'}
e<sup>1.0</sup> = 2.718{'\n'}
e<sup>0.1</sup> = 1.105
            </pre>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-cyan-500">
            <h4 className="font-bold text-cyan-400 mb-2">Schritt 2: Summe bilden</h4>
            <pre className="font-mono text-sm text-white/80">
Σ = 7.389 + 2.718 + 1.105 = 11.212
            </pre>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-emerald-500">
            <h4 className="font-bold text-emerald-400 mb-2">Schritt 3: Wahrscheinlichkeiten</h4>
            <pre className="font-mono text-sm text-white/80">
P(x₁) = 7.389 / 11.212 = <span className="text-emerald-400">0.659 (65.9%)</span>{'\n'}
P(x₂) = 2.718 / 11.212 = <span className="text-emerald-400">0.242 (24.2%)</span>{'\n'}
P(x₃) = 1.105 / 11.212 = <span className="text-emerald-400">0.099 (9.9%)</span>
            </pre>
          </div>

          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <p className="font-mono text-sm">
              <strong className="text-emerald-400">Ergebnis:</strong> [0.659, 0.242, 0.099]
              <br />
              <strong className="text-emerald-400">Summe:</strong> 0.659 + 0.242 + 0.099 = 1.0 ✓
            </p>
          </div>
        </div>
      </motion.section>

      {/* Why Softmax in LLMs */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Warum Softmax in LLMs?</h2>
        <div className="space-y-4 text-white/70">
          <p>
            In Large Language Models wird Softmax an zwei kritischen Stellen verwendet:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <h4 className="font-bold text-purple-300 mb-2">1. Attention-Gewichte</h4>
              <p className="text-sm">
                Softmax normalisiert die Attention-Scores, sodass jedes Token eine
                Wahrscheinlichkeitsverteilung über alle anderen Tokens erhält.
              </p>
            </div>
            <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
              <h4 className="font-bold text-pink-300 mb-2">2. Ausgabe-Schicht</h4>
              <p className="text-sm">
                Am Ende des Modells wandelt Softmax die Logits in Wahrscheinlichkeiten
                für jedes mögliche nächste Token um.
              </p>
            </div>
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
          to="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Zurück zur Startseite</span>
        </Link>
        <Link to="/attention" className="glow-button inline-flex items-center gap-2">
          <span>Weiter zu Attention</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  )
}
