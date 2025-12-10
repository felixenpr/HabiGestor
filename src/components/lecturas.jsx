"use client"

import { useState } from "react"
import { Droplets, Zap, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { departments, buildings, defaultRates } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Lecturas({ selectedBuilding }) {
  const [readings, setReadings] = useState({})
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const filteredDepts = departments.filter((d) => d.building === selectedBuilding)
  const buildingName = buildings.find((b) => b.id === selectedBuilding)?.name

  const handleReadingChange = (deptId, type, value) => {
    setReadings((prev) => ({
      ...prev,
      [deptId]: {
        ...prev[deptId],
        [type]: Number.parseFloat(value) || 0,
      },
    }))
  }

  const calculateConsumption = (dept, type) => {
    const currentReading = readings[dept.id]?.[type] || 0
    const previousReading = type === "water" ? dept.waterReading : dept.electricityReading
    return Math.max(0, currentReading - previousReading)
  }

  const calculateAmount = (dept, type) => {
    const consumption = calculateConsumption(dept, type)
    const rate = type === "water" ? defaultRates.waterRate : defaultRates.electricityRate
    return consumption * rate
  }

  const generateReceipt = (dept, type) => {
    const consumption = calculateConsumption(dept, type)
    const amount = calculateAmount(dept, type)
    const previousReading = type === "water" ? dept.waterReading : dept.electricityReading
    const currentReading = readings[dept.id]?.[type] || 0

    setSelectedReceipt({
      type,
      tenant: dept.tenant,
      department: dept.number,
      month: new Date().toLocaleDateString("es-PE", { month: "long", year: "numeric" }),
      previousReading,
      currentReading,
      consumption,
      unit: type === "water" ? "m³" : "kWh",
      rate: type === "water" ? defaultRates.waterRate : defaultRates.electricityRate,
      amount,
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Sistema de Lecturas</h1>
        <p className="text-muted-foreground mt-1">{buildingName}</p>
      </div>

      <Tabs defaultValue="water" className="space-y-6">
        <TabsList className="bg-muted p-1 rounded-xl">
          <TabsTrigger value="water" className="rounded-lg data-[state=active]:bg-background">
            <Droplets className="w-4 h-4 mr-2" />
            Agua
          </TabsTrigger>
          <TabsTrigger value="electricity" className="rounded-lg data-[state=active]:bg-background">
            <Zap className="w-4 h-4 mr-2" />
            Electricidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="water">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Droplets className="w-5 h-5 text-chart-2" />
                Lecturas de Agua
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Dpto</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Inquilino</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lectura Anterior (m³)</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lectura Actual (m³)</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Consumo (m³)</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Monto (S/)</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepts.map((dept) => (
                      <tr key={dept.id} className="border-b border-border last:border-0">
                        <td className="p-4 font-medium text-foreground">{dept.number}</td>
                        <td className="p-4 text-foreground">{dept.tenant}</td>
                        <td className="p-4 text-muted-foreground">{dept.waterReading}</td>
                        <td className="p-4">
                          <Input
                            type="number"
                            value={readings[dept.id]?.water || ""}
                            onChange={(e) => handleReadingChange(dept.id, "water", e.target.value)}
                            placeholder={dept.waterReading.toString()}
                            className="w-24 rounded-lg"
                          />
                        </td>
                        <td className="p-4 text-foreground">{calculateConsumption(dept, "water")}</td>
                        <td className="p-4 font-semibold text-chart-2">
                          S/ {calculateAmount(dept, "water").toFixed(2)}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateReceipt(dept, "water")}
                            disabled={!readings[dept.id]?.water}
                            className="rounded-lg"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Recibo
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electricity">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-chart-4" />
                Lecturas de Electricidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Dpto</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Inquilino</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Lectura Anterior (kWh)
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lectura Actual (kWh)</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Consumo (kWh)</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Monto (S/)</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepts.map((dept) => (
                      <tr key={dept.id} className="border-b border-border last:border-0">
                        <td className="p-4 font-medium text-foreground">{dept.number}</td>
                        <td className="p-4 text-foreground">{dept.tenant}</td>
                        <td className="p-4 text-muted-foreground">{dept.electricityReading}</td>
                        <td className="p-4">
                          <Input
                            type="number"
                            value={readings[dept.id]?.electricity || ""}
                            onChange={(e) => handleReadingChange(dept.id, "electricity", e.target.value)}
                            placeholder={dept.electricityReading.toString()}
                            className="w-24 rounded-lg"
                          />
                        </td>
                        <td className="p-4 text-foreground">{calculateConsumption(dept, "electricity")}</td>
                        <td className="p-4 font-semibold text-chart-4">
                          S/ {calculateAmount(dept, "electricity").toFixed(2)}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateReceipt(dept, "electricity")}
                            disabled={!readings[dept.id]?.electricity}
                            className="rounded-lg"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Recibo
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Receipt Preview Modal */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedReceipt?.type === "water" ? (
                <Droplets className="w-5 h-5 text-chart-2" />
              ) : (
                <Zap className="w-5 h-5 text-chart-4" />
              )}
              Recibo de {selectedReceipt?.type === "water" ? "Agua" : "Electricidad"}
            </DialogTitle>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 mt-4">
              <div className="p-6 border border-border rounded-xl space-y-4">
                <div className="text-center border-b border-border pb-4">
                  <h3 className="font-semibold text-lg text-foreground">{buildingName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibo de {selectedReceipt.type === "water" ? "Agua" : "Electricidad"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Inquilino:</p>
                    <p className="font-medium text-foreground">{selectedReceipt.tenant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Departamento:</p>
                    <p className="font-medium text-foreground">{selectedReceipt.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Período:</p>
                    <p className="font-medium text-foreground capitalize">{selectedReceipt.month}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tarifa:</p>
                    <p className="font-medium text-foreground">
                      S/ {selectedReceipt.rate.toFixed(2)}/{selectedReceipt.unit}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lectura Anterior:</span>
                    <span className="text-foreground">
                      {selectedReceipt.previousReading} {selectedReceipt.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lectura Actual:</span>
                    <span className="text-foreground">
                      {selectedReceipt.currentReading} {selectedReceipt.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consumo:</span>
                    <span className="font-medium text-foreground">
                      {selectedReceipt.consumption} {selectedReceipt.unit}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">TOTAL A PAGAR:</span>
                    <span className="text-2xl font-bold text-primary">S/ {selectedReceipt.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedReceipt(null)} className="flex-1 rounded-xl">
                  Cerrar
                </Button>
                <Button onClick={() => window.print()} className="flex-1 rounded-xl">
                  Imprimir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
