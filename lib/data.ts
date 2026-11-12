export interface Paciente {
  id: number
  nome: string
  cpf: string
  telefone: string
  email: string
  dataNascimento: string
  sexo: string
  whatsapp: string
  diagnostico: string
  medicoResponsavel: string
  convenio: string
  observacoes: string
  ultimoAtendimento: string
}

export interface Agendamento {
  id: number
  pacienteId: number
  pacienteNome: string
  profissional: string
  tipo: string
  data: string
  horario: string
  status: 'confirmado' | 'pendente' | 'cancelado'
  observacoes: string
}

export const pacientes: Paciente[] = [
  { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(27) 98765-4321', email: 'maria@email.com', dataNascimento: '1985-03-15', sexo: 'Feminino', whatsapp: '(27) 98765-4321', diagnostico: 'Lombalgia crônica', medicoResponsavel: 'Dr. Carlos Mendes', convenio: 'Unimed', observacoes: '', ultimoAtendimento: '12/11/2024' },
  { id: 2, nome: 'Carlos Souza', cpf: '234.567.890-11', telefone: '(27) 99876-5432', email: 'carlos@email.com', dataNascimento: '1990-07-22', sexo: 'Masculino', whatsapp: '(27) 99876-5432', diagnostico: 'Cervicalgia', medicoResponsavel: 'Dr. André Lima', convenio: 'Particular', observacoes: '', ultimoAtendimento: '05/11/2024' },
  { id: 3, nome: 'Ana Oliveira', cpf: '345.678.901-22', telefone: '(27) 97654-3210', email: 'ana@email.com', dataNascimento: '1978-11-30', sexo: 'Feminino', whatsapp: '(27) 97654-3210', diagnostico: 'Escoliose', medicoResponsavel: 'Dra. Fernanda Costa', convenio: 'Bradesco Saúde', observacoes: '', ultimoAtendimento: '10/11/2024' },
  { id: 4, nome: 'Pedro Lima', cpf: '456.789.012-33', telefone: '(27) 96543-2109', email: 'pedro@email.com', dataNascimento: '1995-01-10', sexo: 'Masculino', whatsapp: '(27) 96543-2109', diagnostico: 'Lesão no joelho', medicoResponsavel: 'Dr. Carlos Mendes', convenio: 'Particular', observacoes: 'Pós-cirúrgico', ultimoAtendimento: '08/11/2024' },
  { id: 5, nome: 'Lucia Martins', cpf: '567.890.123-44', telefone: '(27) 95432-1098', email: 'lucia@email.com', dataNascimento: '1982-06-18', sexo: 'Feminino', whatsapp: '(27) 95432-1098', diagnostico: 'Fibromialgia', medicoResponsavel: 'Dra. Fernanda Costa', convenio: 'Unimed', observacoes: '', ultimoAtendimento: '01/11/2024' },
  { id: 6, nome: 'Roberto Alves', cpf: '678.901.234-55', telefone: '(27) 94321-0987', email: 'roberto@email.com', dataNascimento: '1970-09-05', sexo: 'Masculino', whatsapp: '(27) 94321-0987', diagnostico: 'Tendinite no ombro', medicoResponsavel: 'Dr. André Lima', convenio: 'Particular', observacoes: '', ultimoAtendimento: '15/10/2024' },
  { id: 7, nome: 'Fernanda Costa', cpf: '789.012.345-66', telefone: '(27) 93210-9876', email: 'fernanda@email.com', dataNascimento: '1988-12-01', sexo: 'Feminino', whatsapp: '(27) 93210-9876', diagnostico: 'Dor no quadril', medicoResponsavel: 'Dr. Carlos Mendes', convenio: 'Bradesco Saúde', observacoes: '', ultimoAtendimento: '22/10/2024' },
  { id: 8, nome: 'Marcos Teixeira', cpf: '890.123.456-77', telefone: '(27) 92109-8765', email: 'marcos@email.com', dataNascimento: '1993-04-25', sexo: 'Masculino', whatsapp: '(27) 92109-8765', diagnostico: 'Hérnia de disco', medicoResponsavel: 'Dra. Fernanda Costa', convenio: 'Outros', observacoes: 'Tratamento intensivo', ultimoAtendimento: '30/10/2024' },
]

export const agendamentosHoje: Agendamento[] = [
  { id: 1, pacienteId: 1, pacienteNome: 'Maria Silva', profissional: 'Dr. João Ferreira', tipo: 'Fisioterapia Geral', data: '2024-11-12', horario: '08:00', status: 'confirmado', observacoes: '' },
  { id: 2, pacienteId: 2, pacienteNome: 'Carlos Souza', profissional: 'Dr. João Ferreira', tipo: 'RPG', data: '2024-11-12', horario: '09:00', status: 'pendente', observacoes: '' },
  { id: 3, pacienteId: 3, pacienteNome: 'Ana Oliveira', profissional: 'Dr. João Ferreira', tipo: 'Pilates Terapêutico', data: '2024-11-12', horario: '10:00', status: 'confirmado', observacoes: '' },
  { id: 4, pacienteId: 4, pacienteNome: 'Pedro Lima', profissional: 'Dra. Paula Mendes', tipo: 'Reabilitação', data: '2024-11-12', horario: '11:00', status: 'pendente', observacoes: '' },
  { id: 5, pacienteId: 5, pacienteNome: 'Lucia Martins', profissional: 'Dra. Paula Mendes', tipo: 'Fisioterapia Geral', data: '2024-11-12', horario: '14:00', status: 'confirmado', observacoes: '' },
  { id: 6, pacienteId: 6, pacienteNome: 'Roberto Alves', profissional: 'Dr. João Ferreira', tipo: 'Fisioterapia Geral', data: '2024-11-12', horario: '15:00', status: 'confirmado', observacoes: '' },
  { id: 7, pacienteId: 7, pacienteNome: 'Fernanda Costa', profissional: 'Dra. Paula Mendes', tipo: 'RPG', data: '2024-11-12', horario: '16:00', status: 'confirmado', observacoes: '' },
  { id: 8, pacienteId: 8, pacienteNome: 'Marcos Teixeira', profissional: 'Dr. João Ferreira', tipo: 'Reabilitação', data: '2024-11-12', horario: '17:00', status: 'cancelado', observacoes: '' },
]

export const profissionais = ['Dr. João Ferreira', 'Dra. Paula Mendes']

export const tiposAtendimento = ['Fisioterapia Geral', 'RPG', 'Pilates Terapêutico', 'Reabilitação']

export const horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

export const convenios = ['Particular', 'Unimed', 'Bradesco Saúde', 'Outros']

// Generate calendar appointments for the current month
export function gerarAgendamentosMes(): Agendamento[] {
  const all: Agendamento[] = []
  let id = 100
  // Seed some appointments across weekdays
  const nomes = pacientes.map((p: Paciente) => ({ id: p.id, nome: p.nome }))
  const tipos = tiposAtendimento
  const profs = profissionais
  const statuses: Array<'confirmado' | 'pendente' | 'cancelado'> = ['confirmado', 'confirmado', 'confirmado', 'pendente', 'cancelado']

  // Use November 2024 as reference
  for (let day = 1; day <= 30; day++) {
    const date = new Date(2024, 10, day) // Nov 2024
    const dow = date.getDay()
    if (dow === 0 || dow === 6) continue // skip weekends
    const numAppts = 2 + (day % 3) // 2-4 appointments per day
    for (let j = 0; j < numAppts && j < horarios.length; j++) {
      const pIdx = (day + j) % nomes.length
      all.push({
        id: id++,
        pacienteId: nomes[pIdx]?.id ?? 1,
        pacienteNome: nomes[pIdx]?.nome ?? 'Paciente',
        profissional: profs[j % profs.length] ?? 'Dr. João Ferreira',
        tipo: tipos[j % tipos.length] ?? 'Fisioterapia Geral',
        data: `2024-11-${String(day).padStart(2, '0')}`,
        horario: horarios[j] ?? '08:00',
        status: statuses[(day + j) % statuses.length] ?? 'confirmado',
        observacoes: '',
      })
    }
  }
  return all
}
