import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { softmax, formatPercent, formatNumber } from '../utils/math'

interface LogitItem {
  word: string
  logit: number
}

interface SoftmaxVisualizerProps {
  initialLogits?: LogitItem[]
  showTemperature?: boolean
}

export function SoftmaxVisualizer({
  initialLogits = [
    { word: 'blau', logit: 3.2 },
    { word: 'grau', logit: 1.8 },
    { word: 'bewölkt', logit: 1.5 },
    { word: 'klar', logit: 1.2 },
    { word: 'rot', logit: 0.8 },
  ],
  showTemperature = true,
}: SoftmaxVisualizerProps) {
  const [temperature, setTemperature] = useState(1)
  const [logits] = useState(initialLogits)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const probabilities = useMemo(() => {
    const values = logits.map((l) => l.logit)
    return softmax(values, temperature)
  }, [logits, temperature])

  const exponentials = useMemo(() => {
    return logits.map((l) => Math.exp(l.logit / temperature))
  }, [logits, temperature])

  const sumExp = useMemo(() => {
    return exponentials.reduce((a, b) => a + b, 0)
  }, [exponentials])

  const maxProb = Math.max(...probabilities)

  return (
    <div className="space-y-8">
      {/* Temperature Control */}
      {showTemperature && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Temperatur: τ = {temperature.toFixed(1)}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTemperature(0.5)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  temperature === 0.5
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                0.5 (scharf)
              </button>
              <button
                onClick={() => setTemperature(1)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  temperature === 1
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                1.0 (normal)
              </button>
              <button
                onClick={() => setTemperature(2)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  temperature === 2
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                2.0 (weich)
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-sm text-white/50 mt-2">
            <span>Schärfer (konzentrierter)</span>
            <span>Weicher (gleichmäßiger)</span>
          </div>
        </div>
      )}

      {/* Visualization */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Logits → Wahrscheinlichkeiten</h3>

        <div className="space-y-4">
          <AnimatePresence>
            {logits.map((item, index) => (
              <motion.div
                key={item.word}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-4">
                  {/* Word */}
                  <div className="w-24 text-right font-mono text-white/80">
                    {item.word}
                  </div>

                  {/* Logit */}
                  <div className="w-16 text-center">
                    <span className="text-purple-400 font-mono text-sm">
                      {formatNumber(item.logit, 1)}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="text-white/30">→</div>

                  {/* Probability Bar */}
                  <div className="flex-1 relative h-10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(probabilities[index] / maxProb) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="font-bold text-white drop-shadow-lg">
                        {formatPercent(probabilities[index])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Detail */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-32 -top-12 z-10 glass-card p-3 text-sm"
                    >
                      <div className="font-mono text-xs">
                        <span className="text-purple-400">exp({formatNumber(item.logit / temperature, 2)})</span>
                        <span className="text-white/50"> = </span>
                        <span className="text-cyan-400">{formatNumber(exponentials[index], 3)}</span>
                      </div>
                      <div className="font-mono text-xs mt-1">
                        <span className="text-cyan-400">{formatNumber(exponentials[index], 3)}</span>
                        <span className="text-white/50"> / </span>
                        <span className="text-pink-400">{formatNumber(sumExp, 3)}</span>
                        <span className="text-white/50"> = </span>
                        <span className="text-emerald-400">{formatPercent(probabilities[index])}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sum Verification */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-white/60">Summe aller Wahrscheinlichkeiten:</span>
          <span className="font-mono text-emerald-400 font-bold">
            {formatNumber(probabilities.reduce((a, b) => a + b, 0), 6)} = 1.0 ✓
          </span>
        </div>
      </div>

      {/* Formula Display */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Die Softmax-Formel</h3>
        <div className="bg-slate-800/50 rounded-xl p-4 overflow-x-auto border border-purple-500/20">
          <pre className="text-center font-mono text-lg">
            <span className="text-purple-400">softmax</span>
            <span className="text-white">(x</span>
            <span className="text-cyan-400">ᵢ</span>
            <span className="text-white">) = </span>
            <span className="text-pink-400">e</span>
            <sup className="text-cyan-400">xᵢ/τ</sup>
            <span className="text-white"> / </span>
            <span className="text-emerald-400">Σ</span>
            <span className="text-pink-400">e</span>
            <sup className="text-cyan-400">xⱼ/τ</sup>
          </pre>
        </div>
        <p className="text-white/60 text-sm mt-4 text-center">
          τ (Temperatur) = {temperature.toFixed(1)} |
          Σ exp(xⱼ/τ) = {formatNumber(sumExp, 3)}
        </p>
      </div>
    </div>
  )
}
