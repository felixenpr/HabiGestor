import { useState, useEffect } from 'react'

export function useRatesSettings(settings, buildings) {
  const rates = settings?.type === 'rates' ? settings : null

  const [data, setData] = useState({
    waterRate: 0,
    electricityRate: 0,
    sewerRate: 0,
    taxRate: 0,
    maintenanceRates: [],
  })

  useEffect(() => {
    if (!rates) return

    setData({
      waterRate: Number(rates.waterRate ?? 0),
      electricityRate: Number(rates.electricityRate ?? 0),
      sewerRate: Number(rates.sewerRate ?? 0),
      taxRate: rates.taxRate ?? 0,
      maintenanceRates: rates.maintenance.map((b) => {
        const building = buildings.find(
          (x) => x._id.toString() === b.buildingId
        )
        return {
          buildingId: b.buildingId,
          buildingName: building?.name ?? 'Unknown',
          amount: b.value,
        }
      }),
    })
  }, [rates, buildings])

  const updateRate = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: Number(value),
    }))
  }

  const updateMaintenance = (buildingId, value) => {
    setData((prev) => ({
      ...prev,
      maintenanceRates: prev.maintenanceRates.map((m) =>
        m.buildingId === buildingId ? { ...m, amount: Number(value) } : m
      ),
    }))
  }

  return {
    data,
    updateRate,
    updateMaintenance,
  }
}
