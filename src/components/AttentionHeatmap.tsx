import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { softmax, getAttentionColor, formatPercent } from '../utils/math'

interface AttentionHeatmapProps {
  tokens?: string[]
  showScores?: boolean
}

export function AttentionHeatmap({
  tokens = ['Welche', 'Farbe', 'hat', 'der', 'Himmel', '?'],
  showScores = true,
}: AttentionHeatmapProps) {
  const [selectedToken, setSelectedToken] = useState<number | null>(0)

  // Simulierte Attention-Scores (normalerweise aus QK^T berechnet)
  const rawScores: number[][] = useMemo(() => {
    // Vereinfachte Attention-Scores für Demo
    return [
      [1.2, 0.8, 0.3, 0.1, 0.6, 0.2],  // Welche
      [0.4, 1.5, 0.2, 0.3, 1.8, 0.1],  // Farbe (achtet auf Himmel)
      [0.2, 0.4, 1.0, 0.8, 0.3, 0.2],  // hat
      [0.1, 0.2, 0.6, 1.2, 0.4, 0.1],  // der
      [0.3, 1.2, 0.2, 0.5, 1.4, 0.2],  // Himmel (achtet auf Farbe)
      [0.5, 0.3, 0.4, 0.2, 0.3, 0.8],  // ?
    ]
  }, [])

  const attentionWeights = useMemo(() => {
    return rawScores.map(row => softmax(row))
  }, [rawScores])

  return (
    <div className="space-y-6">
      {/* Token Selection */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">
          Wähle ein Token um seine Attention zu sehen:
        </h3>
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedToken(index)}
              className={`
                px-4 py-2 rounded-xl font-mono text-lg transition-all
                ${selectedToken === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }
              `}
            >
              {token}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Attention Visualization */}
      {selectedToken !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-2">
            Attention für "{tokens[selectedToken]}"
          </h3>
          <p className="text-white/60 text-sm mb-6">
            Wie stark achtet "{tokens[selectedToken]}" auf jedes andere Token?
          </p>

          <div className="space-y-3">
            {tokens.map((token, index) => {
              const weight = attentionWeights[selectedToken][index]
              const color = getAttentionColor(weight)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-20 text-right font-mono text-white/80">
                    {token}
                  </div>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-lg"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${weight * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end px-3">
                      <span className="font-mono text-sm font-bold text-white drop-shadow-lg">
                        {formatPercent(weight)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {showScores && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-purple-500/20">
              <p className="text-white/60 text-sm mb-2">Raw Scores (vor Softmax):</p>
              <div className="flex flex-wrap gap-2 font-mono text-sm">
                {rawScores[selectedToken].map((score, i) => (
                  <span key={i} className="px-2 py-1 bg-white/10 rounded">
                    {tokens[i]}: <span className="text-purple-400">{score.toFixed(1)}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Full Heatmap Matrix */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Vollständige Attention-Matrix</h3>
        <p className="text-white/60 text-sm mb-6">
          Jede Zeile zeigt, worauf ein Token achtet (Summe = 100%)
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-white/40 text-sm">→</th>
                {tokens.map((token, i) => (
                  <th key={i} className="p-2 text-center font-mono text-white/80 text-sm">
                    {token}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-2 font-mono text-white/80 text-sm">{token}</td>
                  {attentionWeights[rowIndex].map((weight, colIndex) => (
                    <td key={colIndex} className="p-1">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-mono font-bold cursor-pointer"
                        style={{
                          backgroundColor: getAttentionColor(weight),
                          opacity: 0.3 + weight * 0.7,
                        }}
                        onClick={() => setSelectedToken(rowIndex)}
                      >
                        {(weight * 100).toFixed(0)}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <span className="text-white/60">Niedrig</span>
          <div className="flex h-4 w-32 rounded overflow-hidden">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v, i) => (
              <div
                key={i}
                className="flex-1"
                style={{ backgroundColor: getAttentionColor(v) }}
              />
            ))}
          </div>
          <span className="text-white/60">Hoch</span>
        </div>
      </div>
    </div>
  )
}
