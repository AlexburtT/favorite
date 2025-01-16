class MovieRecords {
    constructor({ name, releaseYear, poster = '', genres = [], viewed = false, description = '', favorite = false }) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.poster = poster;
        this.genres = genres;
        this.viewed = viewed;
        this.description = description;
        this.favorite = favorite;
    }

    static API_URL = 'http://localhost:3000/films';

    static async fetchFromApi(endpoint = '', options = {}) {
        const url = endpoint ? `${this.API_URL}/${endpoint}` : this.API_URL;
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Ошибка при выполнении запроса к API (${url}):`, error);
            throw error;
        }
    }

    static async findAll() {
        const data = await this.fetchFromApi();
        return data.map((film) => new MovieRecords(film));
    }

    static async findById(id) {
        const film = await this.fetchFromApi(id);
        return new MovieRecords(film);
    }

    static async createFilm(newFilmData) {
        const film = await this.fetchFromApi('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFilmData),
        });
        return new MovieRecords(film);
    }

    static async updateFilm(id, updatedFields) {
        const updatedFilm = await this.fetchFromApi(id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        });
        return new MovieRecords(updatedFilm);
    }

    static async deleteFilm(id) {
        await this.fetchFromApi(id, { method: 'DELETE' });
        return { success: true };
    }
}

export default MovieRecords;
