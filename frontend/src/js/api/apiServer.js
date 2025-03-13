import { BASE_API_URL } from "../constants/apiUrlConstant.js";

class MovieRecords {
	static #instance = null;
	static cache = {};

	/**
	 * Возвращаем единственный экземпляр класса.
	 * @returns {MovieRecords} - Единственный экземпляр.
	 */
	static getInstance() {
		if (!MovieRecords.#instance) {
			MovieRecords.#instance = new MovieRecords();
		}
		return MovieRecords.#instance;
	}

	/**
	 * Выполняем запрос к API
	 * @param {string} endpoint - Конечная точка (например, ID фильма)
	 * @param {object} options - Опции запроса (метод, заголовки, тело)
	 * @returns {Promise<any>} - Ответ от сервера
	 */
	async fetchFromApi(endpoint = "", options = {}) {
		const url = `${BASE_API_URL}/movies${endpoint ? `/${endpoint}` : ""}`;
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(
					`Ошибка HTTP ${response.status}: ${response.statusText}`
				);
			}
			return await response.json();
		} catch (error) {
			console.error(
				`Ошибка при выполнении запроса к API (${url}):`,
				error.message || error
			);
			throw error;
		}
	}

	/**
	 * Получаем все фильмы из API
	 * @returns {Promise<Object[]>} - Массив фильмов.
	 */
	async findAll() {
		if (MovieRecords.cache["allMovies"]) {
			console.log("Фильмы взяты из кэша");
			return MovieRecords.cache["allMovies"];
		}

		const data = await this.fetchFromApi();
		MovieRecords.cache["allMovies"] = data;
		return data;
	}

	/**
	 * Получаем фильм по ID из API
	 * @param {number|string} id - ID фильма
	 * @returns {Promise<Object>} - Фильм.
	 */
	async findById(id) {
		return await this.fetchFromApi(id);
	}

	/**
	 * Создаем новый фильм через API
	 * @param {Object} newMovieData - Данные нового фильма.
	 * @returns {Promise<Object>} - Созданный фильм.
	 */
	async createMovie(newMovieData) {
		return this.#handleMovieRequest(newMovieData, "POST");
	}

	/**
	 * Обновляем данные фильма через API
	 * @param {number|string} id - ID фильма.
	 * @param {Object} updatedFields - Обновляемые поля.
	 * @returns {Promise<Object>} - Обновленный фильм.
	 */
	async updateMovie(id, updatedFields) {
		return this.#handleMovieRequest({ ...updatedFields, id }, "PATCH");
	}

	async #handleMovieRequest(movieData, method) {
		const { id, genres, releaseYear, poster, viewed, favorite } = movieData;

		if (genres && typeof genres === "string") {
			movieData.genres = genres.split(",").map((genre) => genre.trim());
		}

		if (releaseYear && typeof releaseYear === "string") {
			movieData.releaseYear = parseInt(releaseYear, 10);
		}

		if (poster && !Array.isArray(poster)) {
			movieData.poster = [poster];
		}

		movieData.viewed = Boolean(viewed);
		movieData.favorite = Boolean(favorite);

		const requestOptions = {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(movieData),
		};

		const movie = await this.fetchFromApi(id, requestOptions);

		if (method === "POST" && MovieRecords.cache["allMovies"]) {
			MovieRecords.cache["allMovies"].push(movie);
		} else if (id && MovieRecords.cache["allMovies"]) {
			const index = MovieRecords.cache["allMovies"].findIndex(
				(movie) => movie.id === id
			);
			if (index !== -1) {
				MovieRecords.cache["allMovies"][index] = movie;
			}
		}

		return movie;
	}

	/**
	 * Удаляем фильм через API
	 * @param {number|string} id - ID фильма.
	 * @returns {Promise<boolean>} - Результат удаления.
	 */
	async deleteMovie(id) {
		await this.fetchFromApi(id, { method: "DELETE" });

		if (MovieRecords.cache["allMovies"]) {
			MovieRecords.cache["allMovies"] = MovieRecords.cache[
				"allMovies"
			].filter((movie) => movie.id !== id);
		}

		return { success: true };
	}

	/**
	 * Загружаем постер фильма на сервер
	 * @param {File} file - Файл постера
	 * @returns {Promise<string>} - URL загруженного постера
	 */
	async uploadPoster(file) {
		const formData = new FormData();
		formData.append("poster", file);

		try {
			const response = await fetch(`${BASE_API_URL}/posters`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(
					`Ошибка загрузки постера: ${response.statusText}`
				);
			}

			const result = await response.json();
			return `${BASE_API_URL}${result.path}`;
		} catch (error) {
			console.error("Ошибка при загрузке постера:", error);
			throw error;
		}
	}
}

export default MovieRecords;
