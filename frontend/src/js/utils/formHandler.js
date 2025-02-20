import MovieRecords from "../api/apiServer";

class FormHandler {
    #movieApi;

    constructor() {
        this.#movieApi = MovieRecords.getInstance();
    }

    /**
     * Обрабатывает отправку формы создания фильма.
     * @param {HTMLFormElement} form - Элемент формы.
     * @returns {Promise<Object>} - Созданный фильм.
     */
    async handleCreateMovieForm(form) {
        try {
            const formData = new FormData(form);
            return await this.#saveFormData(formData);
        } catch (error) {
            console.error('Ошибка при создании фильма:', error.message);
            throw error;
        }
    }

    /**
     * Обрабатывает отправку формы редактирования фильма.
     * @param {HTMLFormElement} form - Элемент формы.
     * @param {Object} movie - Данные фильма.
     * @returns {Promise<Object>} - Обновленный фильм.
     */
    async handleEditMovieForm(form, movie) {
        try {
            const formData = new FormData(form);

            // Преобразуем данные формы
            const updatedFields = this.#transformFormData(formData);

            // Если передан файл постера, загружаем его
            if (formData.get('poster') instanceof File) {
                const posterPath = await this.#uploadPoster(formData.get('poster'));
                updatedFields.poster = [posterPath];
            }

            // Обновляем фильм через API
            return await this.#updateMovie(movie.id, updatedFields);
        } catch (error) {
            console.error('Ошибка при обновлении фильма:', error.message);
            throw error;
        }
    }

    /**
     * Загружает постер на сервер.
     * @param {File} file - Файл постера.
     * @returns {Promise<string>} - URL загруженного постера.
     */
    async #uploadPoster(file) {
        return await this.#movieApi.uploadPoster(file);
    }

    /**
     * Сохраняет данные формы (создание или обновление фильма).
     * @param {FormData} formData - Данные формы.
     * @returns {Promise<Object>} - Созданный или обновленный фильм.
     */
    async #saveFormData(formData) {
        const movieData = {};
        for (const [key, value] of formData.entries()) {
            movieData[key] = value;
        }

        // Преобразуем жанры в массив, если они переданы как строка
        if (movieData.genres) {
            movieData.genres = movieData.genres.split(',').map((genre) => genre.trim());
        }

        // Преобразуем год выпуска в число, если он передан как строка
        if (movieData.releaseYear) {
            movieData.releaseYear = parseInt(movieData.releaseYear, 10);
        }

        // Создаём новый фильм
        return await this.#movieApi.createMovie(movieData);
    }

    /**
     * Обновляет данные фильма через API.
     * @param {number|string} id - ID фильма.
     * @param {Object} updatedFields - Обновляемые поля.
     * @returns {Promise<Object>} - Обновленный фильм.
     */
    async #updateMovie(id, updatedFields) {
        return await this.#movieApi.updateMovie(id, updatedFields);
    }

    /**
     * Преобразует FormData в объект с корректными типами данных.
     * @param {FormData} formData - Данные формы.
     * @returns {Object} - Преобразованные данные.
     */
    #transformFormData(formData) {
        const updatedFields = {};

        for (const [key, value] of formData.entries()) {
            updatedFields[key] = value;
        }

        // Преобразуем жанры в массив
        if (updatedFields.genres) {
            updatedFields.genres = updatedFields.genres.split(',').map((genre) => genre.trim());
        }

        // Преобразуем год выпуска в число
        if (updatedFields.releaseYear) {
            updatedFields.releaseYear = parseInt(updatedFields.releaseYear, 10);
        }

        return updatedFields;
    }
}

export default FormHandler;