"use client"

import { LayoutDashboard, Users, Gauge, Receipt, Settings, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "deudores", label: "Deudores", icon: Users },
  { id: "lecturas", label: "Lecturas", icon: Gauge },
  { id: "recibos", label: "Recibos", icon: Receipt },
  { id: "configuracion", label: "Configuración", icon: Settings },
]

export function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 border-r border-border bg-card h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">CondoAdmin</h1>
            <p className="text-xs text-muted-foreground">Panel de Control</p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
