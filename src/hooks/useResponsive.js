'use client'

import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState(null)

  useEffect(() => {
    setWindowSize(window.innerWidth)

    function handleResize() {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (windowSize === null) return null

  return {
    width: windowSize,
    isMobile: windowSize < BREAKPOINTS.md,
    isTablet: windowSize >= BREAKPOINTS.md && windowSize < BREAKPOINTS.lg,
    isDesktop: windowSize >= BREAKPOINTS.lg,
    isSm: windowSize >= BREAKPOINTS.sm,
    isMd: windowSize >= BREAKPOINTS.md,
    isLg: windowSize >= BREAKPOINTS.lg,
    isXl: windowSize >= BREAKPOINTS.xl,
    is2xl: windowSize >= BREAKPOINTS['2xl'],
  }
}
