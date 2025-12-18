import { formatDecimalNumber } from '@/lib/utils'

export const useDebtorsData = (
  searchTerm,
  filterStatus,
  departments,
  selectedBuilding
) => {
  const filtered = departments
    .filter((d) =>
      selectedBuilding === 'all' ? true : d.building === selectedBuilding
    )
    .filter((d) => {
      if (filterStatus === 'deudores')
        return Number(d.debt['$numberDecimal'].toString()) > 0
      if (filterStatus === 'aldia')
        return Number(d.debt['$numberDecimal'].toString()) === 0
      return true
    })
    .filter(
      (d) =>
        d.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.number.includes(searchTerm) ||
        d.tenant.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const finalResult = normalizeDepartmentData(filtered)

  return {
    finalResult,
  }
}

export const normalizeDepartmentData = (departments) => {
  return departments.map((dept) => ({
    ...dept,
    debt: formatDecimalNumber(dept.debt['$numberDecimal']),
  }))
}
