'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, Users, Settings, Menu, X, Cross } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agenda', href: '/agenda', icon: CalendarDays },
  { label: 'Pacientes', href: '/pacientes', icon: Users },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() ?? ''

  const isActive = (href: string) => {
    if (href === '/agenda') return pathname === '/agenda' || pathname === '/novo-agendamento'
    if (href === '/pacientes') return pathname === '/pacientes' || pathname === '/novo-paciente'
    return pathname === href
  }

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${
      mobile ? 'w-[220px]' : expanded ? 'w-[220px]' : 'w-[64px]'
    } transition-all duration-300`}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-[#1976D2] flex items-center justify-center flex-shrink-0">
          <Cross className="w-5 h-5 text-white" />
        </div>
        {(expanded || mobile) && (
          <span className="font-semibold text-[#1976D2] text-sm whitespace-nowrap">PhysioPosses</span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {menuItems.map((item: typeof menuItems[number]) => {
          const Icon = item?.icon
          const active = isActive(item?.href ?? '')
          return (
            <Link
              key={item?.href ?? ''}
              href={item?.href ?? '/dashboard'}
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-fast ${
                active
                  ? 'bg-[#1976D2] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              {(expanded || mobile) && <span>{item?.label ?? ''}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse button (desktop only) */}
      {!mobile && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-3 mx-2 mb-4 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-md text-gray-600"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-0 h-full z-50 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-[-40px] p-2 rounded-lg bg-white shadow-md text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  )
}
