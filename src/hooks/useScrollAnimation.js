import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

export function useCountUp(target, duration = 2000, isVisible = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const numericTarget = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[\d]/g, '')
    let start = 0
    const increment = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericTarget) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start) + suffix)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, isVisible])

  return count
}
