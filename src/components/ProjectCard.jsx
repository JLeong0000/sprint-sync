import React, { useEffect, useState } from "react";
import StatusBar from "./StatusBar";

const ProjectCard = ({ project }) => {
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
			className="bg-white rounded-md drop-shadow-xl p-4 cursor-pointer ease-in-out duration-100 hover:scale-[1.01]"
		>
			<h1 className="font-opensans font-semibold ">{project.title}</h1>
			<p>{project.description}</p>
			<p>
				Status: <span className={`my-2 ${status}`}>{project.status}</span>
			</p>
			<p>Start Date: {project.startDate}</p>
			<p>Due Date: {project.dueDate}</p>
			<p className="my-2">Manager: {project.manager.name}</p>
			<StatusBar
				tasks={project.tasks}
				size={2}
			/>
		</div>
	);
};

export default ProjectCard;
