import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { addProject, deleteProject, updateProject } from "../api/projectsAPI";

const TaskView = ({ task, setEdit }) => {
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
			className="p-3 bg-white rounded-md drop-shadow-xl h-full"
		>
			<div className="flex justify-between">
				<h2 className="font-semibold">{task.title}</h2>
				<button
					onClick={() => setEdit(true)}
					className="bg-zinc-200 rounded-sm p-2 hover:bg-zinc-300 active:bg-zinc-400"
				>
					<Icon icon="material-symbols:edit-outline" />
				</button>
			</div>
			<p>
				Status: <span className={`my-2 ${status}`}>{task.status}</span>
			</p>
			<p>Due date: {task.dueDate}</p>
			<p>Assignee: {task.assignee.name}</p>
			{task.todos.length > 0 && (
				<div className="my-2">
					<p>Todos:</p>
					<div className="space-y-1">
						{task.todos.map(todo => {
							return (
								<p
									key={todo.id}
									className="p-2 rounded-sm bg-white drop-shadow-md cursor-pointer ease-in-out duration-75 hover:scale-[1.01]"
									style={todo.completed ? { background: "lightgreen", textDecoration: "line-through" } : {}}
								>
									{todo.description}
								</p>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

const TaskForm = ({ task, setEdit }) => {
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

	const handleChange = e => {
		const value = e.target.value;
	};

	const handleSubmit = e => {
		// post form to api
		e.preventDefault();
	};

	return (
		<form
			key={task.id}
			className="p-3 bg-white rounded-md drop-shadow-xl h-full"
		>
			<div className="flex justify-between">
				<input
					type="text"
					defaultValue={task.title}
					onChange={handleChange}
					className="font-semibold border border-zinc-500 rounded-sm px-2 w-[75%]"
				/>

				<button
					onClick={() => setEdit(false)}
					className="px-2 text-red-500"
				>
					<Icon
						icon="ph:x-bold"
						width={20}
					/>
				</button>
			</div>
			<p>
				Status:
				<input
					type=""
					defaultValue={task.status}
					className={`my-2 ${status} border mx-2 px-1 rounded-sm border-zinc-500`}
				/>
			</p>
			<div className="space-y-1">
				<p>
					Due date:
					<input
						type="date"
						defaultValue={task.dueDate}
						className="border mx-2 px-1 rounded-sm border-zinc-500"
					/>
				</p>
				<p>
					Assignee:
					<input
						type="text"
						defaultValue={task.assignee.name}
						onChange={handleChange}
						className="border mx-2 px-1 rounded-sm border-zinc-500"
					/>
				</p>
			</div>
			<div className="my-2">
				<div className="flex space-x-3 mt-4 mb-2">
					<p>Todos:</p>
					<button className="bg-zinc-200 px-2 rounded-sm hover:bg-zinc-300 active:bg-zinc-400">Add Todo</button>
				</div>

				<div className="space-y-1">
					{task.todos.map(todo => {
						return (
							<div
								key={todo.id}
								className="flex items-center justify-between container border px-2 py-1 rounded-sm border-zinc-500"
							>
								<input
									defaultValue={todo.description}
									onChange={handleChange}
									className="container"
								/>
								<button className="text-red-500 ml-2 text-xs h-full">
									<Icon
										icon="material-symbols:delete-outline"
										width={18}
									/>
								</button>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-end space-x-2 mt-4">
				<button
					onClick={() => setEdit(false)}
					className="bg-red-500 py-1 px-4 text-white hover:bg-red-600 active:bg-red-700"
				>
					Discard Edits
				</button>
				<input
					type="submit"
					value="Submit"
					onSubmit={handleSubmit}
					className="bg-green-400 py-1 px-4 hover:bg-green-500 active:bg-green-600"
				/>
			</div>
		</form>
	);
};

const TaskCard = ({ task, pageEdit }) => {
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		if (pageEdit) {
			setEdit(true);
		} else {
			setEdit(false);
		}
	}, [pageEdit]);

	return !edit ? (
		<TaskView
			task={task}
			setEdit={setEdit}
		/>
	) : (
		<TaskForm
			task={task}
			setEdit={setEdit}
		/>
	);
};

export default TaskCard;
