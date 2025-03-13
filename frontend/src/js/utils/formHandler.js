import MovieRecords from "../api/apiServer";

class FormHandler {
	#movieApi;

	constructor() {
		this.#movieApi = MovieRecords.getInstance();
	}

	/**
	 * Обрабатывает отправку формы создания или редактирования фильма.
	 * @param {HTMLFormElement} form - Элемент формы.
	 * @param {number|string|null} movieId - ID фильма (если null, создаем новый фильм).
	 * @returns {Promise<Object>} - Созданный или обновленный фильм.
	 */
	async handleMovieForm(form, movieId = null) {
		try {
			const formData = new FormData(form);

			// Если есть файл постера, загружаем его
			if (formData.get("poster") instanceof File) {
				const posterPath = await this.#uploadPoster(
					formData.get("poster")
				);
				formData.set("poster", posterPath); // Устанавливаем путь к постеру в форму
			}

			// Преобразуем FormData в обычный объект
			const movieData = Object.fromEntries(formData.entries());

			// Если movieId не указан, создаем новый фильм
			if (movieId === null) {
				return await this.#movieApi.createMovie(movieData);
			}

			// Иначе обновляем существующий фильм
			return await this.#movieApi.updateMovie(movieId, movieData);
		} catch (error) {
			console.error("Ошибка при обработке формы:", error.message);
			throw error;
		}
	}

	/**
	 * Загружает постер на сервер.
	 * @param {File} file - Файл постера.
	 * @returns {Promise<string>} - URL загруженного постера.
	 */
	async #uploadPoster(file) {
		try {
			return await this.#movieApi.uploadPoster(file);
		} catch (error) {
			console.error("Ошибка при загрузке постера:", error.message);
			throw error;
		}
	}
}

export default FormHandler;
