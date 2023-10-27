import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import TaskCard from "../components/TaskCard";

const ProjectView = () => {
	const { state } = useLocation();
	const [status, setStatus] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (state.status === "Planned") {
			setStatus("text-red-500");
		} else if (state.status === "In Progress") {
			setStatus("text-yellow-500");
		} else {
			setStatus("text-green-500");
		}
	}, [state.status]);

	return (
		<div className="flex-1 font-opensans">
			<div className="bg-white drop-shadow-lg p-6 flex justify-between">
				<h1 className="font-oswald font-bold text-4xl">{state.title}</h1>
				<button
					onClick={() => navigate(-1)}
					className="font-opensans font-semibold bg-emerald-500 px-10 py-2 rounded-md hover:bg-emerald-600 active:bg-emerald-700 active:text-white"
				>
					BACK
				</button>
			</div>
			<div className="m-6">
				<p className="my-4 text-lg">{state.description}</p>
				<p>
					<span className="font-semibold">Status: </span>
					<span className={`my-2 ${status}`}>{state.status}</span>
				</p>
				<div className="my-5 space-y-1">
					<p>Start Date: {state.startDate}</p>
					<p>Due Date: {state.dueDate}</p>
				</div>
				<p className="flex flex-col">
					Manager:
					<span className="pt-1">{state.manager.name}</span>
				</p>
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
				<section className="my-6">
					<p className="font-bold text-2xl my-2">Tasks</p>
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
						{state.tasks.map(task => {
							return <TaskCard task={task} />;
						})}
					</div>
				</section>
				<div className="sticky bottom-3">
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
