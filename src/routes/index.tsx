import { TodoForm } from "../components/TodoForm";
import { Todo } from "../components/Todo";
import { todoSchema, type Todo as TodoType } from "../types/todo";
import Modal from "../components/Modal";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { useEffect, useState } from "react";

export function App() {
	const [tasks, setTasks] = useState<TodoType[]>();

	const fetchTasks = async () => {
		try {
			const response = await fetch("http://localhost:8080/tarefas");
			if (!response.ok) {
				throw new Error("Error fetching tasks");
			}
			const data = await response.json();
			const parsedData = data.map((task: TodoType) => todoSchema.parse(task));
			setTasks(parsedData);
		} catch (error) {
			console.error("Failed to fetch tasks:", error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="min-w-full min-h-full bg-neutral-50 dark:bg-neutral-950">
			<header className="flex items-center gap-4 justify-center bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 border-b border-neutral-100 shadow-sm shadow-neutral-200 dark:shadow-neutral-900 dark:border-neutral-900 text-2xl h-16">
				Gerenciador de tarefas
				<ThemeSwitch />
			</header>
			<main className="flex justify-center min-h-screen">
				<div className="max-w-2xl w-full mt-8">
					<Modal
						title="Adicionar tarefa"
						content={<TodoForm />}
					/>
					<div className="flex flex-col gap-2 mt-2">
						{tasks?.map((task) => {
							return <Todo {...task} key={task.id} />;
						})}
					</div>
				</div>
			</main>
		</div>
	);
}
