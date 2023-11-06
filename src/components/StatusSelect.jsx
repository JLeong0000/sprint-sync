import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

const StatusSelect = ({ task, setData, status }) => {
	const ref = useRef();
	const [open, setOpen] = useState(false);
	const statuses = ["Planned", "In Progress", "Completed"];

	const statusSelect = item => {
		setOpen(false);
		setData({ ...task, status: item });
	};

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", outsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", outsideClick);
		};
	}, [open]);

	const outsideClick = e => {
		if (!ref.current.contains(e.target)) {
			setOpen(false);
		}
	};

	return (
		<div className="relative">
			{open ? (
				<div
					ref={ref}
					onClick={outsideClick}
					className="flex flex-col bg-zinc-100 w-36 absolute top-0 left-2 drop-shadow-md z-10"
				>
					{statuses.map((stat, index) => {
						return (
							<button
								key={index}
								onClick={() => {
									statusSelect(stat);
								}}
								className="flex-1 text-left px-2 py-1 hover:bg-zinc-200 active:bg-zinc-300"
							>
								{stat}
							</button>
						);
					})}
				</div>
			) : (
				<div
					onClick={() => setOpen(true)}
					className="flex border mx-2 px-2 rounded-sm border-zinc-500 cursor-pointer bg-white"
				>
					<button className="text-left w-28">{status}</button>
					<Icon
						icon="ep:arrow-up-bold"
						width={13}
						className="my-auto"
					/>
				</div>
			)}
		</div>
	);
};

export default StatusSelect;
