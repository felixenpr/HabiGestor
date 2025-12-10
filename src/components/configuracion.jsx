"use client"

import { useState } from "react"
import { Save, Droplets, Zap, Home, Shield, Sparkles, TreePine } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { defaultRates } from "@/lib/mock-data"

export function Configuracion() {
  const [rates, setRates] = useState(defaultRates)
  const [saved, setSaved] = useState(false)

  const handleRateChange = (key, value) => {
    setRates((prev) => ({
      ...prev,
      [key]: Number.parseFloat(value) || 0,
    }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const rateCards = [
    {
      key: "waterRate",
      title: "Tarifa de Agua",
      description: "Costo por metro cúbico (m³)",
      icon: Droplets,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      unit: "S/ / m³",
    },
    {
      key: "electricityRate",
      title: "Tarifa de Electricidad",
      description: "Costo por kilovatio hora (kWh)",
      icon: Zap,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      unit: "S/ / kWh",
    },
  ]

  const fixedCharges = [
    {
      key: "maintenance",
      title: "Mantenimiento",
      description: "Cargo mensual por mantenimiento general",
      icon: Home,
    },
    {
      key: "cleaning",
      title: "Limpieza",
      description: "Cargo mensual por servicio de limpieza",
      icon: Sparkles,
    },
    {
      key: "security",
      title: "Seguridad",
      description: "Cargo mensual por servicio de vigilancia",
      icon: Shield,
    },
    {
      key: "commonAreas",
      title: "Áreas Comunes",
      description: "Cargo por uso de áreas comunes",
      icon: TreePine,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Configuración de Tarifas</h1>
        <p className="text-muted-foreground mt-1">Administra las tarifas y cargos fijos del condominio</p>
      </div>

      {/* Variable Rates */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">Tarifas Variables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rateCards.map((rate) => {
            const Icon = rate.icon
            return (
              <Card key={rate.key} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${rate.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${rate.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{rate.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{rate.description}</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={rates[rate.key]}
                          onChange={(e) => handleRateChange(rate.key, e.target.value)}
                          className="w-32 rounded-xl"
                        />
                        <span className="text-sm text-muted-foreground">{rate.unit}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Fixed Charges */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">Cargos Fijos Mensuales</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fixedCharges.map((charge) => {
                const Icon = charge.icon
                return (
                  <div key={charge.key} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{charge.title}</p>
                      <p className="text-xs text-muted-foreground">{charge.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">S/</span>
                      <Input
                        type="number"
                        step="0.01"
                        value={rates[charge.key]}
                        onChange={(e) => handleRateChange(charge.key, e.target.value)}
                        className="w-24 rounded-lg"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="border-0 shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Resumen de Cargos Fijos</CardTitle>
          <CardDescription>Total mensual por departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5">
            <span className="font-medium text-foreground">Total Cargos Fijos:</span>
            <span className="text-2xl font-bold text-primary">
              S/ {(rates.maintenance + rates.cleaning + rates.security + rates.commonAreas).toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="rounded-xl px-8">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "¡Guardado!" : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
