export function useDashboardData(departments, selectedBuilding) {
  const filtered =
    selectedBuilding === 'all'
      ? departments
      : departments.filter((d) => d.building === selectedBuilding)

  const totalDebt = filtered
    .map((d) => Number(d.debt['$numberDecimal'].toString()))
    .reduce((sum, debt) => sum + debt, 0)

  const totalWater = filtered.reduce((sum, d) => sum + d.waterReading, 0)
  const totalElectricity = filtered.reduce(
    (sum, d) => sum + d.electricityReading,
    0
  )

  const debtors = filtered.filter(
    (d) => Number(d.debt['$numberDecimal'].toString()) > 0
  )

  return {
    filtered,
    totalDebt,
    totalWater,
    totalElectricity,
    debtors,
  }
}
