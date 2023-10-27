import { useEffect, useState } from "react";

const TaskCard = ({ task }) => {
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (task.status === "Planned") {
			setStatus("text-red-500");
		} else if (task.status === "In Progress") {
			setStatus("text-yellow-500");
		} else {
			setStatus("text-green-500");
		}
	}, [task]);

	return (
		<div
			key={task.id}
			className="p-3 bg-white rounded-md drop-shadow-xl"
		>
			<h2 className="font-semibold">{task.title}</h2>
			<span className={`my-2 ${status}`}>{task.status}</span>
			<p>{task.dueDate}</p>
			<p>{task.assignee.name}</p>
			{task.todos.length > 0 && (
				<div className="my-2">
					<p>Todos:</p>
					{task.todos.map(todo => {
						return (
							<div
								key={todo.id}
								className="space-y-1"
							>
								<div className="p-2 rounded-sm bg-white drop-shadow-md">{todo.description}</div>
								<p>{todo.completed}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default TaskCard;
