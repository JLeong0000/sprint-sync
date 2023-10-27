import axios from "axios";

const projectsApi = axios.create({ baseURL: "../../data" });

export const getProjects = async () => {
	const response = await projectsApi.get("/data.json");
	return response.data;
};

export const addProject = async todo => {
	const response = await projectsApi.post("/data.json", project);
	return response.data;
};

export const updateProject = async todo => {
	const response = await projectsApi.patch(`/data.json/${projects.id}`, project);
	return response.data;
};

export const deleteProject = async ({ id }) => {
	const response = await projectsApi.delete(`/data.json/${id}`, id);
	return response.data;
};

export default projectsApi;
