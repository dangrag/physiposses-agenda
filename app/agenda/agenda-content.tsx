'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { gerarAgendamentosMes, type Agendamento } from '@/lib/data'
import { Plus, ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const statusColors: Record<string, string> = {
  confirmado: 'bg-[#4CAF50]',
  pendente: 'bg-[#FFC107]',
  cancelado: 'bg-[#9E9E9E]',
}

const statusLabels: Record<string, string> = {
  confirmado: 'Confirmado',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
}

const statusTextColors: Record<string, string> = {
  confirmado: 'text-white',
  pendente: 'text-gray-800',
  cancelado: 'text-white',
}

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function AgendaContent() {
  const [mes, setMes] = useState(10) // November (0-indexed)
  const [ano, setAno] = useState(2024)
  const [viewMode, setViewMode] = useState<'mes' | 'semana' | 'dia'>('mes')
  const [selectedAppt, setSelectedAppt] = useState<Agendamento | null>(null)

  const agendamentos = useMemo(() => gerarAgendamentosMes(), [])

  // Calendar generation
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()
  const diasCalendario: (number | null)[] = []
  for (let i = 0; i < primeiroDia; i++) diasCalendario.push(null)
  for (let i = 1; i <= diasNoMes; i++) diasCalendario.push(i)

  const getAgendamentosDia = (dia: number) => {
    const dataStr = `2024-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
    return (agendamentos ?? []).filter((a: Agendamento) => a?.data === dataStr)
  }

  const mesAnterior = () => {
    if (mes === 0) { setMes(11); setAno(ano - 1) }
    else setMes(mes - 1)
  }
  const mesSeguinte = () => {
    if (mes === 11) { setMes(0); setAno(ano + 1) }
    else setMes(mes + 1)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-[#1976D2]" /> Agenda
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
            {(['mes', 'semana', 'dia'] as const).map((mode: 'mes' | 'semana' | 'dia') => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === mode ? 'bg-[#1976D2] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {mode === 'mes' ? 'Mês' : mode === 'semana' ? 'Semana' : 'Dia'}
              </button>
            ))}
          </div>
          <Link
            href="/novo-agendamento"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors"
          >
            <Plus className="w-4 h-4" /> Nova Consulta
          </Link>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={mesAnterior} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">{MESES[mes] ?? ''} {ano}</h2>
          <button onClick={mesSeguinte} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {DIAS_SEMANA.map((d: string) => (
            <div key={d} className="py-2 text-center text-xs font-medium text-gray-500 uppercase">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 border-t border-gray-100">
          {diasCalendario.map((dia: number | null, idx: number) => {
            if (dia === null) return <div key={`empty-${idx}`} className="min-h-[100px] border-b border-r border-gray-50 bg-gray-50/50" />
            const appts = getAgendamentosDia(dia)
            const isToday = dia === 12 && mes === 10 && ano === 2024
            const isWeekend = new Date(ano, mes, dia).getDay() === 0 || new Date(ano, mes, dia).getDay() === 6
            return (
              <div key={dia} className={`min-h-[100px] border-b border-r border-gray-50 p-1.5 ${isWeekend ? 'bg-gray-50/50' : ''}`}>
                <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full ${
                  isToday ? 'bg-[#1976D2] text-white' : 'text-gray-600'
                }`}>{dia}</span>
                <div className="mt-1 space-y-0.5">
                  {(appts ?? []).slice(0, 3).map((a: Agendamento) => (
                    <button
                      key={a?.id}
                      onClick={() => setSelectedAppt(a)}
                      className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] truncate font-medium ${
                        statusColors[a?.status ?? ''] ?? 'bg-gray-200'
                      } ${statusTextColors[a?.status ?? ''] ?? 'text-gray-800'} hover:opacity-80 transition-opacity`}
                    >
                      {a?.horario ?? ''} {a?.pacienteNome ?? ''}
                    </button>
                  ))}
                  {(appts?.length ?? 0) > 3 && (
                    <p className="text-[10px] text-gray-400 pl-1">+{(appts?.length ?? 0) - 3} mais</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 p-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#4CAF50]" /><span className="text-xs text-gray-600">Confirmado</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#FFC107]" /><span className="text-xs text-gray-600">Pendente</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#9E9E9E]" /><span className="text-xs text-gray-600">Cancelado</span></div>
        </div>
      </motion.div>

      {/* Appointment detail modal */}
      <AnimatePresence>
        {selectedAppt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAppt(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              style={{ boxShadow: 'var(--shadow-lg)' }}
              onClick={(e: React.MouseEvent) => e?.stopPropagation?.()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Detalhes do Agendamento</h3>
                <button onClick={() => setSelectedAppt(null)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Paciente:</span><span className="font-medium text-gray-800">{selectedAppt?.pacienteNome ?? ''}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Horário:</span><span className="font-medium text-gray-800">{selectedAppt?.horario ?? ''}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Data:</span><span className="font-medium text-gray-800">{selectedAppt?.data ?? ''}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Profissional:</span><span className="font-medium text-gray-800">{selectedAppt?.profissional ?? ''}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tipo:</span><span className="font-medium text-gray-800">{selectedAppt?.tipo ?? ''}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedAppt?.status ?? ''] ?? 'bg-gray-200'} ${statusTextColors[selectedAppt?.status ?? ''] ?? 'text-gray-800'}`}>
                    {statusLabels[selectedAppt?.status ?? ''] ?? ''}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-2 px-4 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors">Editar</button>
                <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Cancelar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
