import { Icon } from "@iconify/react";
import { useState } from "react";

const Filter = ({ open, setOpen, setFilter }) => {
	const handleSelect = option => {
		setFilter(option);
		setStatusFilter(option);
		setOpen(false);
	};

	const [statusFilter, setStatusFilter] = useState("All Projects");

	return open ? (
		<div className="relative">
			<div className="absolute right-0 bg-zinc-200 rounded-md ">
				<button
					onClick={() => setOpen(false)}
					className="font-opensans container flex items-center justify-end bg-zinc-200 rounded-md px-4 pt-3"
				>
					<Icon
						icon="ep:arrow-up-bold"
						className="rotate-180"
					/>
				</button>
				<div className="font-opensans min-w-max my-2">
					<p
						onClick={() => handleSelect("All Projects")}
						className="px-7 py-2 cursor-pointer hover:bg-zinc-300 active:bg-zinc-400"
					>
						All Projects
					</p>
					<p
						onClick={() => handleSelect("Planned")}
						className="px-7 py-2 cursor-pointer hover-bg-zinc-300 active-bg-zinc-400"
					>
						Planned
					</p>
					<p
						onClick={() => handleSelect("In Progress")}
						className="px-7 py-2 cursor-pointer hover-bg-zinc-300 active-bg-zinc-400"
					>
						In Progress
					</p>
					<p
						onClick={() => handleSelect("Completed")}
						className="px-7 py-2 cursor-pointer hover-bg-zinc-300 active-bg-zinc-400"
					>
						Completed
					</p>
				</div>
			</div>
		</div>
	) : (
		<button
			onClick={() => setOpen(true)}
			className="font-opensans flex items-center space-x-3 bg-zinc-200 px-4 rounded-md hover-bg-zinc-300 active-bg-zinc-400"
		>
			<p>{statusFilter}</p>
			<Icon icon="ep:arrow-up-bold" />
		</button>
	);
};

export default Filter;
