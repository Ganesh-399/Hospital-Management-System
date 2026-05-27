import API from "./api";

export const loginApi = (data) => API.post("/auth/login", data);

export const registerApi = (data) => API.post("/auth/register", data);
