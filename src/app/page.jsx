'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { Deudores } from '@/components/deudores'
import { Lecturas } from '@/components/lecturas'
import { Recibos } from '@/components/recibos'
import { Configuracion } from '@/components/configuracion'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedBuilding, setSelectedBuilding] = useState('edificio-1')

  useEffect(() => {
    fetch('/api/departamentos')
      .then((r) => r.json())
      .then(setSelectedBuilding)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
          />
        )
      case 'deudores':
        return <Deudores selectedBuilding={selectedBuilding} />
      case 'lecturas':
        return <Lecturas selectedBuilding={selectedBuilding} />
      case 'recibos':
        return <Recibos selectedBuilding={selectedBuilding} />
      case 'configuracion':
        return <Configuracion />
      default:
        return (
          <Dashboard
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
          />
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
