import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { updateProject } from "../api/projectsAPI";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import StatusSelect from "./StatusSelect";
import AssigneeSelect from "./AssigneeSelect";

const TaskView = ({ task, setData, setEdit }) => {
	const [status, setStatus] = useState("");

	const completeTodo = id => {
		const editTodo = [];
		task.todos.forEach(todo => {
			if (todo.id === id) {
				editTodo.push({ ...todo, completed: !todo.completed });
			} else {
				editTodo.push(todo);
			}
		});
		setData({ ...task, todos: editTodo });
	};

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
									onClick={() => completeTodo(todo.id)}
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

const TaskForm = ({ task, setData, setEdit, pageEdit, teamMembers, deleteTask }) => {
	const addTodoBtn = () => {
		setData({ ...task, todos: [...task.todos, { id: uuidv4(), description: "", completed: false }] });
	};

	const deleteTodo = i => {
		const newTodos = task.todos.filter(todo => todo.id !== i);
		setData({ ...task, todos: newTodos });
	};

	return (
		<div
			key={task.id}
			className="p-3 bg-white rounded-md drop-shadow-xl h-full flex flex-col justify-between"
		>
			<div>
				{/* Description & Edit button */}
				<div className="flex justify-between">
					{task.title ? (
						<input
							type="text"
							id="description"
							defaultValue={task.title}
							onChange={e => setData({ ...task, title: e.target.value })}
							className="font-semibold border border-zinc-500 rounded-sm px-2 w-[75%]"
						/>
					) : (
						<input
							type="text"
							id="description"
							placeholder="Enter title"
							onChange={e => setData({ ...task, title: e.target.value })}
							className="font-semibold border border-zinc-500 rounded-sm px-2 w-[75%]"
						/>
					)}
					<button
						onClick={() => deleteTask(task.id)}
						className="px-2 text-red-500"
					>
						<Icon
							icon="material-symbols:delete-outline"
							width={22}
						/>
					</button>
				</div>

				{/* Status */}
				<div className="flex my-2 mb-2">
					Status:
					<StatusSelect
						status={task.status}
						setData={setData}
						task={task}
					/>
				</div>

				{/* Due & Assignee */}
				<div className="space-y-1">
					<p>
						Due date:
						{task.dueDate ? (
							<input
								type="date"
								defaultValue={task.dueDate}
								className="border mx-2 px-1 rounded-sm border-zinc-500"
							/>
						) : (
							<input
								type="date"
								className="border mx-2 px-1 rounded-sm border-zinc-500"
							/>
						)}
					</p>
					<div className="flex">
						Assignee:
						<AssigneeSelect
							teamMembers={teamMembers}
							setData={setData}
							task={task}
						/>
					</div>
				</div>

				{/* Todos */}
				<div className="my-2">
					<div className="flex space-x-3 mt-4 mb-2">
						<p>Todos:</p>
						<button
							type="button"
							onClick={() => addTodoBtn()}
							className="bg-zinc-200 px-2 rounded-sm text-sm hover:bg-zinc-300 active:bg-zinc-400"
						>
							Add Todo
						</button>
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
										placeholder="Enter todo"
										onChange={e => setData({ ...task, todos: [{ id: todo.id, description: e.target.value, completed: false }] })}
										className="container"
									/>
									<button
										type="button"
										onClick={() => deleteTodo(todo.id)}
										className="text-red-500 ml-2 text-xs h-full"
									>
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
			</div>

			{!pageEdit && (
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
						className="bg-green-400 py-1 px-4 hover:bg-green-500 active:bg-green-600"
					/>
				</div>
			)}
		</div>
	);
};

const TaskCard = ({ project, task, pageEdit, teamMembers, deleteTask }) => {
	const [edit, setEdit] = useState(false);
	const [data, setData] = useState({ id: task.id, assignee: { id: task.assignee.id, name: task.assignee.name }, dueDate: task.dueDate, status: task.status, title: task.title, todos: task.todos });

	const queryClient = useQueryClient();

	const updateProjectMutation = useMutation({
		mutationFn: updateProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});

	const handleSubmit = e => {
		e.preventDefault();
		let tasksArray = [];
		project.tasks.forEach(task => {
			if (task.id !== data.id) {
				tasksArray.push(task);
			}
		});
		tasksArray.push(data);
		const newProjectData = { ...project, tasks: tasksArray };

		updateProjectMutation.mutate(newProjectData);
		setEdit(false);
	};

	useEffect(() => {
		if (pageEdit) {
			setEdit(true);
		} else {
			setEdit(false);
		}
	}, [pageEdit]);

	return !edit ? (
		<TaskView
			task={data}
			setData={setData}
			setEdit={setEdit}
		/>
	) : !pageEdit ? (
		<form onSubmit={e => handleSubmit(e)}>
			<TaskForm
				task={data}
				setData={setData}
				setEdit={setEdit}
				pageEdit={pageEdit}
				teamMembers={teamMembers}
				deleteTask={deleteTask}
			/>
		</form>
	) : (
		<>
			<TaskForm
				task={data}
				setData={setData}
				setEdit={setEdit}
				pageEdit={pageEdit}
				teamMembers={teamMembers}
				deleteTask={deleteTask}
			/>
		</>
	);
};

export default TaskCard;
