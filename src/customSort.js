export const customSort = (a, b) => {
	const statusOrder = {
		"In Progress": 1,
		Planned: 1,
		Completed: 2,
	};

	const statusA = a.status;
	const statusB = b.status;

	if (statusOrder[statusA] < statusOrder[statusB]) return -1;
	if (statusOrder[statusA] > statusOrder[statusB]) return 1;

	const dueDateA = new Date(a.dueDate);
	const dueDateB = new Date(b.dueDate);

	if (dueDateA < dueDateB) return -1;
	if (dueDateA > dueDateB) return 1;

	return 0;
};
