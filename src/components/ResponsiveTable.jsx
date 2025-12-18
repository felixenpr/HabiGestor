'use client'

import { cn } from '@/lib/utils'

/**
 * Componente responsivo que muestra tablas en desktop y cards en móvil
 * @param {Object} config - { headers: string[], rows: Object[], renderRow: function }
 */
export function ResponsiveTable({ headers, rows, renderRow, className }) {
  // Vista desktop: tabla
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                {renderRow(row, 'desktop')}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={cn(
              'p-4 rounded-lg border border-border bg-card space-y-3',
              className
            )}
          >
            {renderRow(row, 'mobile')}
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * Celda de tabla responsiva
 */
export function ResponsiveTableCell({ label, value, isMobile, className }) {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className={cn('text-foreground', className)}>{value}</span>
      </div>
    )
  }

  return (
    <td className={cn('px-4 py-3 text-sm text-foreground', className)}>
      {value}
    </td>
  )
}
