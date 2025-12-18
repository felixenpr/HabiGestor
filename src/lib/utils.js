import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDecimalNumber(value) {
  const number = Number(value.toString())

  return number
}

