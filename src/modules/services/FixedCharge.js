export const FIXED_CHARGE = 6.256 // S/
export const IGV_RATE = 0.18 // 18%

export function calculateFixedAndIgv(subtotalWithoutFixed) {
  const fixed = Number(FIXED_CHARGE) || 0
  const subtotal = round(subtotalWithoutFixed + fixed)
  const igv = round(subtotal * IGV_RATE)
  const total = round(subtotal + igv)
  return { fixed, subtotal, igv, total }
}

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}
