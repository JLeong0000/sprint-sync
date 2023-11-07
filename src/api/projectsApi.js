import axios from "axios";

const projectsApi = axios.create({ baseURL: "http://localhost:3000" });

// Project API methods

export const getProjects = async () => {
	const response = await projectsApi.get("/projects");
	return response.data;
};

export const addProject = async project => {
	const response = await projectsApi.post("/projects", project);
	return response.data;
};

export const updateProject = async project => {
	const response = await projectsApi.patch(`/projects/${project.id}`, project);
	return response.data;
};

export const deleteProject = async ({ id }) => {
	const response = await projectsApi.delete(`/projects/${project.id}`, id);
	return response.data;
};

export const resetProjects = async projects => {
	await projectsApi.delete("/projects");
	const response = await projectsApi.post("/projects", projects);
	return response.data;
};

export default projectsApi;
