markdown

# Documentação do Front-End

## Como Executar a Aplicação

### Pré-requisitos
- Node.js
- pnpm

### Passos
1. **Instalação das Dependências**
No diretório do seu projeto, execute o seguinte comando para instalar as dependências:
```bash
pnpm install
```

Executar a Aplicação Utilize o comando abaixo para iniciar a aplicação em modo de desenvolvimento:

```bash
pnpm dev
```
# Documentação do Front-End

## Funcionalidades

- **Gerenciador de Tarefas**
  - Exibe uma lista de tarefas com título, descrição e status.
  - Permite adicionar novas tarefas através de um formulário modal.
  - Permite a atualização do status das tarefas (não iniciado, em andamento, concluído).
  - Oferece um modo escuro e claro através de um componente de troca de tema.

## Responsabilidades de Cada Tela

### Tela Principal (App)
- Carrega e exibe todas as tarefas obtidas a partir da API.
- Renderiza o cabeçalho com o título da aplicação e o componente de troca de tema.
- Exibe um modal para adicionar novas tarefas.
- Exibe a lista de tarefas utilizando o componente `Todo`.

### Componente `Todo`
- Exibe os detalhes de uma tarefa individual, incluindo título, descrição e status.
- Permite a alteração do status da tarefa através de um componente de seleção (`Badge`).

### Componente `TodoForm`
- Permite ao usuário inserir o título e a descrição da tarefa, bem como escolher o status inicial.
- Valida as entradas do usuário utilizando o esquema `todoSchema`.
- Envia os dados para a API ao submeter o formulário.

### Componente `Badge`
- Exibe o status atual da tarefa e permite que o usuário mude o status.
- Atualiza o status no estado local e na API ao ser modificado.

## Schema da Tarefa

O schema da tarefa é definido utilizando o Zod, como segue:

```javascript
import { z } from "zod";

export const todoStatus = z.enum(["NAO_INICIADO", "EM_ANDAMENTO", "CONCLUIDO"]);

export const todoSchema = z.object({
	id: z.string().uuid(),
	titulo: z.string().min(1),
	descricao: z.string().min(1),
	status: todoStatus,
});

export type Todo = z.infer<typeof todoSchema>;
