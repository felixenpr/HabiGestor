export const useReadingsData = (departments, selectedBuilding, buildings) => {
  const filtered = departments.filter((d) =>
    selectedBuilding === 'all' ? true : d.building === selectedBuilding
  )

  const buildingName =
    buildings.find((b) => b._id === selectedBuilding)?.name ||
    'Todos los Edificios'

  return {
    filtered,
    buildingName,
  }
}
