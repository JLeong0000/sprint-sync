import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

const Filter = ({ open, setOpen, setFilter }) => {
	const [statusFilter, setStatusFilter] = useState("All Projects");

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", outsideClick);
		}
		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, [open]);

	const handleSelect = option => {
		setFilter(option);
		setStatusFilter(option);
		setOpen(false);
	};

	const ref = useRef();
	const outsideClick = e => {
		if (!ref.current.contains(e.target)) {
			setOpen(false);
		}
	};

	return open ? (
		<div
			ref={ref}
			className="relative"
		>
			<div className="absolute right-0 bg-zinc-200 rounded-md">
				<div className="font-opensans min-w-max">
					<p
						onClick={() => handleSelect("All Projects")}
						className="px-7 py-2 cursor-pointer rounded-md hover:bg-zinc-300 active:bg-zinc-400"
					>
						All Projects
					</p>
					<p
						onClick={() => handleSelect("Planned")}
						className="px-7 py-2 cursor-pointer rounded-md hover:bg-zinc-300 active:bg-zinc-400"
					>
						Planned
					</p>
					<p
						onClick={() => handleSelect("In Progress")}
						className="px-7 py-2 cursor-pointer rounded-md hover:bg-zinc-300 active:bg-zinc-400"
					>
						In Progress
					</p>
					<p
						onClick={() => handleSelect("Completed")}
						className="px-7 py-2 cursor-pointer rounded-md hover:bg-zinc-300 active:bg-zinc-400"
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
