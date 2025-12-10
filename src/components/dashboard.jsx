"use client"

import { Bell, Droplets, Zap, Wallet, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buildings, departments, recentActivity, monthlyData } from "@/lib/mock-data"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function Dashboard({ selectedBuilding, setSelectedBuilding }) {
  const filteredDepts = departments.filter((d) => d.building === selectedBuilding)
  const totalDebt = filteredDepts.reduce((sum, d) => sum + d.debt, 0)
  const totalWater = filteredDepts.reduce((sum, d) => sum + d.waterReading, 0)
  const totalElectricity = filteredDepts.reduce((sum, d) => sum + d.electricityReading, 0)
  const debtors = filteredDepts.filter((d) => d.debt > 0)

  const buildingName = buildings.find((b) => b.id === selectedBuilding)?.name || "Edificio"

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Bienvenido, Administrador</h1>
          <p className="text-muted-foreground mt-1">Panel de administración de condominios</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="appearance-none bg-card border border-border rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <Button variant="outline" size="icon" className="relative rounded-xl bg-transparent">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Deudas</p>
                <p className="text-3xl font-semibold text-foreground">S/ {totalDebt.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">{debtors.length} departamentos con deuda</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lecturas de Agua</p>
                <p className="text-3xl font-semibold text-foreground">{totalWater} m³</p>
                <p className="text-xs text-muted-foreground mt-2">{filteredDepts.length} departamentos</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-chart-2/10 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lecturas de Electricidad</p>
                <p className="text-3xl font-semibold text-foreground">{totalElectricity} kWh</p>
                <p className="text-xs text-muted-foreground mt-2">{filteredDepts.length} departamentos</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-chart-4/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Debtors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Resumen Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} barGap={8}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  tickFormatter={(value) => `S/${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`S/ ${value.toFixed(2)}`, ""]}
                />
                <Legend />
                <Bar dataKey="ingresos" fill="var(--chart-2)" radius={[6, 6, 0, 0]} name="Ingresos" />
                <Bar dataKey="gastos" fill="var(--chart-1)" radius={[6, 6, 0, 0]} name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Deudores Recientes</CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {debtors.length} total
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {debtors.slice(0, 4).map((debtor) => (
                <div key={debtor.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {debtor.number}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{debtor.owner}</p>
                      <p className="text-xs text-muted-foreground">{debtor.monthsOverdue} meses de mora</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-destructive">S/ {debtor.debt.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "payment"
                      ? "bg-chart-2"
                      : activity.type === "reading"
                        ? "bg-chart-4"
                        : activity.type === "debt"
                          ? "bg-destructive"
                          : "bg-primary"
                  }`}
                />
                <p className="text-sm text-foreground flex-1">{activity.message}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
