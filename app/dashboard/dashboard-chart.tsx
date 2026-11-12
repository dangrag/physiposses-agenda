'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { name: 'Fisioterapia', value: 3 },
  { name: 'RPG', value: 2 },
  { name: 'Pilates', value: 1 },
  { name: 'Reabilitação', value: 2 },
]

const colors = ['#1976D2', '#4CAF50', '#FFC107', '#FF5722']

export default function DashboardChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fontSize: 11 }}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Atendimentos">
            {data.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length] ?? '#1976D2'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
