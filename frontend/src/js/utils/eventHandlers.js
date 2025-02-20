import FormHandler from "./formHandler";
import DOMHelper from "./dOMHelper";
import Card from "../components/cards/classCard";

class EventHandlers {
    #formHandler;

    constructor() {
        this.#formHandler = new FormHandler();
    }

    /**
     * Добавляет обработчик отправки формы создания фильма.
     * @param {HTMLFormElement} form - Элемент формы.
     * @param {DialogController} dialogController - Контроллер диалога.
     * @param {HTMLElement} moviesList - Список карточек фильмов.
     */
    handleCreateMovieFormSubmit(form, dialogController, moviesList) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            try {
                const createdMovie = await this.#formHandler.handleCreateMovieForm(form);

                console.log('Фильм успешно создан:', createdMovie);

                // Создаём новую карточку и добавляем её в список
                const card = new Card(createdMovie).getElement();
                moviesList.appendChild(card);

                // Закрываем диалог и сбрасываем форму
                dialogController.closeDialog();
                form.reset();
            } catch (error) {
                console.error('Ошибка при создании фильма:', error.message);
            }
        });
    }

    /**
     * Добавляет обработчик отправки формы редактирования фильма.
     * @param {HTMLFormElement} form - Элемент формы.
     * @param {Object} movie - Данные фильма.
     * @param {DialogController} dialogController - Контроллер диалога.
     */
    handleEditMovieFormSubmit(form, movie, dialogController) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            try {
                const updatedMovie = await this.#formHandler.handleEditMovieForm(form, movie);

                console.log('Фильм успешно обновлён:', updatedMovie);

                // Обновляем карточку фильма
                const cardElement = document.querySelector(`[data-id="${movie.id}"]`);
                if (cardElement) {
                    DOMHelper.updateCardFromForm(cardElement, updatedMovie);
                }

                // Закрываем диалог
                dialogController.closeDialog();
            } catch (error) {
                console.error('Ошибка при обновлении фильма:', error.message);
            }
        });
    }

    /**
     * Добавляет обработчик клика на кнопке "Отмена".
     * @param {HTMLElement} button - Кнопка "Отмена".
     * @param {DialogController} dialogController - Контроллер диалога.
     */
    handleCancelClick(button, dialogController) {
        button.addEventListener('click', () => {
            console.log('Кнопка "Отмена" нажата.');
            dialogController.closeDialog();
        });
    }

    /**
     * Добавляет обработчик клика на кнопке "Удалить".
     * @param {HTMLElement} button - Кнопка "Удалить".
     * @param {Object} movie - Данные фильма.
     * @param {DialogController} dialogController - Контроллер диалога.
     */
    handleDeleteClick(button, movie, dialogController) {
        button.addEventListener('click', async () => {
            try {
                const confirmation = confirm(`Вы уверены, что хотите удалить фильм "${movie.name}"?`);
                if (!confirmation) return;

                // Удаляем фильм через API
                await this.#formHandler.deleteMovie(movie.id);

                console.log('Фильм успешно удалён.');

                // Удаляем карточку из DOM
                DOMHelper.removeElement(document.querySelector(`[data-id="${movie.id}"]`));

                // Закрываем диалог
                dialogController.closeDialog();
            } catch (error) {
                console.error('Ошибка при удалении фильма:', error.message);
            }
        });
    }

    /**
     * Добавляет обработчик клика на кнопке "Лайк".
     * @param {HTMLElement} button - Кнопка "Лайк".
     * @param {Object} movie - Данные фильма.
     */
    handleLikeButtonClick(button, movie) {
        button.addEventListener('click', async () => {
            try {
                // Инвертируем состояние favorite
                movie.favorite = !movie.favorite;

                // Обновляем внешний вид кнопки
                DOMHelper.updateButtonState(button, 'is-like', movie.favorite);

                // Обновляем данные в базе
                await this.#formHandler.updateMovie(movie.id, { favorite: movie.favorite });

                console.log(`Фильм "${movie.name}" помечен как ${movie.favorite ? 'избранный' : 'неизбранный'}.`);
            } catch (error) {
                console.error('Ошибка при обновлении состояния "Избранное":', error.message);

                // Возвращаем предыдущее состояние
                movie.favorite = !movie.favorite;
                DOMHelper.updateButtonState(button, 'is-like', movie.favorite);
            }
        });
    }

    /**
     * Добавляет обработчик клика на кнопке "Просмотрено".
     * @param {HTMLElement} button - Кнопка "Просмотрено".
     * @param {Object} movie - Данные фильма.
     */
    handleViewedButtonClick(button, movie) {
        button.addEventListener('click', async () => {
            try {
                // Инвертируем состояние viewed
                movie.viewed = !movie.viewed;

                // Обновляем внешний вид кнопки
                DOMHelper.updateButtonState(button, 'is-viewed', movie.viewed);

                // Обновляем данные в базе
                await this.#formHandler.updateMovie(movie.id, { viewed: movie.viewed });

                console.log(
                    `Фильм "${movie.name}" помечен как ${movie.viewed ? 'просмотренный' : 'непросмотренный'}.`
                );
            } catch (error) {
                console.error('Ошибка при обновлении состояния "Просмотрено":', error.message);

                // Возвращаем предыдущее состояние
                movie.viewed = !movie.viewed;
                DOMHelper.updateButtonState(button, 'is-viewed', movie.viewed);
            }
        });
    }
}

export default EventHandlers;