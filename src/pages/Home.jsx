import React from "react";
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "react-query";
import { getProjects } from "../api/projectsAPI";
import { Link } from "react-router-dom";

const Home = () => {
	const { isLoading, isError, error, data } = useQuery("projects", getProjects);
	return (
		<div className="flex-1">
			{isLoading ? (
				<p className="p-6">Loading...</p>
			) : isError ? (
				<p className="p-6">There was an error loading the data.</p>
			) : (
				<>
					<h1 className="sticky top-0 font-oswald font-medium tracking-wide text-4xl py-5 px-7 bg-white  drop-shadow-lg z-50">Overview</h1>
					<div className="m-5 grid gap-4 grid-cols-1 lg:grid-cols-2">
						{data.projects.map(project => (
							<div key={project.id}>
								<Link
									to={`/${project.id}`}
									state={project}
								>
									<ProjectCard project={project} />
								</Link>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
