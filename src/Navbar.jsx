import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "./api/projectsAPI";
import { Icon } from "@iconify/react";
import ResetButton from "./components/ResetButton";

const Navbar = () => {
	// Redux store teamMembers
	// Redux store activePage
	const { isLoading, isError, error, data: projects } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
	const [teamMembers, setTeamMembers] = useState([]);
	const [overviewActive, setOverviewActive] = useState(true);

	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState("Overview");
	const ref = useRef();

	const handleClick = clicked => {
		setOverviewActive(false);
		const updatedTeamMembers = teamMembers.map(member => ({
			...member,
			active: member.id === clicked,
		}));
		setTeamMembers(updatedTeamMembers);
	};

	useEffect(() => {
		if (!isLoading) {
			let team = [];
			projects.forEach(project => {
				project.teamMembers.forEach(member => {
					if (!team.includes(member.name)) {
						team.push({ ...member, active: false });
					}
				});
			});
			setTeamMembers(team);
		}

		if (open) {
			document.addEventListener("mousedown", outsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, [projects, isLoading, open]);

	const handleMobileClick = item => {
		setOpen(false);
		setCurrent(item);
	};

	const outsideClick = e => {
		if (!ref.current.contains(e.target)) {
			setOpen(false);
		}
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
		<nav className="top-0 left-0 overflow-y-auto flex px-3 py-4 bg-emerald-950 h-full space-x-4 sm:py-10 sm:sticky sm:space-x-0 sm:space-y-8 sm:w-[200px] sm:flex-col sm:h-screen md:px-10 md:w-[260px]">
			<h1 className="font-oswald font-medium flex flex-col items-center text-white text-3xl pb-2 pl-4 pr-1 sm:tracking-wide sm:text-4xl sm:px-0">
				SPRINT <span className="text-emerald-300 -my-2 tracking-widest text-4xl sm:text-5xl">SYNC</span>
			</h1>
			<div>
				<span className="border-white border-l-[1px] sm:border-t-[1px] my-0 hidden sm:block" />
				<ResetButton />
			</div>

			{/* Mobile Links */}
			{open ? (
				<div
					ref={ref}
					className="absolute right-4 top-[22px] font-opensans font-medium bg-emerald-300 rounded-md flex flex-col space-y-3 z-50 sm:hidden"
				>
					<Link
						to="/"
						onClick={() => {
							overviewClick();
							handleMobileClick("Overview");
						}}
						className="px-5 py-3 text-center rounded-md hover:bg-emerald-400 active:bg-emerald-500"
					>
						Overview
					</Link>
					<p className="py-1 text-center underline underline-offset-4 text-sm">Team Members</p>
					{!isLoading &&
						!isError &&
						teamMembers.map(member => (
							<Link
								to={`/member/${member.id}`}
								key={member.id}
								state={member}
								onClick={() => {
									handleClick(member.id);
									handleMobileClick(member.name);
								}}
								className="px-5 py-3 text-center rounded-md hover:bg-emerald-400 active:bg-emerald-500"
							>
								{member.name}
							</Link>
						))}
				</div>
			) : (
				<button
					onClick={() => setOpen(true)}
					className="absolute right-4 top-[22px] flex font-opensans font-medium bg-emerald-300 px-5 py-3 rounded-md hover:bg-emerald-400 active:bg-emerald-500 sm:hidden"
				>
					{current}
					<Icon
						icon="ep:arrow-up-bold"
						className="ml-3 my-auto"
					/>
				</button>
			)}

			{/* Desktop Links */}
			<div className="font-opensans font-medium text-white flex-col space-y-3 py-2 hidden sm:flex">
				<Link
					to="/"
					onClick={() => overviewClick()}
					className={`${overviewActive && "bg-emerald-300 text-black"} px-5 py-3 rounded-md hover:bg-emerald-300 hover:text-black active:bg-emerald-500`}
				>
					Overview
				</Link>
				<p className="py-2 pl-4 underline underline-offset-4 text-sm sm:pt-4 sm:pb-2">Team Members</p>
				{!isLoading && !isError && (
					<div className="flex flex-col">
						{teamMembers.map(member => (
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
				)}
			</div>
		</nav>
	);
};

export default Navbar;
