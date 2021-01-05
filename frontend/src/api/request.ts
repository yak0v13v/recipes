import Axios from 'axios';

const axios = Axios.create({baseURL: 'http://localhost:3000/api/v1'});

export const getRecipes = () => axios.get('/recipes');

export const deleteRecipe = (id: number) => axios.delete(`/recipes/${id}`);