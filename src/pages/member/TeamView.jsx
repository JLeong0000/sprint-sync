import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/projectsAPI";
import { Link, useLocation } from "react-router-dom";
import { customSort } from "../../customSort";

import Filter from "../../components/Filter";
import ProjectCard from "../../components/ProjectCard";

const TeamView = () => {
	const { isLoading, isError, error, data: projects } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
	const { state } = useLocation();
	const [open, setOpen] = useState(false);
	const [memberData, setMemberData] = useState([]);
	const [filter, setFilter] = useState("");
	const [filterData, setFilterData] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		setFilter("All Projects");
	}, []);

	useEffect(() => {
		if (!isLoading) {
			let memDat = [];

			projects.forEach(project => {
				project.teamMembers.forEach(member => {
					if (member.name === state.name) {
						memDat.push(project);
					}
				});
			});

			setMemberData(memDat);

			const sortedData = memberData.sort(customSort);
			setDataLoaded(true);

			if (filter !== "All Projects") {
				setFilterData(sortedData.filter(project => project.status === filter));
			} else {
				setFilterData(sortedData);
			}
		}
	}, [filter, projects, state.name, dataLoaded]);

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

	if (!dataLoaded) {
		return <p className="p-6">Filtering data...</p>;
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
				{filterData.length > 0 &&
					filterData.map(project => (
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
