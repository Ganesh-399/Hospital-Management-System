// src/services/authService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const loginApi = (data) => API.post("/auth/login", data);
