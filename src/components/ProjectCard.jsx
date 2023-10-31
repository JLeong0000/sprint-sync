import React, { useEffect, useState } from "react";
import StatusBar from "./StatusBar";

const ProjectCard = ({ project, tasks }) => {
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (project.status === "Planned") {
			setStatus("text-red-500");
		} else if (project.status === "In Progress") {
			setStatus("text-yellow-500");
		} else {
			setStatus("text-green-500");
		}
	}, [project.status]);

	return (
		<div
			key={project.id}
			className="bg-white rounded-md drop-shadow-xl p-4 h-full cursor-pointer ease-in-out duration-100 hover:scale-[1.01]"
		>
			<div className="flex flex-col justify-between h-full">
				<div>
					<h1 className="font-opensans font-semibold ">{project.title}</h1>
					<p>{project.description}</p>
					<p>
						Status: <span className={`my-2 ${status}`}>{project.status}</span>
					</p>
					<div className="my-2">
						<p>Start Date: {project.startDate}</p>
						<p className="font-medium">Due Date: {project.dueDate}</p>
					</div>
				</div>
				<StatusBar
					tasks={project.tasks}
					size={2}
				/>
			</div>
			{tasks && (
				<div className="space-y-1 my-3">
					{project.tasks.map(task => (
						<p
							key={task.id}
							className="p-2 rounded-sm bg-white drop-shadow-md cursor-pointer ease-in-out duration-75"
							style={task.status === "Completed" ? { background: "lightgreen", textDecoration: "line-through" } : {}}
						>
							{task.title}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default ProjectCard;
