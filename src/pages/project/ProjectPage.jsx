import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { updateProject, getProjects } from "../../api/projectsAPI";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import StatusBar from "../../components/StatusBar";
import TaskCard from "../../components/TaskCard";
import BackButton from "../../components/BackButton";
import { customSort } from "../../customSort";
import StatusSelect from "../../components/StatusSelect";

const ProjectForm = ({ project, pageEdit, setPageEdit, tasks, setTasks, teamMembers, setTeamMembers, deleteTask }) => {
	const [projStatus, setProjStatus] = useState(project.status);
	const [open, setOpen] = useState(false);

	const addTasks = () => {
		setTasks([...tasks, { assignee: { id: 0, name: "Unassigned" }, dueDate: "", id: uuidv4(), status: "Planned", title: "", todos: [] }]);
	};

	const statusSelect = item => {
		setOpen(false);
		setProjStatus(item);
	};

	return (
		<form>
			{/* Header */}
			<div className="flex items-center justify-between bg-white drop-shadow-lg p-3 sticky top-0 z-20">
				<input
					defaultValue={project.title}
					className="container flex-wrap font-oswald font-bold h-full px-3 py-1 mr-3 border border-zinc-500 text-3xl sm:text-4xl md:mr-10 lg:mr-28"
				/>
			</div>

			<div className="p-6">
				{/* Description & Edit button */}
				<div className="flex justify-between items-center">
					<input
						defaultValue={project.description}
						className="text-lg px-2 mr-5 flex-1 border border-zinc-500"
					/>
					<button
						onClick={() => setPageEdit(false)}
						className="bg-red-500 py-2 px-4 text-white hover:bg-red-600 active:bg-red-700"
					>
						Discard Edits
					</button>
				</div>

				{/* Status */}
				<div className="flex">
					<span className="font-semibold">Status: </span>
					<StatusSelect
						open={open}
						statusSelect={statusSelect}
						setOpen={setOpen}
						taskStatus={projStatus}
						status={project.status}
					/>
				</div>

				{/* Dates */}
				<div className="my-5 space-y-1">
					<p>
						Start Date:
						<input
							type="date"
							defaultValue={project.startDate}
							className="border mx-2 px-1 rounded-sm border-zinc-500"
						/>
					</p>
					<p>
						Due Date:{" "}
						<input
							type="date"
							defaultValue={project.dueDate}
							className="border mx-2 px-1 rounded-sm border-zinc-500"
						/>
					</p>
				</div>

				{/* Team */}
				<div className="my-4 space-y-1">
					<div className="flex space-x-2">
						<p>Team Members:</p>
						<button className="bg-zinc-300 px-2 rounded-sm text-sm">Add Member</button>
					</div>
					<div className="flex flex-col space-y-2">
						{teamMembers.slice(1).map(person => {
							return (
								<div
									key={person.id}
									className="flex items-center"
								>
									<div className="flex flex-col">
										<p>{person.name}</p>
										<p
											onClick={() => alert("Redirect to mail app")}
											className="cursor-pointer text-blue-700 hover:text-blue-800 hover:underline"
										>
											{person.email}
										</p>
									</div>
									<button className="text-red-500 ml-2 bg-white rounded-sm p-2 border border-zinc-400">
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

				{/* Tasks */}
				<section className="my-6">
					<div className="flex my-2">
						<p className="font-bold text-2xl mr-5">Tasks</p>
						<button
							type="button"
							onClick={addTasks}
							className="bg-zinc-300 px-2 rounded-sm text-sm hover:bg-zinc-400 active:bg-zinc-500"
						>
							Add Task
						</button>
					</div>

					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
						{tasks?.map(task => {
							return (
								<div key={task.id}>
									<TaskCard
										project={project}
										task={task}
										pageEdit={pageEdit}
										teamMembers={teamMembers}
										deleteTask={deleteTask}
									/>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</form>
	);
};

const ProjectView = ({ project, pageEdit, setPageEdit, tasks, teamMembers, deleteTask }) => {
	return (
		<div>
			{/* Header */}
			<div className="bg-white drop-shadow-lg p-6 flex justify-between sticky top-0 z-20">
				<h1 className="font-oswald font-bold text-3xl sm:text-4xl">{project.title}</h1>
				<BackButton />
			</div>

			<div className="p-6">
				{/* Description & Edit button */}
				<div className="flex justify-between items-center">
					<p className="text-lg pr-2">{project.description}</p>
					{!pageEdit ? (
						<button
							onClick={() => setPageEdit(true)}
							className="flex bg-zinc-200 rounded-sm p-3 space-x-1 hover:bg-zinc-300 active:bg-zinc-400"
						>
							<Icon
								icon="material-symbols:edit-outline"
								className="my-auto"
							/>{" "}
							<p className="text-sm hidden md:inline">Edit</p>
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

				{/* Status & Dates */}
				<p>
					<span className="font-semibold">Status: </span>
					<span className="my-2">{project.status}</span>
				</p>
				<div className="my-5 space-y-1">
					<p>Start Date: {project.startDate}</p>
					<p>Due Date: {project.dueDate}</p>
				</div>

				{/* Team */}
				<div className="my-4 space-y-1">
					<p>Team Members:</p>
					<div className="flex flex-col space-y-1">
						{teamMembers.slice(1).map(person => {
							return (
								<div
									key={person.id}
									className="flex items-center"
								>
									<Icon
										icon="material-symbols:account-box"
										width={53}
										className="text-zinc-500"
									/>
									<div className="flex flex-col ml-2">
										<p>{person.name}</p>
										<p
											onClick={() => alert("Redirect to mail app")}
											className="cursor-pointer text-blue-700 hover:text-blue-800 hover:underline"
										>
											{person.email}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Tasks */}
				<section className="my-6">
					<p className="font-bold text-2xl my-2">Tasks</p>
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
						{tasks?.map(task => {
							return (
								<div key={task.id}>
									<TaskCard
										project={project}
										task={task}
										pageEdit={pageEdit}
										teamMembers={teamMembers}
										deleteTask={deleteTask}
									/>
								</div>
							);
						})}
					</div>
				</section>
				{project.tasks && (
					<div className="drop-shadow-md sticky bottom-3">
						<StatusBar
							tasks={project.tasks}
							size={4}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

const ProjectPage = () => {
	const { state } = useLocation();
	const { isLoading, isError, error, data: projects } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
	const [project, setProject] = useState({});

	const [pageEdit, setPageEdit] = useState(false);
	const [tasks, setTasks] = useState();
	const [teamMembers, setTeamMembers] = useState([{ id: 0, name: "Unassigned" }]);

	const queryClient = useQueryClient();

	const updateProjectMutation = useMutation({
		mutationFn: updateProject,
		onSuccess: () => {
			queryClient.invalidateQueries(["projects"]);
		},
	});

	const deleteTask = id => {
		const newTasks = project.tasks.filter(task => task.id !== id);
		const newProject = { ...project, tasks: newTasks };
		updateProjectMutation.mutate(newProject);
	};

	useEffect(() => {
		if (!isLoading) {
			const projectData = projects.find(project => project.id === state.id);
			setProject(projectData);
			setTasks(projectData.tasks.sort(customSort));
			setTeamMembers([{ id: 0, name: "Unassigned" }, ...projectData.teamMembers]);
		}
	}, [isLoading]);

	if (isLoading) {
		return <p className="p-6">Loading...</p>;
	}

	if (isError) {
		return (
			<>
				<p className="p-6">There was an error loading the project.</p>
				{console.log(error)}
			</>
		);
	}

	return (
		<div className="flex-1 font-opensans">
			{!pageEdit ? (
				<ProjectView
					project={project}
					pageEdit={pageEdit}
					setPageEdit={setPageEdit}
					tasks={tasks}
					teamMembers={teamMembers}
					deleteTask={deleteTask}
				/>
			) : (
				<ProjectForm
					project={project}
					pageEdit={pageEdit}
					setPageEdit={setPageEdit}
					tasks={tasks}
					setTasks={setTasks}
					teamMembers={teamMembers}
					setTeamMembers={setTeamMembers}
					deleteTask={deleteTask}
				/>
			)}
		</div>
	);
};

export default ProjectPage;
