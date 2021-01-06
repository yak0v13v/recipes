import Axios from 'axios';

const axios = Axios.create({baseURL: 'http://localhost:3000/api/v1'});

export const getRecipes = () => axios.get('/recipes');

export const deleteRecipe = (id: number) => axios.delete(`/recipes/${id}`);

export const getRecipe = (id: string) => axios.get(`/recipes/${id}`);

export const updateRecipe = (id: string | number, data: any) => axios.post(`/recipes/${id}`, data);

export const addRecipe = (data: any) => axios.put('/recipes', data);

export const getCategories = () => axios.get('/categories');

export const deleteCategory = (id: number) => axios.delete(`/categories/${id}`);

export const getCategory = (id: string | number) => axios.get(`/categories/${id}`);

export const updateCategory = (id: string | number, data: any) => axios.post(`/categories/${id}`, data);

