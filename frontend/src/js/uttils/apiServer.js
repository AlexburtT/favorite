import { BASE_API_URL } from './constants.js';

export const getAllMovies = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/movies`);
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};