import { useState, useEffect } from "react";
import type { Todo as TodoType } from "../types/todo";
import { Badge } from "./Badge";

export const Todo: React.FC<TodoType> = ({ id, titulo, descricao, status }) => {
	const [currentStatus, setCurrentStatus] = useState(status); // Estado local para o status

	useEffect(() => {
		setCurrentStatus(status); // Atualiza o estado local quando o status inicial é recebido
	}, [status]);

	return (
		<div
			className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
			key={id}
		>
			<div className="overflow-y-auto p-4 md:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
				<h3 className="text-lg font-bold text-gray-800 dark:text-white">
					{titulo}
				</h3>
				<p className="mt-2 text-gray-500 dark:text-neutral-400">{descricao}</p>
				<Badge
					onStatusChange={async (novo_status: typeof currentStatus) => {
						try {
							const response = await fetch(`http://localhost:8080/tarefas/${id}`, {
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({ status: novo_status }),
							});
							
							if (!response.ok) {
								throw new Error('Failed to update status');
							}
							setCurrentStatus(novo_status); // Atualiza o estado local após sucesso
						} catch (error) {
							console.error("Failed to update task status:", error);
						}
					}}
					status={currentStatus} // Use o estado local em vez de status
					className="mt-2"
				/>
			</div>
		</div>
	);
};
