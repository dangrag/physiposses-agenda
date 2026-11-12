'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { convenios } from '@/lib/data'
import { Users, ChevronRight, Mail, User, Phone, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function NovoPacienteContent() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '', cpf: '', dataNascimento: '', sexo: '',
    telefone: '', whatsapp: '', email: '',
    diagnostico: '', medicoResponsavel: '', convenio: '', observacoes: '',
  })

  const update = (field: string, value: string) => {
    setForm((prev: typeof form) => ({ ...(prev ?? {}), [field]: value }))
  }

  const handleSave = () => {
    toast?.success?.('Paciente cadastrado com sucesso! ✓', { duration: 3000 })
    setTimeout(() => {
      router?.push?.('/pacientes')
    }, 600)
  }

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent text-gray-800 placeholder:text-gray-400"
  const selectClass = `${inputClass} bg-white appearance-none`
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <Link href="/pacientes" className="hover:text-[#1976D2] transition-colors">Pacientes</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">Novo Paciente</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-[#1976D2]" /> Novo Paciente
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 max-w-2xl"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Seção: Dados Pessoais */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1976D2] uppercase tracking-wide mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> Dados Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nome Completo *</label>
              <input type="text" value={form?.nome ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('nome', e?.target?.value ?? '')} placeholder="Nome completo do paciente" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>CPF *</label>
              <input type="text" value={form?.cpf ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('cpf', e?.target?.value ?? '')} placeholder="000.000.000-00" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Data de Nascimento *</label>
              <input type="date" value={form?.dataNascimento ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('dataNascimento', e?.target?.value ?? '')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sexo</label>
              <select value={form?.sexo ?? ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('sexo', e?.target?.value ?? '')} className={selectClass}>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seção: Contato */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1976D2] uppercase tracking-wide mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4" /> Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Telefone *</label>
              <input type="tel" value={form?.telefone ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('telefone', e?.target?.value ?? '')} placeholder="(27) 99999-9999" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp</label>
              <input type="tel" value={form?.whatsapp ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('whatsapp', e?.target?.value ?? '')} placeholder="(27) 99999-9999" className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>E-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={form?.email ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('email', e?.target?.value ?? '')} placeholder="email@exemplo.com" className={`${inputClass} pl-10`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Usado para lembretes automáticos</p>
            </div>
          </div>
        </div>

        {/* Seção: Dados Clínicos */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1976D2] uppercase tracking-wide mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Dados Clínicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Diagnóstico</label>
              <input type="text" value={form?.diagnostico ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('diagnostico', e?.target?.value ?? '')} placeholder="Diagnóstico principal" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Médico Responsável</label>
              <input type="text" value={form?.medicoResponsavel ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('medicoResponsavel', e?.target?.value ?? '')} placeholder="Nome do médico" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Convênio</label>
              <select value={form?.convenio ?? ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('convenio', e?.target?.value ?? '')} className={selectClass}>
                <option value="">Selecione</option>
                {(convenios ?? []).map((c: string) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Observações</label>
              <textarea value={form?.observacoes ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update('observacoes', e?.target?.value ?? '')} rows={3} placeholder="Observações clínicas..." className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href="/pacientes" className="flex-1 py-2.5 text-center bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Cancelar
          </Link>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors">
            Salvar Paciente
          </button>
        </div>
      </motion.div>
    </div>
  )
}
