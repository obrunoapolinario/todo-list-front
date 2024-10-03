import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { todoSchema, todoStatus } from "../types/todo";
import { Input } from "./Input";
import { Label } from "./Label";
import { capitalize } from "../lib/utils";

export const TodoForm: React.FC = () => {
	const form = useForm({
		defaultValues: {
			titulo: "",
			descricao: "",
			status: "NAO_INICIADO",
		},
		validatorAdapter: zodValidator(),
		validators: {
			onChange: todoSchema.omit({ id: true }),
		},
		onSubmit: async (values) => {
			fetch("http://localhost:8080/tarefas", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values.value),
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="titulo"
				children={(field) => (
					<div>
						<Label htmlFor={field.name}>Titulo da tarefa</Label>
						<Input
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Titulo da tarefa"
							type="text"
						/>
					</div>
				)}
			/>
			<form.Field
				name="descricao"
				children={(field) => (
					<div>
						<Label
							htmlFor={field.name}
						>
							Descrição da tarefa
						</Label>
						<Input
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Descrição da tarefa"
							type="text"
						/>
					</div>
				)}
			/>
			<form.Field
				name="status"
				children={(field) => (
					<div>
						<Label htmlFor={field.name}>Status da tarefa</Label>
						<select className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
							<option defaultChecked disabled>
								Selecione um status
							</option>
							{todoStatus.options.map((status) => (
								<option key={status} value={status}>
									{capitalize(status)}
								</option>
							))}
						</select>
					</div>
				)}
			/>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				children={([canSubmit, isSubmitting]) => (
					<button
						type="submit"
						disabled={!canSubmit}
						className="py-3 px-4 mt-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
					>
						{isSubmitting ? "..." : "Submit"}
					</button>
				)}
			/>
		</form>
	);
};
