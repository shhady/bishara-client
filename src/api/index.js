import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

const url = process.env.REACT_APP_BACKEND_URL + "/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
