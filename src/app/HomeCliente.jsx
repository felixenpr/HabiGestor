'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Dashboard } from '@/components/dashboard'
import { Deudores } from '@/components/deudores'
import { Lecturas } from '@/components/lecturas'
import { Recibos } from '@/components/recibos'
import { Configuracion } from '@/components/configuracion'

export default function Home({ buildings, departments, settings }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedBuilding, setSelectedBuilding] = useState('all')

  const renderContent = () => {
    const sharedProps = {
      buildings,
      departments,
      selectedBuilding,
      setSelectedBuilding,
      settings,
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard {...sharedProps} />
      case 'deudores':
        return <Deudores {...sharedProps} />
      case 'lecturas':
        return <Lecturas {...sharedProps} />
      case 'recibos':
        return <Recibos {...sharedProps} />
      case 'configuracion':
        return <Configuracion settings={settings} buildings={buildings} />
      default:
        return <Dashboard {...sharedProps} />
    }
  }

  return (
    <div className="flex min-h-screen bg-background flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {renderContent()}
      </main>
    </div>
  )
}
