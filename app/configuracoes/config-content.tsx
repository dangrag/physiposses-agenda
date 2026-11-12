'use client'

import { Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ConfigContent() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#1976D2]" /> Configurações
        </h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie as configurações do sistema</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 max-w-2xl"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Clínica</h3>
            <p className="text-sm text-gray-500">PhysioPosses - Clínica de Fisioterapia</p>
            <p className="text-sm text-gray-400">Cariacica, ES</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Notificações</h3>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
              <span className="text-sm text-gray-700">Enviar lembretes por e-mail</span>
            </label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#1976D2] focus:ring-[#1976D2]" />
              <span className="text-sm text-gray-700">Enviar lembretes por WhatsApp</span>
            </label>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Versão</h3>
            <p className="text-sm text-gray-400">PhysioPosses Agenda v1.0 – Protótipo</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
