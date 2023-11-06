import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

const AssigneeSelect = ({ task, setData, teamMembers }) => {
	const ref = useRef();
	const [open, setOpen] = useState(false);
	const [assignee, setAssignee] = useState(task.assignee.name);

	const assigneeSelect = (a, b, c) => {
		setAssignee(b);
		setOpen(false);
		setData({ ...task, assignee: { id: a, name: b, email: c } });
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
					{teamMembers.map(member => {
						return (
							<button
								key={member.id}
								onClick={() => {
									assigneeSelect(member.id, member.name, member.email);
								}}
								className="flex-1 text-left px-2 py-1 hover:bg-zinc-200 active:bg-zinc-300"
							>
								{member.name}
							</button>
						);
					})}
				</div>
			) : (
				<div
					onClick={() => setOpen(true)}
					className="flex rounded-sm cursor-pointer border border-zinc-500 ml-2"
				>
					<button>
						<input
							type="text"
							defaultValue={assignee}
							className="ml-2 rounded-sm"
						/>
					</button>
					<Icon
						icon="ep:arrow-up-bold"
						width={13}
						className="my-auto mx-2"
					/>
				</div>
			)}
		</div>
	);
};

export default AssigneeSelect;
