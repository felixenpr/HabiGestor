// Modo por defecto: "flat_bracket" (si el consumo cae en un rango, toda la porción usa esa tarifa).
// Si prefieres cálculo por tramos acumulativos, cambiar TARIFF_MODE a "tiered".

export const TARIFF_MODE = 'flat_bracket' // "flat_bracket" | "tiered"

export const TARIFFS = [
  { max: 20, agua: 2.015, saneamiento: 1.257 },
  { max: 50, agua: 2.862, saneamiento: 1.76 },
  { max: Infinity, agua: 7.314, saneamiento: 3.486 },
]

export function findBracket(consumo) {
  for (const t of TARIFFS) {
    if (consumo <= t.max) return t
  }
  return TARIFFS[TARIFFS.length - 1]
}

export function calculateWaterSewerCost(consumo) {
  consumo = Number(consumo) || 0
  if (consumo <= 0)
    return {
      detallePorTramo: [],
      totalAgua: 0,
      totalSaneamiento: 0,
      subtotal: 0,
    }

  if (TARIFF_MODE === 'flat_bracket') {
    const bracket = findBracket(consumo)
    const totalAgua = round(consumo * bracket.agua)
    const totalSaneamiento = round(consumo * bracket.saneamiento)
    const subtotal = round(totalAgua + totalSaneamiento)
    return {
      detallePorTramo: [
        {
          tipo: 'flat_bracket',
          consumo,
          aguaRate: bracket.agua,
          saneamientoRate: bracket.saneamiento,
          aguaCost: totalAgua,
          saneamientoCost: totalSaneamiento,
        },
      ],
      totalAgua,
      totalSaneamiento,
      subtotal,
    }
  }

  // modo "tiered" (acumulativo por tramos)
  let remaining = consumo
  let prevMax = 0
  const detalle = []
  let totalAgua = 0
  let totalSaneamiento = 0

  for (const t of TARIFFS) {
    const trancheCap = t.max === Infinity ? Infinity : t.max - prevMax
    const used = Math.min(
      remaining,
      trancheCap === Infinity ? remaining : trancheCap
    )
    if (used <= 0) {
      prevMax = t.max
      continue
    }

    const aguaCost = round(used * t.agua)
    const saneCost = round(used * t.saneamiento)

    detalle.push({
      tipo: 'tier',
      tramoMax: t.max,
      consumoEnTramo: used,
      aguaRate: t.agua,
      saneamientoRate: t.saneamiento,
      aguaCost,
      saneamientoCost: saneCost,
    })

    totalAgua += aguaCost
    totalSaneamiento += saneCost

    remaining -= used
    prevMax = t.max
    if (remaining <= 0) break
  }

  const subtotal = round(totalAgua + totalSaneamiento)
  return {
    detallePorTramo: detalle,
    totalAgua: round(totalAgua),
    totalSaneamiento: round(totalSaneamiento),
    subtotal,
  }
}

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}
