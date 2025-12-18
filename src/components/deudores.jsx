'use client'

import { useState } from 'react'
import { Search, CreditCard, History } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDebtorsData } from '@/hooks/useDebtorsData'
import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable'

export function Deudores({ buildings, departments, selectedBuilding }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDebtor, setSelectedDebtor] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const { finalResult } = useDebtorsData(
    searchTerm,
    filterStatus,
    departments,
    selectedBuilding
  )

  const debtorHistory = selectedDebtor
    ? paymentHistory.filter((p) => p.departmentId === selectedDebtor.id)
    : []

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Gestión de Deudores
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          {buildings.find((b) => b._id === selectedBuilding)?.name}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            className="rounded-xl text-xs md:text-sm h-8 md:h-10"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === 'deudores' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('deudores')}
            className="rounded-xl text-xs md:text-sm h-8 md:h-10"
          >
            Con Deuda
          </Button>
          <Button
            variant={filterStatus === 'aldia' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('aldia')}
            className="rounded-xl text-xs md:text-sm h-8 md:h-10"
          >
            Al Día
          </Button>
        </div>
      </div>

      {/* Debtors List - Responsive */}
      <div>
        {/* Desktop Table */}
        <div className="hidden md:block rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Dpto
                </th>
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Propietario
                </th>
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Inquilino
                </th>
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Monto Adeudado
                </th>
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Meses de Mora
                </th>
                <th className="text-left px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="text-right px-4 py-3 text-xs md:text-sm font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {finalResult.map((dept) => (
                <tr
                  key={dept._id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground text-xs md:text-sm">
                      {dept.number}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground text-xs md:text-sm">
                    {dept.owner}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs md:text-sm">
                    {dept.tenant}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs md:text-sm font-medium ${
                        dept.debt > 0
                          ? 'text-destructive font-semibold'
                          : 'text-foreground'
                      }`}
                    >
                      S/ {dept.debt.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs md:text-sm">
                    {dept.monthsOverdue}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        dept.debt > 0
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-chart-2/10 text-chart-2'
                      }`}
                    >
                      {dept.debt > 0 ? 'Con Deuda' : 'Al Día'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDebtor(dept)}
                      className="rounded-lg text-xs md:text-sm h-8"
                    >
                      Detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {finalResult.map((dept) => (
            <Card key={dept._id} className="border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {dept.number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {dept.owner}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {dept.tenant || 'Sin inquilino'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                      dept.debt > 0
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-chart-2/10 text-chart-2'
                    }`}
                  >
                    {dept.debt > 0 ? 'Deuda' : 'Ok'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Adeudado
                    </p>
                    <p className="text-sm font-semibold text-destructive">
                      S/ {dept.debt.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Mora</p>
                    <p className="text-sm font-semibold text-foreground">
                      {dept.monthsOverdue}m
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedDebtor(dept)}
                  className="w-full rounded-lg text-xs h-8"
                  variant="outline"
                >
                  Ver Detalle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedDebtor && !showPaymentModal}
        onOpenChange={() => setSelectedDebtor(null)}
      >
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm md:text-lg font-semibold text-primary flex-shrink-0">
                {selectedDebtor?.number}
              </div>
              <div className="min-w-0">
                <p className="text-sm md:text-lg font-semibold truncate">
                  {selectedDebtor?.owner}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-normal">
                  Dpto {selectedDebtor?.number}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Monto Adeudado
                </p>
                <p className="text-lg md:text-xl font-semibold text-destructive">
                  S/ {selectedDebtor?.debt.toFixed(2)}
                </p>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Meses de Mora
                </p>
                <p className="text-lg md:text-xl font-semibold text-foreground">
                  {selectedDebtor?.monthsOverdue}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs md:text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <History className="w-4 h-4" />
                Historial de Pagos
              </h4>
              <div className="space-y-2">
                {debtorHistory && debtorHistory.length > 0 ? (
                  debtorHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="text-xs md:text-sm font-medium text-foreground">
                          {payment.concept}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.date}
                        </p>
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-chart-2">
                        S/ {payment.amount.toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground text-center py-3 md:py-4">
                    Sin pagos registrados
                  </p>
                )}
              </div>
            </div>

            {selectedDebtor?.debt > 0 && (
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="w-full rounded-xl text-xs md:text-sm h-8 md:h-10"
              >
                <CreditCard className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Registrar Pago
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-sm rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-sm md:text-base">
              Registrar Pago
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Departamento {selectedDebtor?.number} - {selectedDebtor?.owner}
            </p>
            <p className="text-xs md:text-sm">
              Deuda actual:{' '}
              <span className="font-semibold text-destructive">
                S/ {selectedDebtor?.debt.toFixed(2)}
              </span>
            </p>
            <div>
              <label className="text-xs md:text-sm font-medium text-foreground mb-2 block">
                Monto a Pagar (S/)
              </label>
              <Input
                type="number"
                value={''}
                onChange={''}
                placeholder="0.00"
                className="rounded-xl text-xs md:text-sm"
              />
            </div>
            <div className="flex gap-2 md:gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 rounded-xl text-xs md:text-sm h-8 md:h-10"
              >
                Cancelar
              </Button>
              <Button
                onClick={''}
                className="flex-1 rounded-xl text-xs md:text-sm h-8 md:h-10"
                disabled={!''}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
