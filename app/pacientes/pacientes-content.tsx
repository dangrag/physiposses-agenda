'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pacientes, type Paciente } from '@/lib/data'
import { Users, Plus, Search, Eye, Edit } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PacientesContent() {
  const [busca, setBusca] = useState('')

  const filtered = (pacientes ?? []).filter((p: Paciente) =>
    (p?.nome ?? '').toLowerCase().includes((busca ?? '').toLowerCase()) ||
    (p?.cpf ?? '').includes(busca ?? '')
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-[#1976D2]" /> Pacientes
        </h1>
        <Link
          href="/novo-paciente"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1976D2] text-white rounded-lg text-sm font-medium hover:bg-[#1565C0] transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Novo Paciente
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={busca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusca(e?.target?.value ?? '')}
            placeholder="Buscar por nome ou CPF..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-transparent bg-white text-gray-800 placeholder:text-gray-400"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="py-3 px-4 text-left font-medium">#</th>
                <th className="py-3 px-4 text-left font-medium">Nome</th>
                <th className="py-3 px-4 text-left font-medium hidden md:table-cell">CPF</th>
                <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Telefone</th>
                <th className="py-3 px-4 text-left font-medium hidden xl:table-cell">E-mail</th>
                <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Último Atend.</th>
                <th className="py-3 px-4 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {(filtered ?? []).map((p: Paciente, idx: number) => (
                <tr key={p?.id ?? idx} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-gray-400 font-mono">{p?.id ?? idx + 1}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{p?.nome ?? ''}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono hidden md:table-cell">{p?.cpf ?? ''}</td>
                  <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">{p?.telefone ?? ''}</td>
                  <td className="py-3 px-4 text-gray-600 hidden xl:table-cell"><span suppressHydrationWarning>{p?.email ?? ''}</span></td>
                  <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{p?.ultimoAtendimento ?? ''}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#E3F2FD] text-[#1976D2] transition-colors" title="Ver">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(filtered?.length ?? 0) === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">Nenhum paciente encontrado.</div>
        )}
      </motion.div>
    </div>
  )
}
