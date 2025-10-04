# 🐾 Vetech - Sistema de Atestados Veterinários

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)  
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)  

O **Vetech** é um SaaS desenvolvido para **automatizar e simplificar a emissão de atestados de saúde de animais**.  
Atualmente, veterinários precisam gerar cada atestado manualmente em sistemas governamentais, o que é lento e repetitivo.  

Com o Vetech, é possível **criar atestados em massa**, vinculados a produtores e seus animais, em um fluxo **rápido, seguro e intuitivo**.

---

## 🚀 Funcionalidades

- ✅ Cadastro de **produtores rurais** e seus animais  
- ✅ Seleção de produtores e animais para **geração de atestados em lote**  
- ✅ Emissão de atestados com **dados preenchidos automaticamente**  
- 📊 Painel de controle com **histórico completo de atestados**  
- 🔗 Integração futura com sistemas oficiais para envio automático  

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React / Next.js / TypeScript  
- **Backend:** Node.js (Express)  
- **Banco de Dados:** PostgreSQL (via Prisma ORM)  
- **Autenticação:** JWT / OAuth (planejado)  
- **Infraestrutura:** SaaS em cloud  

---

## 📦 Instalação (Ambiente Dev)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/vetech.git

# Acesse a pasta
cd vetech

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Rode a aplicação
npm run dev
