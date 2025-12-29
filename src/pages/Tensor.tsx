import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Box, Cpu, Zap, ChevronRight, Circle, Minus, Grid3X3, Boxes } from 'lucide-react'
import { useState } from 'react'

/**
 * Interactive Tensor visualization component
 */
function TensorVisualizer() {
  const [activeTab, setActiveTab] = useState<'scalar' | 'vector' | 'matrix' | 'tensor'>('scalar')

  const tabs = [
    { id: 'scalar' as const, label: 'Skalar', icon: Circle, dimension: '0D' },
    { id: 'vector' as const, label: 'Vektor', icon: Minus, dimension: '1D' },
    { id: 'matrix' as const, label: 'Matrix', icon: Grid3X3, dimension: '2D' },
    { id: 'tensor' as const, label: 'Tensor', icon: Boxes, dimension: '3D+' },
  ]

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span className="text-xs opacity-70">({tab.dimension})</span>
            </motion.button>
          )
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'scalar' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">42</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Skalar (0-dimensional)</h3>
                <p className="text-white/60">Eine einzelne Zahl ohne Richtung</p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-emerald-500/20">
              <h4 className="font-semibold text-emerald-300 mb-3">Beispiele aus dem Alltag:</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-emerald-400" />
                  <span>Temperatur: <code className="text-emerald-400">23.5</code> °C</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-emerald-400" />
                  <span>Alter: <code className="text-emerald-400">25</code> Jahre</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-emerald-400" />
                  <span>Wahrscheinlichkeit: <code className="text-emerald-400">0.95</code></span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <p className="font-mono text-sm">
                <span className="text-emerald-400">Python:</span> x = 42
                <br />
                <span className="text-emerald-400">Shape:</span> () — keine Dimensionen
              </p>
            </div>
          </div>
        )}

        {activeTab === 'vector' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[3, 7, 2, 9].map((val, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"
                  >
                    <span className="text-lg font-bold text-white">{val}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400">Vektor (1-dimensional)</h3>
                <p className="text-white/60">Eine Reihe von Zahlen</p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-cyan-500/20">
              <h4 className="font-semibold text-cyan-300 mb-3">Beispiele in ML:</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-cyan-400" />
                  <span>Word Embedding: <code className="text-cyan-400">[0.2, -0.5, 0.8, 0.1]</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-cyan-400" />
                  <span>RGB-Farbe: <code className="text-cyan-400">[255, 128, 0]</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-cyan-400" />
                  <span>Koordinaten: <code className="text-cyan-400">[x, y, z]</code></span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
              <p className="font-mono text-sm">
                <span className="text-cyan-400">Python:</span> v = [3, 7, 2, 9]
                <br />
                <span className="text-cyan-400">Shape:</span> (4,) — 4 Elemente
              </p>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-3 gap-1">
                {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].flat().map((val, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <span className="text-sm font-bold text-white">{val}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400">Matrix (2-dimensional)</h3>
                <p className="text-white/60">Zeilen und Spalten von Zahlen</p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-purple-500/20">
              <h4 className="font-semibold text-purple-300 mb-3">Beispiele in ML:</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-purple-400" />
                  <span>Graustufenbild: <code className="text-purple-400">[28×28]</code> Pixel</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-purple-400" />
                  <span>Attention-Matrix: <code className="text-purple-400">[seq_len × seq_len]</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-purple-400" />
                  <span>Gewichtsmatrix: <code className="text-purple-400">[input × output]</code></span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
              <p className="font-mono text-sm">
                <span className="text-purple-400">Python:</span> M = [[1,2,3], [4,5,6], [7,8,9]]
                <br />
                <span className="text-purple-400">Shape:</span> (3, 3) — 3 Zeilen, 3 Spalten
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tensor' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="grid grid-cols-2 gap-1">
                  {[1, 2, 3, 4].map((val, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-2 left-2 grid grid-cols-2 gap-1 opacity-60">
                  {[5, 6, 7, 8].map((val, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-4 grid grid-cols-2 gap-1 opacity-30">
                  {[9, 10, 11, 12].map((val, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-8">
                <h3 className="text-xl font-bold text-amber-400">Tensor (3+ dimensional)</h3>
                <p className="text-white/60">Mehrdimensionale Datenstrukturen</p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
              <h4 className="font-semibold text-amber-300 mb-3">Beispiele in ML:</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-amber-400" />
                  <span>Farbbild: <code className="text-amber-400">[H × W × 3]</code> (RGB-Kanäle)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-amber-400" />
                  <span>Batch von Bildern: <code className="text-amber-400">[B × H × W × C]</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-amber-400" />
                  <span>Transformer-Input: <code className="text-amber-400">[batch × seq × embed]</code></span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
              <p className="font-mono text-sm">
                <span className="text-amber-400">Python:</span> T = np.zeros((3, 2, 2))
                <br />
                <span className="text-amber-400">Shape:</span> (3, 2, 2) — 3 Schichten à 2×2
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function Tensor() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm mb-6">
          <Box size={16} />
          <span>Datenstrukturen in ML</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Was ist ein <span className="gradient-text">Tensor</span>?
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Von Skalaren zu mehrdimensionalen Datenstrukturen — die Grundlage aller KI-Berechnungen
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Die Tensor-Hierarchie</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Ein <strong className="text-white">Tensor</strong> ist eine Verallgemeinerung von Skalaren,
          Vektoren und Matrizen auf beliebig viele Dimensionen. In der Welt des maschinellen Lernens
          werden alle Daten als Tensoren dargestellt — von einfachen Zahlen bis hin zu komplexen
          mehrdimensionalen Strukturen.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">0D</div>
            <div className="text-white/80 font-medium">Skalar</div>
            <div className="text-white/50 text-sm">Eine Zahl</div>
          </div>
          <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">1D</div>
            <div className="text-white/80 font-medium">Vektor</div>
            <div className="text-white/50 text-sm">Liste</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">2D</div>
            <div className="text-white/80 font-medium">Matrix</div>
            <div className="text-white/50 text-sm">Tabelle</div>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">3D+</div>
            <div className="text-white/80 font-medium">Tensor</div>
            <div className="text-white/50 text-sm">Würfel+</div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Visualizer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Interaktive Visualisierung</h2>
        <p className="text-white/60 mb-6">
          Klicke auf die verschiedenen Dimensionen, um Beispiele und Erklärungen zu sehen:
        </p>
        <TensorVisualizer />
      </motion.section>

      {/* Why Tensors in ML */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Warum Tensoren im Machine Learning?</h2>
        <div className="space-y-4 text-white/70">
          <p>
            Tensoren sind aus mehreren Gründen die perfekte Datenstruktur für KI:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Einheitliche Darstellung:</strong> Bilder, Texte, Audio
                — alles lässt sich als Tensor darstellen
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Batch-Verarbeitung:</strong> Mehrere Datenpunkte können
                gleichzeitig verarbeitet werden
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Parallelisierung:</strong> Tensor-Operationen sind hochgradig
                parallelisierbar
              </span>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* GPU Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Cpu size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400">Warum GPUs für Tensoren?</h2>
            <p className="text-white/60">Graphics Processing Units — die Arbeitspferde des Deep Learning</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <h4 className="font-semibold text-green-300 mb-3">CPU vs. GPU — Der Unterschied:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="font-bold text-red-400 mb-2">CPU (Central Processing Unit)</div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• 4–16 starke Kerne</li>
                  <li>• Optimiert für sequenzielle Aufgaben</li>
                  <li>• Komplexe Logik und Verzweigungen</li>
                  <li>• Niedrige Latenz pro Operation</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="font-bold text-green-400 mb-2">GPU (Graphics Processing Unit)</div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Tausende kleine Kerne</li>
                  <li>• Optimiert für parallele Aufgaben</li>
                  <li>• Gleiche Operation auf viele Daten</li>
                  <li>• Hoher Durchsatz bei Tensor-Ops</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
            <h4 className="font-semibold text-green-300 mb-3">Warum GPUs perfekt für Tensoren sind:</h4>
            <p className="text-white/70 mb-4">
              Tensor-Operationen wie Matrixmultiplikation bestehen aus <strong className="text-white">
              Millionen unabhängiger Berechnungen</strong>, die gleichzeitig ausgeführt werden können:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-400 mb-2"># Matrix-Multiplikation (1024 × 1024)</div>
              <div className="text-white/60">CPU: ~1.000.000 sequenzielle Operationen</div>
              <div className="text-green-400">GPU: ~1.000.000 parallele Operationen</div>
              <div className="text-amber-400 mt-2">→ GPU ist 10-100× schneller!</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">10.000+</div>
              <div className="text-white/60 text-sm">CUDA-Kerne (RTX 4090)</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">83 TFLOPS</div>
              <div className="text-white/60 text-sm">FP32 Rechenleistung</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">24 GB</div>
              <div className="text-white/60 text-sm">VRAM Speicher</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TPU Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <Zap size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-400">Warum TPUs noch besser sind</h2>
            <p className="text-white/60">Tensor Processing Units — speziell für KI entwickelt von Google</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <h4 className="font-semibold text-blue-300 mb-3">Was macht TPUs besonders?</h4>
            <p className="text-white/70 mb-4">
              TPUs wurden von Google <strong className="text-white">von Grund auf für Tensor-Operationen
              entworfen</strong>, während GPUs ursprünglich für Grafik entwickelt wurden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-bold text-green-400 mb-3">GPU</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Flexibel und vielseitig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Gute CUDA-Unterstützung</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Breite Software-Kompatibilität</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">~</span>
                  <span>Nicht optimal für Matrix-Ops</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-3">TPU</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Spezialisiert auf Matrix-Multiplikation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Systolische Arrays für Effizienz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Höhere Energieeffizienz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Schnelleres Training großer Modelle</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <h4 className="font-semibold text-blue-300 mb-3">Systolische Arrays — Das Geheimnis der TPUs:</h4>
            <p className="text-white/70 mb-4">
              TPUs verwenden <strong className="text-white">systolische Arrays</strong> — eine spezielle
              Architektur, bei der Daten rhythmisch durch ein Gitter von Prozessoren fließen:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-4">
                {Array(16).fill(0).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.3)'],
                    }}
                    transition={{
                      duration: 1,
                      delay: (Math.floor(i / 4) + (i % 4)) * 0.1,
                      repeat: Infinity,
                    }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono text-white/80"
                  >
                    PE
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-white/50 text-sm">
                Daten fließen durch das Array → Jede Zelle führt eine Multiplikation-Addition aus
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">420 TFLOPS</div>
              <div className="text-white/60 text-sm">TPU v4 (bfloat16)</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">32 GB</div>
              <div className="text-white/60 text-sm">HBM Speicher pro Chip</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">2-3×</div>
              <div className="text-white/60 text-sm">Schneller als A100 GPU</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h2 className="text-xl font-bold mb-6">CPU vs. GPU vs. TPU — Vergleich</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-white/40">Eigenschaft</th>
                <th className="text-center p-3 text-red-400">CPU</th>
                <th className="text-center p-3 text-green-400">GPU</th>
                <th className="text-center p-3 text-blue-400">TPU</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">Anzahl Kerne</td>
                <td className="p-3 text-center">4–64</td>
                <td className="p-3 text-center">Tausende</td>
                <td className="p-3 text-center">Spezialisiert</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">Beste für</td>
                <td className="p-3 text-center">Sequenziell</td>
                <td className="p-3 text-center">Parallel</td>
                <td className="p-3 text-center">Matrix-Ops</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">Matrix-Mult. Speed</td>
                <td className="p-3 text-center text-red-400">1×</td>
                <td className="p-3 text-center text-green-400">50×</td>
                <td className="p-3 text-center text-blue-400">100×+</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 font-medium">Energieeffizienz</td>
                <td className="p-3 text-center text-red-400">Niedrig</td>
                <td className="p-3 text-center text-amber-400">Mittel</td>
                <td className="p-3 text-center text-green-400">Hoch</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">ML-Training</td>
                <td className="p-3 text-center text-red-400">Langsam</td>
                <td className="p-3 text-center text-green-400">Schnell</td>
                <td className="p-3 text-center text-blue-400">Sehr schnell</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Summary */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
      >
        <h2 className="text-xl font-bold mb-4">Zusammenfassung</h2>
        <div className="space-y-3 text-white/70">
          <p>
            <strong className="text-white">Tensoren</strong> sind mehrdimensionale Datenstrukturen,
            die die Grundlage aller Deep-Learning-Berechnungen bilden:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">Skalar (0D):</strong> Eine einzelne Zahl</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong className="text-white">Vektor (1D):</strong> Eine Liste von Zahlen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">•</span>
              <span><strong className="text-white">Matrix (2D):</strong> Eine Tabelle von Zahlen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-white">Tensor (3D+):</strong> Mehrdimensionale Strukturen</span>
            </li>
          </ul>
          <p className="mt-4">
            <strong className="text-green-400">GPUs</strong> sind ideal für Tensor-Berechnungen durch
            massive Parallelisierung, während <strong className="text-blue-400">TPUs</strong> durch
            ihre spezialisierte Architektur noch effizienter für ML-Workloads sind.
          </p>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          to="/transformer"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Zurück zu Transformer</span>
        </Link>
        <Link to="/" className="glow-button inline-flex items-center gap-2">
          <span>Zur Startseite</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  )
}
