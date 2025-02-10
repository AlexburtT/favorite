import { BASE_API_URL } from '../constants/apiUrlConstant.js';

class MovieRecords {
    constructor({ 
        id, 
        name, 
        releaseYear, 
        poster = [], 
        genres = [], 
        viewed = false, 
        description = '', 
        favorite = false 
    }) {
        this.id = id; // Добавляем ID фильма
        this.name = name;
        this.releaseYear = releaseYear;
        this.poster = poster;
        this.genres = genres;
        this.viewed = viewed;
        this.description = description;
        this.favorite = favorite;
    }

    /**
     * Выполняет запрос к API
     * @param {string} endpoint - Конечная точка (например, ID фильма)
     * @param {object} options - Опции запроса (метод, заголовки, тело)
     * @returns {Promise<any>} - Ответ от сервера
     */
    static async fetchFromApi(endpoint = '', options = {}) {
        const url = `${BASE_API_URL}/movies${endpoint ? `/${endpoint}` : ''}`;
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

    /**
     * Получает все фильмы из API
     * @returns {Promise<MovieRecords[]>} - Массив фильмов
     */
    static async findAll() {
        const data = await this.fetchFromApi();
        return data.map((movie) => new MovieRecords(movie));
    }

    /**
     * Получает фильм по ID из API
     * @param {number|string} id - ID фильма
     * @returns {Promise<MovieRecords>} - Фильм
     */
    static async findById(id) {
        const movie = await this.fetchFromApi(id);
        return new MovieRecords(movie);
    }

    /**
     * Создает новый фильм через API
     * @param {object} newMovieData - Данные нового фильма
     * @returns {Promise<MovieRecords>} - Созданный фильм
     */
    static async createMovie(newMovieData) {
        if (!Array.isArray(newMovieData.poster)) {
            newMovieData.poster = [newMovieData.poster];
        }

        const movie = await this.fetchFromApi('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovieData),
        });
        return new MovieRecords(movie);
    }

    /**
     * Обновляет данные фильма через API
     * @param {number|string} id - ID фильма
     * @param {object} updatedFields - Обновляемые поля
     * @returns {Promise<MovieRecords>} - Обновленный фильм
     */
    static async updateMovie(id, updatedFields) {
        if (updatedFields.poster && !Array.isArray(updatedFields.poster)) {
            updatedFields.poster = [updatedFields.poster];
        }

        const updatedMovie = await this.fetchFromApi(id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        });
        return new MovieRecords(updatedMovie);
    }

    /**
     * Удаляет фильм через API
     * @param {number|string} id - ID фильма
     * @returns {Promise<object>} - Результат операции
     */
    static async deleteMovie(id) {
        await this.fetchFromApi(id, { method: 'DELETE' });
        return { success: true };
    }

    /**
     * Загружает постер фильма на сервер
     * @param {File} file - Файл постера
     * @returns {Promise<string>} - URL загруженного постера
     */
    static async uploadPoster(file) {
        const formData = new FormData();
        formData.append('poster', file);

        try {
            const response = await fetch(`${BASE_API_URL}/posters`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Ошибка загрузки постера: ${response.statusText}`);
            }

            const result = await response.json();
            return result.path; // Возвращаем путь к загруженному постеру
        } catch (error) {
            console.error('Ошибка при загрузке постера:', error);
            throw error;
        }
    }
}

export default MovieRecords;
