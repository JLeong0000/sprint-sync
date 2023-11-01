import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProjects } from "../../api/projectsAPI";
import { Link, useLocation } from "react-router-dom";
import Filter from "../../components/Filter";
import ProjectCard from "../../components/ProjectCard";
import { customSort } from "../../customSort";

const TeamView = () => {
	const { isLoading, isError, error, data } = useQuery("projects", getProjects);
	const { state } = useLocation();
	const [open, setOpen] = useState(false);
	const [memberData, setMemberData] = useState([]);
	const [filter, setFilter] = useState("");
	const [filterData, setFilterData] = useState([]);

	useEffect(() => {
		if (!isLoading) {
			let memDat = [];

			data.projects.forEach(project => {
				project.teamMembers.forEach(member => {
					if (member.name === state.name) {
						memDat.push(project);
					}
				});
			});

			setMemberData(memDat);

			const sortedData = memberData.sort(customSort);

			if (filter !== "All Projects") {
				setFilterData(sortedData.filter(project => project.status === filter));
			} else {
				setFilterData(sortedData);
			}
		}
	}, [filter, data, state.id]);

	if (isLoading) {
		return <p className="p-6">Loading...</p>;
	}

	if (isError) {
		return (
			<>
				<p className="p-6">There was an error loading the data.</p>
				{console.log(error)}
			</>
		);
	}

	return (
		<div className="flex-1">
			<div className="sticky top-0 flex justify-between py-5 px-7 bg-white drop-shadow-lg z-20">
				<h1 className="font-oswald font-medium tracking-wide text-4xl">{state.name}</h1>
				<Filter
					open={open}
					setOpen={setOpen}
					setFilter={setFilter}
				/>
			</div>
			<div className="m-5 grid gap-4 grid-cols-1 lg:grid-cols-2">
				{filterData.length > 0
					? filterData.map(project => (
							<Link
								to={`/${project.id}`}
								key={project.id}
								state={project}
							>
								<ProjectCard
									project={project}
									tasks
								/>
							</Link>
					  ))
					: memberData.map(project => (
							<Link
								to={`/project/${project.id}`}
								key={project.id}
								state={project}
							>
								<ProjectCard
									project={project}
									tasks
								/>
							</Link>
					  ))}
			</div>
		</div>
	);
};

export default TeamView;
