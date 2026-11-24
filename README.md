# Finance Web

Aplicação web de gestão financeira pessoal. Frontend em React que consome uma API Java/Spring Boot planejada em repositório separado.

## Status

Fase 0 concluída: base do projeto, design system, testes e CI.

Fase 1 concluída: cliente HTTP, autenticação por sessão, login, guarda de rotas e layout base.

Fase 2 concluída: navegação lateral, menu mobile, tema claro/escuro, marca e páginas "Em breve".

Próxima fase:

| Fase | Escopo                                |
| ---- | ------------------------------------- |
| F3   | Grupos de categorias e categorias     |
| F4   | Contas e cartões                      |
| F5   | Transações e transferências           |
| F6   | Despesas recorrentes e contas a pagar |
| F7   | Faturas de cartão                     |
| F8   | Dashboard e relatórios                |
| F9   | Hardening, E2E e build de produção    |

## Stack

- React 19 + TypeScript
- Vite
- React Router 7
- TanStack Query 5
- React Hook Form + Zod
- Tailwind CSS 4 + shadcn/ui
- Recharts
- Vitest + React Testing Library + MSW
- ESLint + Prettier

## Requisitos

- Node.js 24 ou superior
- npm 11 ou superior

## Instalação

```bash
npm install
cp .env.example .env
```

No Windows:

```powershell
Copy-Item .env.example .env
```

## Execução

```bash
npm run dev
```

Aplicação em `http://localhost:5173`.

Em desenvolvimento, requisições para `/api` são encaminhadas para `http://localhost:8080` pelo proxy do Vite.

## Scripts

| Comando                | Descrição                         |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento       |
| `npm run build`        | Typecheck e build de produção     |
| `npm run preview`      | Pré-visualização do build         |
| `npm run lint`         | ESLint                            |
| `npm run lint:fix`     | ESLint com correções              |
| `npm run typecheck`    | Verificação de tipos              |
| `npm test`             | Testes unitários e de componentes |
| `npm run test:watch`   | Testes em modo watch              |
| `npm run format`       | Prettier                          |
| `npm run format:check` | Verificação de formatação         |

## Estrutura

```text
src/
  app/            router, providers, navegação e layout
  components/     UI, layout, tabelas, formulários e gráficos
  features/       funcionalidades por domínio
  lib/            API, dinheiro, datas, queries e validação
  test/           configuração de testes
```

## Interface

- Marca: **Minhas Finanças**.
- Tema neutro minimalista, com verde para receitas e vermelho para despesas.
- Sidebar colapsável no desktop; a preferência fica em `localStorage`.
- Navegação inferior no mobile, com a opção "Mais" abrindo um menu completo.
- Tema segue o sistema na primeira visita e pode ser alternado manualmente.
- Áreas ainda não implementadas mostram uma página "Em breve".
- Textos em português pt-BR, sem camada de i18n.

## Contrato da API

O frontend consome a API REST em `/api/v1`.

Premissas:

- Autenticação por sessão em cookie `HttpOnly` com CSRF.
- Valores monetários em centavos.
- Datas em ISO 8601.
- Erros no formato RFC 9457 Problem Details.
- Tipos TypeScript serão gerados a partir do OpenAPI quando o contrato existir.

### Autenticação assumida

| Método | Caminho        | Corpo                 | Resposta                               |
| ------ | -------------- | --------------------- | -------------------------------------- |
| POST   | `/auth/login`  | `{ email, password }` | `200` + usuário; cria cookie de sessão |
| GET    | `/auth/me`     | —                     | `200` + usuário ou `401`               |
| POST   | `/auth/logout` | —                     | `204`                                  |

Formato do usuário:

```json
{
  "id": "uuid",
  "name": "Ana Silva",
  "email": "ana@example.com"
}
```

CSRF:

- Backend define cookie `XSRF-TOKEN`.
- Frontend envia header `X-XSRF-TOKEN` em métodos mutáveis.
- Cookie de sessão nunca é acessado pelo JavaScript.
- Backend deve definir `XSRF-TOKEN` antes do primeiro `POST`. O `GET /auth/me` do carregamento inicial deve definir o cookie; alternativa é um endpoint `GET /auth/csrf`.
- Cookie de sessão: `HttpOnly; Secure; SameSite=Lax; Path=/`.

### Segurança de credenciais

- Login sempre por HTTPS em produção.
- Credenciais apenas no corpo JSON de `POST /auth/login`.
- Nunca enviar senha na URL, em logs ou em armazenamento local.
- Backend valida usuário e senha e cria a sessão.
- Frontend não guarda senha, token de acesso ou refresh token.
- Em desenvolvimento, HTTP é aceitável apenas em `localhost`.

## Legado

O código anterior está preservado no commit inicial e na tag `legacy` do Git.
