import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetProjects } from "../api/projectsAPI";

const baseData = [
	{
		id: 1,
		title: "New Website Development",
		description: "Develop a modern website for a client in the e-commerce industry.",
		status: "Completed",
		startDate: "2023-03-01",
		dueDate: "2023-08-30",
		teamMembers: [
			{
				id: 201,
				name: "Alice Smith",
				email: "alice.smith@example.com",
			},
			{
				id: 202,
				name: "Bob Johnson",
				email: "bob.johnson@example.com",
			},
		],
		tasks: [
			{
				id: 1001,
				title: "Requirements Gathering",
				status: "Completed",
				dueDate: "2023-04-15",
				assignee: {
					id: 201,
					name: "Alice Smith",
				},
				todos: [
					{
						id: 3001,
						description: "Interview the client to gather requirements.",
						completed: true,
					},
					{
						id: 3002,
						description: "Create a requirements document.",
						completed: true,
					},
				],
			},
			{
				id: 1002,
				title: "Design Mockups",
				status: "Completed",
				dueDate: "2023-05-20",
				assignee: {
					id: 202,
					name: "Bob Johnson",
				},
				todos: [
					{
						id: 3003,
						description: "Create wireframes for the website.",
						completed: true,
					},
					{
						id: 3004,
						description: "Design the homepage mockup.",
						completed: true,
					},
				],
			},
			{
				id: 1003,
				title: "Frontend Development",
				status: "Completed",
				dueDate: "2023-06-30",
				assignee: {
					id: 202,
					name: "Bob Johnson",
				},
				todos: [],
			},
		],
	},
	{
		id: 2,
		title: "Marketing Campaign",
		description: "Plan and execute a marketing campaign for a product launch.",
		status: "In Progress",
		startDate: "2023-04-01",
		dueDate: "2023-07-15",
		teamMembers: [
			{
				id: 203,
				name: "Charlie Brown",
				email: "charlie.brown@example.com",
			},
		],
		tasks: [
			{
				id: 1004,
				title: "Market Research",
				status: "Completed",
				dueDate: "2023-05-15",
				assignee: {
					id: 203,
					name: "Charlie Brown",
				},
				todos: [
					{
						id: 3005,
						description: "Collect data on the target audience.",
						completed: true,
					},
					{
						id: 3006,
						description: "Analyze competitor marketing strategies.",
						completed: true,
					},
				],
			},
			{
				id: 1005,
				title: "Vendor Contracting",
				status: "In Progress",
				dueDate: "2023-06-10",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [
					{
						id: 3027,
						description: "Contact vendors for supplies",
						completed: false,
					},
				],
			},
			{
				id: 1015,
				title: "Campaign Planning",
				status: "Planned",
				dueDate: "2023-06-10",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [],
			},
		],
	},
	{
		id: 3,
		title: "New Mobile App Development",
		description: "Develop a mobile app for a client in the e-commerce industry.",
		status: "Planned",
		startDate: "2023-05-01",
		dueDate: "2023-10-15",
		teamMembers: [
			{
				id: 204,
				name: "Evelyn Wong",
				email: "evelyn.wong@example.com",
			},
			{
				id: 205,
				name: "David Lee",
				email: "david.lee@example.com",
			},
		],
		tasks: [
			{
				id: 1006,
				title: "Project Planning",
				status: "Planned",
				dueDate: "2023-06-01",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [],
			},
			{
				id: 1007,
				title: "UI/UX Design",
				status: "Planned",
				dueDate: "2023-06-15",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [],
			},
		],
	},
	{
		id: 4,
		title: "Product Launch Campaign",
		description: "Plan and execute a marketing campaign for a product launch.",
		status: "Planned",
		startDate: "2023-05-15",
		dueDate: "2023-11-30",
		teamMembers: [
			{
				id: 206,
				name: "Fiona Adams",
				email: "fiona.adams@example.com",
			},
		],
		tasks: [
			{
				id: 1008,
				title: "Campaign Strategy",
				status: "Planned",
				dueDate: "2023-06-30",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [],
			},
		],
	},
	{
		id: 5,
		title: "Client Portal Redesign",
		description: "Redesign the client portal for improved user experience.",
		status: "In Progress",
		startDate: "2023-06-01",
		dueDate: "2023-12-31",
		teamMembers: [
			{
				id: 207,
				name: "Grace Taylor",
				email: "grace.taylor@example.com",
			},
		],
		tasks: [
			{
				id: 1009,
				title: "User Research",
				status: "Completed",
				dueDate: "2023-07-15",
				assignee: {
					id: 207,
					name: "Grace Taylor",
				},
				todos: [
					{
						id: 3007,
						description: "Conduct user surveys and interviews.",
						completed: true,
					},
					{
						id: 3008,
						description: "Analyze user feedback and pain points.",
						completed: true,
					},
				],
			},
			{
				id: 1010,
				title: "Design Prototypes",
				status: "Completed",
				dueDate: "2023-08-15",
				assignee: {
					id: 207,
					name: "Grace Taylor",
				},
				todos: [],
			},
			{
				id: 1011,
				title: "Development",
				status: "Planned",
				dueDate: "2023-09-15",
				assignee: {
					id: 0,
					name: "Unassigned",
				},
				todos: [],
			},
		],
	},
];

const ResetButton = () => {
	const queryClient = useQueryClient();

	const resetMutation = useMutation({
		mutationFn: resetProjects,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});

	return (
		<button
			onClick={() => resetMutation.mutate(baseData)}
			className="font-opensans text-white text-sm bg-red-700 flex px-3 py-1 rounded-md mt-2 mx-auto hover:bg-red-800 active:bg-red-900"
		>
			Reset Demo
		</button>
	);
};

export default ResetButton;
