import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjects } from "./api/projectsAPI";

const Navbar = ({ projects }) => {
	const { isLoading, isError, error, data } = useQuery("projects", getProjects);

	// manager usestate save in redux
	// if manager usestate = manager then push teamMembers into array
	// if array doesn't have member then push
	// manager select button

	const [active, setActive] = useState({});

	return (
		<div className="sticky top-0 flex flex-col px-10 py-10 bg-emerald-950 h-screen space-y-10 w-[260px]">
			<h1 className="flex flex-col items-center font-oswald font-medium text-white text-4xl tracking-wider">
				SPRINT <span className="text-emerald-300 tracking-widest text-5xl -my-2">SYNC</span>
			</h1>
			<span className="border-t-[1px] border-white" />
			<div className="flex flex-col space-y-8 py-2 font-opensans font-medium text-white">
				<Link
					to="/"
					className="bg-emerald-300 px-5 py-3 rounded-md text-black hover:text-emerald-500 hover:bg-[#efefef] active:text-emerald-600"
				>
					Overview
				</Link>
				<Link
					to="/:id"
					className="border-[1px] border-white px-5 py-3 rounded-md hover:text-emerald-500 active:text-emerald-600"
				>
					Team Member 1
				</Link>
				<Link
					to="/:id"
					className="border-[1px] border-white px-5 py-3 rounded-md hover:text-emerald-500 active:text-emerald-600"
				>
					Team Member 2
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
