import { z } from "zod";

export const todoStatus = z.enum(["NAO_INICIADO", "EM_ANDAMENTO", "CONCLUIDO"]);
export const todoSchema = z.object({
	id: z.string().uuid(),
	titulo: z.string().min(1),
	descricao: z.string().min(1),
	status: todoStatus,
});
export type Todo = z.infer<typeof todoSchema>;
