import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import TaskCard from "../../components/TaskCard";
import { Icon } from "@iconify/react";
import BackButton from "../../components/BackButton";
import { customSort } from "../../customSort";

const ProjectView = () => {
	const { state } = useLocation();
	const [status, setStatus] = useState("");
	const [pageEdit, setPageEdit] = useState(false);

	useEffect(() => {
		if (state.status === "Planned") {
			setStatus("text-red-500");
		} else if (state.status === "In Progress") {
			setStatus("text-yellow-500");
		} else {
			setStatus("text-green-500");
		}
	}, [state.status]);

	state.tasks.sort(customSort);

	return (
		<div className="flex-1 font-opensans">
			{/* Header */}
			<div className="bg-white drop-shadow-lg p-6 flex justify-between sticky top-0">
				<h1 className="font-oswald font-bold text-4xl">{state.title}</h1>
				<BackButton />
			</div>

			{/* Information */}
			<div className="m-6">
				<div className="flex justify-between my-4 items-center">
					<p className="text-lg">{state.description}</p>
					{!pageEdit ? (
						<button
							onClick={() => setPageEdit(true)}
							className="bg-zinc-200 rounded-sm p-3 hover:bg-zinc-300 active:bg-zinc-400"
						>
							<Icon icon="material-symbols:edit-outline" />
						</button>
					) : (
						<button
							onClick={() => setPageEdit(false)}
							className="bg-red-500 py-2 px-4 text-white hover:bg-red-600 active:bg-red-700"
						>
							Discard Edits
						</button>
					)}
				</div>

				<p>
					<span className="font-semibold">Status: </span>
					<span className={`my-2 ${status}`}>{state.status}</span>
				</p>
				<div className="my-5 space-y-1">
					<p>Start Date: {state.startDate}</p>
					<p>Due Date: {state.dueDate}</p>
				</div>
				<div className="my-4 space-y-1">
					<p>Team Members:</p>
					<div className="flex space-x-4">
						{state.teamMembers.map(person => {
							return (
								<div
									key={person.id}
									className=""
								>
									<p>{person.name}</p>
									<p
										onClick={() => alert("Redirect to mail app")}
										className="cursor-pointer text-blue-700 hover:text-blue-800 hover:underline"
									>
										{person.email}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Tasks */}
				<section className="my-6">
					<p className="font-bold text-2xl my-2">Tasks</p>
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
						{state.tasks.map(task => {
							return (
								<div key={task.id}>
									<TaskCard
										task={task}
										pageEdit={pageEdit}
									/>
								</div>
							);
						})}
					</div>
				</section>
				<div className="drop-shadow-md sticky bottom-3">
					<StatusBar
						tasks={state.tasks}
						size={4}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProjectView;
