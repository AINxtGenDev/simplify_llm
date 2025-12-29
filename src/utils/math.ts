/**
 * Mathematical helper functions for visualization
 */

/**
 * Computes the softmax function for an array of numbers
 */
export function softmax(values: number[], temperature: number = 1): number[] {
  const scaled = values.map(v => v / temperature)
  const maxVal = Math.max(...scaled)
  const exps = scaled.map(v => Math.exp(v - maxVal))
  const sumExps = exps.reduce((a, b) => a + b, 0)
  return exps.map(e => e / sumExps)
}

/**
 * Formats a number as a percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Formats a number with a fixed number of decimal places
 */
export function formatNumber(value: number, decimals: number = 3): string {
  return value.toFixed(decimals)
}

/**
 * Computes the dot product of two vectors
 */
export function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

/**
 * Normalizes a vector
 */
export function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0))
  return vector.map(v => v / magnitude)
}

/**
 * Computes attention scores
 */
export function computeAttentionScores(
  query: number[],
  keys: number[][],
  scaleFactor?: number
): number[] {
  const dk = scaleFactor ?? Math.sqrt(query.length)
  return keys.map(key => dotProduct(query, key) / dk)
}

/**
 * Interpolates between two colors based on a value between 0 and 1
 */
export function interpolateColor(
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): string {
  const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor)
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor)
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Generates a color based on attention weight
 */
export function getAttentionColor(weight: number): string {
  // From blue (low) through purple to pink (high)
  const low: [number, number, number] = [59, 130, 246] // blue-500
  const high: [number, number, number] = [236, 72, 153] // pink-500
  return interpolateColor(low, high, weight)
}

/**
 * Example tokens for demonstrations (German UI text)
 */
export const exampleTokens = [
  { token: 'Welche', id: 1 },
  { token: 'Farbe', id: 2 },
  { token: 'hat', id: 3 },
  { token: 'der', id: 4 },
  { token: 'Himmel', id: 5 },
  { token: '?', id: 6 },
]

/**
 * Example embeddings (simplified, 4-dimensional)
 */
export const exampleEmbeddings: Record<string, number[]> = {
  'Welche': [0.2, -0.5, 0.8, -0.3],
  'Farbe': [0.7, 0.3, -0.2, 0.9],
  'hat': [-0.1, 0.4, 0.2, -0.6],
  'der': [0.0, -0.2, 0.1, 0.3],
  'Himmel': [0.9, 0.6, 0.4, -0.1],
  '?': [-0.4, 0.1, -0.3, 0.2],
}

/**
 * Example logits for softmax demonstration (German words)
 */
export const exampleLogits = [
  { word: 'blau', logit: 3.2 },
  { word: 'grau', logit: 1.8 },
  { word: 'bewölkt', logit: 1.5 },
  { word: 'klar', logit: 1.2 },
  { word: 'rot', logit: 0.8 },
  { word: 'grün', logit: 0.3 },
]
