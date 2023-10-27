import React, { useEffect, useState } from "react";

const StatusBar = ({ tasks, size }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let totalTasks = 0;
		let completeTasks = 0;

		tasks.forEach(task => {
			totalTasks++;
			if (task.status === "Completed") {
				completeTasks++;
			}

			return totalTasks, completeTasks;
		});

		const newProgress = Math.round((completeTasks / totalTasks) * 100);
		setProgress(newProgress);
	}, [tasks]);

	const progressBar = progress + "%";

	if (progressBar) {
		return (
			<div className="container relative">
				<div className={`bg-slate-300 rounded-md py-${size}`} />
				<div
					className={`inset-0 absolute bg-green-400 rounded-md py-${size}`}
					style={{ width: progressBar }}
				/>
			</div>
		);
	}
};

export default StatusBar;
