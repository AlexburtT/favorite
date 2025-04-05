import Dialog from "./src/js/components/dialogs/classDialog.js";
import { searchBtnConteinerHeader } from "./src/js/components/header/searchBtnBlock.js";
import { dateYearFooter } from "./src/js/dateYearFooter.js";
import { scrollTop } from "./src/js/scrollTop.js";
import MovieRecords from "./src/js/api/apiServer.js";
import normalizeMovieData from "./src/js/utils/normalizeMovieData.js";
import EventBus from "./src/js/utils/EventBus.js";
import {
	createCard,
	createCardDialog,
} from "./src/js/components/cards/createCard.js";
import { createEditMovieForm } from "./src/js/components/forms/createMovieForm.js";
import FormHandler from "./src/js/utils/formHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const eventBus = EventBus.getInstance();
		const formHandler = new FormHandler();

		dateYearFooter();
		scrollTop();
		searchBtnConteinerHeader();

		const dialog = new Dialog({});
		document.body.append(dialog.getContent());

		const movieList = document.getElementById("movies-list");

		const movieRecords = await MovieRecords.getInstance().findAll();

		movieRecords.forEach((rawMovie) => {
			const normalizeMovie = normalizeMovieData(rawMovie);
			const card = createCard(normalizeMovie);
			movieList.append(card.getContent());
		});

		//Переключение избранного
		eventBus.on(EventBus.EVENTS.TOGGLE_LIKE, async ({ id, likeBtn }) => {
			try {
				const movie = await MovieRecords.getInstance().findById(id);
				movie.favorite = !movie.favorite;
				await MovieRecords.getInstance().updateMovie(id, movie);
				likeBtn.element.classList.toggle("is-favorite");
			} catch (error) {
				console.error(error);
			}
		});

		//Переключение просмотренных
		eventBus.on(EventBus.EVENTS.TOGGLE_WATCHED, async ({ id, viewBtn }) => {
			try {
				const movie = await MovieRecords.getInstance().findById(id);
				movie.viewed = !movie.viewed;
				await MovieRecords.getInstance().updateMovie(id, movie);
				viewBtn.element.classList.toggle("is-viewed");
				viewBtn.element.textContent = movie.viewed
					? "Просмотрено"
					: "Не просмотрено";
				console.log("View in App", movie.viewed);
			} catch (error) {
				console.error(error);
			}
		});

		//Открытие диалога с карточкой
		eventBus.on(EventBus.EVENTS.OPEN_DIALOG_CARD, async ({ movie }) => {
			try {
				dialog.open({
					title: movie.name,
					children: createCardDialog(movie),
				});
				console.log("movie", movie);
			} catch (error) {
				console.error(error);
			}
		});

		//Открытие формы редактирования
		eventBus.on(EventBus.EVENTS.EDIT_MOVIE, async ({ movie }) => {
			try {
				console.log("movie in dialog", movie);
				const editForm = createEditMovieForm(movie);

				dialog.clearContent();

				dialog.open({
					title: "Редактирование фильма",
					children: editForm,
				});
			} catch (error) {
				console.error(error);
			}
		});

		//Удаление фильма из БД и карточки
		eventBus.on(EventBus.EVENTS.DELETE_MOVIE, async ({ id }) => {
			try {
				console.log("Удаляеми фильм с id", id);
				await MovieRecords.getInstance().deleteMovie(id);
				const card = movieList.querySelector(`[data-id="${id}"]`);
				card.remove();
				dialog.close();
			} catch (error) {
				console.error(error);
			}
		});

		// Сохранение созданного фильма
		eventBus.on(EventBus.EVENTS.CREATE_MOVIE, async (formElement) => {
			try {
				const createMovie =
					await formHandler.handleMovieForm(formElement);

				console.log("Фильм создан:", createMovie);
				const normalizeMovie = normalizeMovieData(createMovie);
				const card = createCard(normalizeMovie);
				movieList.append(card.getContent());
				dialog.close();
				setTimeout(() => {
					const newCard = movieList.querySelector(
						`[data-id="${createMovie.id}"]`
					);
					if (newCard) {
						newCard.scrollIntoView({
							block: "center",
							behavior: "smooth",
						});
					}
				}, 100);
			} catch (error) {
				console.error("Ошибка при создании фильма:", error.message);
			}
		});

		// eventBusT.on(eventBusT.getEvents().SAVE_MOVIE, async (formElement) => {
		//   try {
		//     const createMovie = await formHandler.handleMovieForm(formElement);
		//     console.log('Фильм создан:', createMovie);

		//     const normalizeMovie = normalizeMovieData(createMovie);
		//     const card = new Card(normalizeMovie);
		//     if (movieList) {
		//       movieList.appendChild(card.getElement());
		//     }

		//     eventBusT.emit(eventBusT.getEvents().CLOSE_DIALOG);
		//   } catch (error) {
		//     console.error('Ошибка при создании фильма:', error.message);
		//   }
		// });

		// eventBusT.on(eventBusT.getEvents().CLOSE_DIALOG, () => {
		//   console.log('Диалог закрыт, форма очищена');
		//   dialog.close();
		//   createMovieForm.reset();
		// });
	} catch (error) {
		console.error("Ошибка при загрузке фильмов:", error.message);
	}
});
