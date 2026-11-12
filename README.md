# PhysioPosses Agenda

Protótipo navegável de um sistema web de agendamento e gestão de pacientes para a **PhysioPosses**, uma clínica de fisioterapia de pequeno porte localizada em Cariacica/ES.

Este projeto foi desenvolvido como parte da **Atividade Prática Profissional** do curso de **Análise e Desenvolvimento de Sistemas (ADS)** do Centro Universitário Multivix.

## 📋 Sobre o projeto

O sistema foi proposto para resolver os principais gargalos operacionais da clínica, identificados no sistema utilizado atualmente:

- **Agendamentos instáveis** — registros que somem ou se alteram sozinhos;
- **Comunicação manual** — lembretes de consulta enviados um a um pelo WhatsApp;
- **Cadastro fragmentado** — dados do paciente espalhados em várias abas.

## ✨ Funcionalidades (telas navegáveis)

- **Login** — tela de acesso ao sistema
- **Painel (Dashboard)** — indicadores do dia, lista de atendimentos e alertas de confirmação
- **Agenda** — calendário mensal com agendamentos coloridos por status
- **Novo Agendamento** — formulário com busca de paciente e lembrete automático
- **Pacientes** — listagem de pacientes cadastrados
- **Novo Paciente** — cadastro unificado em uma única tela
- **Configurações** — ajustes do sistema

> ⚠️ Este é um **protótipo de demonstração**: todos os dados são fictícios (`lib/data.ts`). Não há banco de dados, autenticação real ou envio real de mensagens.

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [Recharts](https://recharts.org/) (gráficos)

## 🚀 Como executar localmente

Pré-requisitos: Node.js 18+ e [Yarn](https://yarnpkg.com/).

```bash
# 1. Instalar as dependências
yarn install

# 2. Rodar em modo de desenvolvimento
yarn dev

# 3. Abrir no navegador
# http://localhost:3000
```

## 📦 Build de produção

```bash
yarn build
yarn start
```

## 👤 Autor

Danilo — Curso de Análise e Desenvolvimento de Sistemas (ADS) — Centro Universitário Multivix.

---

_Projeto acadêmico, sem fins comerciais. Todos os dados de pacientes são fictícios._
