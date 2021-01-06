import Axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api/v1';

const axios = Axios.create({baseURL: BASE_URL});

export const getRecipes = () => axios.get('/recipes');

export const deleteRecipe = (id: number) => axios.delete(`/recipes/${id}`);

export const getRecipe = (id: string) => axios.get(`/recipes/${id}`);

export const updateRecipe = (id: string | number, data: any) => axios.post(`/recipes/${id}`, data);

export const addRecipe = (data: any) => axios.put('/recipes', data);

export const getCategories = () => axios.get('/categories');

export const deleteCategory = (id: number) => axios.delete(`/categories/${id}`);

export const getCategory = (id: string | number) => axios.get(`/categories/${id}`);

export const updateCategory = (id: string | number, data: any) => axios.post(`/categories/${id}`, data);

export const addCategory = (data: any) => axios.put('/categories', data);

export const getUsers = () => axios.get('/users');

export const getSql = () => axios.get('/sql');

export const getLogin = () => axios.get('/login');
