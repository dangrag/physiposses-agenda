'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { pacientes, profissionais, tiposAtendimento, horarios, type Paciente } from '@/lib/data'
import { CalendarDays, ChevronRight, Search, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NovoAgendamentoContent() {
  const router = useRouter()
  const [pacienteQuery, setPacienteQuery] = useState('')
  const [pacienteSelecionado, setPacienteSelecionado] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [data, setData] = useState('')
  const [horarioSel, setHorarioSel] = useState('')
  const [profissionalSel, setProfissionalSel] = useState('')
  const [tipoSel, setTipoSel] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [lembrete, setLembrete] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const filteredPacientes = (pacientes ?? []).filter((p: Paciente) =>
    (p?.nome ?? '').toLowerCase().includes((pacienteQuery ?? '').toLowerCase())
  )

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionsRef?.current && !suggestionsRef.current.contains(e?.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSave = () => {
    setShowModal(true)
  }

  const selectClass = "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent bg-white text-gray-800 appearance-none"

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <Link href="/agenda" className="hover:text-[#1976D2] transition-colors">Agenda</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">Novo Agendamento</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-[#1976D2]" /> Novo Agendamento
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 max-w-2xl"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="space-y-5">
          {/* Paciente with search */}
          <div className="relative" ref={suggestionsRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Paciente</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={pacienteQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPacienteQuery(e?.target?.value ?? '')
                  setPacienteSelecionado('')
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Buscar paciente..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent text-gray-800 placeholder:text-gray-400"
              />
            </div>
            {showSuggestions && (pacienteQuery?.length ?? 0) > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 max-h-48 overflow-y-auto" style={{ boxShadow: 'var(--shadow-md)' }}>
                {(filteredPacientes ?? []).length === 0 ? (
                  <p className="p-3 text-sm text-gray-400">Nenhum paciente encontrado</p>
                ) : (
                  (filteredPacientes ?? []).map((p: Paciente) => (
                    <button
                      key={p?.id}
                      onClick={() => {
                        setPacienteQuery(p?.nome ?? '')
                        setPacienteSelecionado(p?.nome ?? '')
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                    >
                      {pacienteSelecionado === (p?.nome ?? '') && <Check className="w-3 h-3 text-[#4CAF50]" />}
                      {p?.nome ?? ''}
                      <span className="text-gray-400 text-xs ml-auto">{p?.cpf ?? ''}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData(e?.target?.value ?? '')}
              className={selectClass}
            />
          </div>

          {/* Horário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Horário</label>
            <select value={horarioSel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHorarioSel(e?.target?.value ?? '')} className={selectClass}>
              <option value="">Selecione o horário</option>
              {(horarios ?? []).map((h: string) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          {/* Profissional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profissional</label>
            <select value={profissionalSel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProfissionalSel(e?.target?.value ?? '')} className={selectClass}>
              <option value="">Selecione o profissional</option>
              {(profissionais ?? []).map((p: string) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Tipo de Atendimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de Atendimento</label>
            <select value={tipoSel} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTipoSel(e?.target?.value ?? '')} className={selectClass}>
              <option value="">Selecione o tipo</option>
              {(tiposAtendimento ?? []).map((t: string) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setObservacoes(e?.target?.value ?? '')}
              rows={3}
              placeholder="Observações adicionais..."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent resize-none text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* Lembrete */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={lembrete}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLembrete(e?.target?.checked ?? false)}
              className="w-4 h-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]"
            />
            <span className="text-sm text-gray-700">✓ Enviar lembrete automático por e-mail 24h antes</span>
          </label>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Link href="/agenda" className="flex-1 py-2.5 text-center bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Cancelar
            </Link>
            <button onClick={handleSave} className="flex-1 py-2.5 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors">
              Salvar Agendamento
            </button>
          </div>
        </div>
      </motion.div>

      {/* Success modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-sm text-center"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Agendamento registrado com sucesso!</h3>
              <p className="text-sm text-gray-500 mb-6">O lembrete será enviado automaticamente.</p>
              <button
                onClick={() => { setShowModal(false); router?.push?.('/agenda') }}
                className="w-full py-2.5 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
