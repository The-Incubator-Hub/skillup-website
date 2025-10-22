"use client"
import { useEffect, useState } from "react"

interface FlipNumberProps {
  value: number
  duration?: number // animation time in ms
}

export default function FlipNumber({ value, duration = 1000 }: FlipNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const start = displayValue
    const end = value
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplayValue(Math.floor(progress * (end - start) + start)) 
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [value])

  return (
    <span className="flip-number">{displayValue.toLocaleString()}</span>
  )
}
