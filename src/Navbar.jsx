import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjects } from "./api/projectsAPI";

const Navbar = () => {
	const { isLoading, isError, error, data } = useQuery("projects", getProjects);
	const [teamMembers, setTeamMembers] = useState([]);
	const [overviewActive, setOverviewActive] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			let team = [];
			data.projects.forEach(project => {
				project.teamMembers.forEach(member => {
					if (!team.includes(member.name)) {
						team.push({ name: member.name, id: member.id, active: false });
					}
				});
			});
			setTeamMembers(team);
		}
	}, [data, isLoading]);

	const handleClick = clicked => {
		setOverviewActive(false);
		const updatedTeamMembers = teamMembers.map(member => ({
			...member,
			active: member.id === clicked,
		}));
		setTeamMembers(updatedTeamMembers);
	};

	const overviewClick = () => {
		setOverviewActive(true);
		const updatedTeamMembers = teamMembers.map(member => ({
			...member,
			active: false,
		}));
		setTeamMembers(updatedTeamMembers);
	};

	return (
		<div className="sticky top-0 flex flex-col px-3 py-10 bg-emerald-950 h-screen space-y-10 w-[200px] md:px-10 md:w-[260px]">
			<h1 className="flex flex-col items-center font-oswald font-medium text-white text-4xl tracking-wider">
				SPRINT <span className="text-emerald-300 tracking-widest text-5xl -my-2">SYNC</span>
			</h1>
			<span className="border-t-[1px] border-white" />
			<div className="flex flex-col space-y-3 py-2 font-opensans font-medium text-white">
				<Link
					to="/"
					onClick={() => overviewClick()}
					className={`${overviewActive && "bg-emerald-300 text-black"} px-5 py-3 rounded-md hover:bg-emerald-300 hover:text-black active:bg-emerald-500`}
				>
					Overview
				</Link>
				<p className="py-2 underline underline-offset-4">Team Members</p>
				{!isLoading &&
					!isError &&
					teamMembers.map(member => (
						<Link
							to={`/member/${member.id}`}
							key={member.id}
							state={member}
							onClick={() => handleClick(member.id)}
							className={`${member.active && "bg-emerald-300 text-black"} px-5 py-3 rounded-md hover:bg-emerald-300 hover:text-black active:bg-emerald-500`}
						>
							{member.name}
						</Link>
					))}
			</div>
		</div>
	);
};

export default Navbar;
