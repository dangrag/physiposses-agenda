'use client'

import { useState } from 'react'
import { agendamentosHoje } from '@/lib/data'
import { Activity, CheckCircle2, Clock, XCircle, AlertTriangle, Bell, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const DashboardChart = dynamic(() => import('./dashboard-chart'), { ssr: false, loading: () => <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">Carregando gráfico...</div> })

const statusColors: Record<string, string> = {
  confirmado: 'bg-[#4CAF50] text-white',
  pendente: 'bg-[#FFC107] text-gray-800',
  cancelado: 'bg-[#9E9E9E] text-white',
}

const statusLabels: Record<string, string> = {
  confirmado: 'Confirmado',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
}

const kpis = [
  { label: 'Atendimentos Hoje', value: 8, icon: Activity, color: '#1976D2', bg: '#E3F2FD' },
  { label: 'Confirmados', value: 5, icon: CheckCircle2, color: '#4CAF50', bg: '#E8F5E9' },
  { label: 'Pendentes', value: 2, icon: Clock, color: '#FFC107', bg: '#FFF8E1' },
  { label: 'Cancelados', value: 1, icon: XCircle, color: '#9E9E9E', bg: '#F5F5F5' },
]

export default function DashboardContent() {
  const [lembreteEnviado, setLembreteEnviado] = useState(false)

  const hoje = new Date()
  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  const diaSemana = diasSemana[hoje.getDay()] ?? ''
  const dataFormatada = `${hoje.getDate()} de ${meses[hoje.getMonth()] ?? ''} de ${hoje.getFullYear()}`
  const hora = hoje.getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const enviarLembretes = () => {
    setLembreteEnviado(true)
    toast?.success?.('Lembretes enviados com sucesso! ✓', { duration: 3000 })
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{saudacao}, Secretária</h1>
        <p className="text-sm text-gray-500 mt-0.5">{diaSemana}, {dataFormatada}</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi: typeof kpis[number], i: number) => {
          const Icon = kpi?.icon
          return (
            <motion.div
              key={kpi?.label ?? i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi?.bg ?? '#E3F2FD' }}>
                  {Icon && <Icon className="w-5 h-5" style={{ color: kpi?.color ?? '#1976D2' }} />}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{kpi?.value ?? 0}</p>
                  <p className="text-xs text-gray-500">{kpi?.label ?? ''}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 bg-white rounded-xl overflow-hidden"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1976D2]" /> Atendimentos do Dia
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <th className="py-3 px-4 text-left font-medium">Horário</th>
                  <th className="py-3 px-4 text-left font-medium">Paciente</th>
                  <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Profissional</th>
                  <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Tipo</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(agendamentosHoje ?? []).map((a: typeof agendamentosHoje[number], idx: number) => (
                  <tr key={a?.id ?? idx} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-gray-700">{a?.horario ?? ''}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{a?.pacienteNome ?? ''}</td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{a?.profissional ?? ''}</td>
                    <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">{a?.tipo ?? ''}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[a?.status ?? ''] ?? 'bg-gray-200 text-gray-700'}`}>
                        {statusLabels[a?.status ?? ''] ?? a?.status ?? ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-4"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#FF5722]" /> Alertas
            </h3>
            <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-lg p-3 text-sm text-[#E65100]">
              <p className="font-medium mb-1">⚠️ 2 pacientes ainda não confirmaram o atendimento de amanhã:</p>
              <ul className="list-disc list-inside text-xs space-y-0.5">
                <li>Carlos Souza (09:00)</li>
                <li>Pedro Lima (11:00)</li>
              </ul>
            </div>
            <button
              onClick={enviarLembretes}
              disabled={lembreteEnviado}
              className="w-full mt-3 py-2 bg-[#FF5722] text-white rounded-lg text-sm font-medium hover:bg-[#E64A19] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              {lembreteEnviado ? 'Lembretes Enviados ✓' : 'Enviar Lembretes'}
            </button>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-4"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#1976D2]" /> Atendimentos por Tipo
            </h3>
            <DashboardChart />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
