'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Gauge,
  Receipt,
  Settings,
  Building2,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'deudores', label: 'Deudores', icon: Users },
  { id: 'lecturas', label: 'Lecturas', icon: Gauge },
  { id: 'recibos', label: 'Recibos', icon: Receipt },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
]

export function MobileNavigation({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="font-semibold text-foreground">HabiGestor</h1>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="border-t border-border bg-card">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all border-b border-border last:border-0',
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        )}
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
