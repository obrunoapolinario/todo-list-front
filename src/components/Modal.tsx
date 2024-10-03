import type React from "react";
import { useState } from "react";

interface ModalProps {
	title: string;
	content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);

	return (
		<>
			<button
				type="button"
				className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
				onClick={openModal}
			>
				Criar nova tarefa
			</button>

			{isOpen && (
				<div
					className="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto"
					aria-modal="true"
				>
					<div className="flex items-center justify-center min-h-screen p-4">
						<div
							className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
							aria-hidden="true"
							onClick={() => setIsOpen(false)}
						/>

						<div className="relative bg-white dark:bg-neutral-800 rounded-xl max-w-lg w-full">
							<div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
								<h3 className="font-bold text-gray-800 dark:text-white">
									{title}
								</h3>
								<button
									type="button"
									className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
									onClick={() => setIsOpen(false)}
								>
									<span className="sr-only">Close</span>
									<svg
										className="shrink-0 size-4"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<title>X</title>
										<path d="M18 6 6 18" />
										<path d="m6 6 12 12" />
									</svg>
								</button>
							</div>
							<div className="p-4 overflow-y-auto">{content}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
