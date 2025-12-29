import { useState, useEffect, useCallback } from 'react'

interface UseAnimationOptions {
  duration?: number
  delay?: number
  autoStart?: boolean
}

/**
 * Hook for controlling animations
 */
export function useAnimation(options: UseAnimationOptions = {}) {
  const { duration = 1000, delay = 0, autoStart = true } = options
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const start = useCallback(() => {
    setIsAnimating(true)
    setIsComplete(false)
    setProgress(0)
  }, [])

  const stop = useCallback(() => {
    setIsAnimating(false)
  }, [])

  const reset = useCallback(() => {
    setIsAnimating(false)
    setProgress(0)
    setIsComplete(false)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp + delay
      }

      const elapsed = timestamp - startTime

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const newProgress = Math.min(elapsed / duration, 1)
      setProgress(newProgress)

      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        setIsComplete(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isAnimating, duration, delay])

  useEffect(() => {
    if (autoStart) {
      start()
    }
  }, [autoStart, start])

  return {
    isAnimating,
    progress,
    isComplete,
    start,
    stop,
    reset,
  }
}

/**
 * Hook for revealing elements on scroll
 */
export function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold])

  return { ref: setRef, isInView }
}

/**
 * Hook for delayed updates (debouncing)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
