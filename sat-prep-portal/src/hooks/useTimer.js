import { useState, useEffect, useRef } from 'react'

export const useTimer = (initialTime = 1800) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime)
    setIsRunning(false)
  }

  const addTime = (seconds) => {
    setTimeLeft(prev => prev + seconds)
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getTimerState = () => {
    if (timeLeft < 300) return 'danger'  // Less than 5 minutes
    if (timeLeft < 600) return 'warning' // Less than 10 minutes
    return 'normal'
  }

  return {
    timeLeft,
    isRunning,
    formatTime: formatTime(timeLeft),
    timerState: getTimerState(),
    startTimer,
    pauseTimer,
    resetTimer,
    addTime
  }
}