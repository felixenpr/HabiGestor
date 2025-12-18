'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Gauge,
  Receipt,
  Settings,
  Building2,
  ChevronLeft,
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

export function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r border-border bg-card h-screen sticky top-0 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between gap-3">
          {!isCollapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="font-semibold text-foreground truncate">
                  HabiGestor
                </h1>
                <p className="text-xs text-muted-foreground">
                  Panel de Control
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0',
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                isCollapsed && 'px-2 justify-center'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer: Collapse Button */}
      <div className="p-3 md:p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full rounded-xl"
        >
          <ChevronLeft
            className={cn('w-4 h-4 transition-transform', {
              'rotate-180': isCollapsed,
            })}
          />
          {!isCollapsed && <span>Contraer</span>}
        </Button>
      </div>
    </aside>
  )
}
