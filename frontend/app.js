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
import Button from "./src/js/components/buttons/buttonClass.js";

let allMovies = [];
const limitMovies = 8;
let displayedMovies = 0;

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const eventBus = EventBus.getInstance();
		const formHandler = new FormHandler();

		dateYearFooter();
		scrollTop();
		searchBtnConteinerHeader();

		const dialog = new Dialog({});
		document.body.append(dialog.getContent());

		const mainConteiner = document.querySelector(".main");
		const movieList = document.getElementById("movies-list");

		//Получение всех фильмов
		const movieRecords = await MovieRecords.getInstance().findAll();
		allMovies = movieRecords;

		const renderMovies = (movies) => {
			movies.forEach((rawMovie) => {
				const normalizeMovie = normalizeMovieData(rawMovie);
				const card = createCard(normalizeMovie);
				movieList.append(card.getContent());
			});
		};

		const initMovies = allMovies.slice(0, limitMovies);
		renderMovies(initMovies);

		displayedMovies += initMovies.length;

		//Получение следующих фильмов
		const btnMore = new Button({
			type: "button",
			className: "btn btn-more",
			title: "Показать еще",
			events: {
				click: async () => {
					const nextMovies = allMovies.slice(
						displayedMovies,
						displayedMovies + limitMovies
					);
					renderMovies(nextMovies);
					displayedMovies += nextMovies.length;

					if (displayedMovies >= allMovies.length) {
						btnMore.element.remove();
					}
				},
			},
		});

		mainConteiner.append(btnMore.getContent());

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
		eventBus.on(
			EventBus.EVENTS.OPEN_DIALOG_FORM_EDIT,
			async ({ movie }) => {
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
			}
		);

		//Удаление фильма из БД и карточки
		eventBus.on(EventBus.EVENTS.DELETE_MOVIE, async ({ id, poster }) => {
			try {
				console.log("Удаляеми фильм с id", id, poster);
				await MovieRecords.getInstance().deletePoster(poster[0]);
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

		// Сохранение измененного фильма
		eventBus.on(EventBus.EVENTS.UPDATE_MOVIE, async (formElement) => {
			try {
				const movieId = formElement.id;
				const updateMovie = await formHandler.handleMovieForm(
					formElement,
					movieId
				);
				console.log("Фильм обновлен:", updateMovie, movieId);
				const normalizeMovie = normalizeMovieData(updateMovie);
				const card = createCard(normalizeMovie);
				const oldCard = movieList.querySelector(
					`[data-id="${updateMovie.id}"]`
				);
				oldCard.replaceWith(card.getContent());
				dialog.close();
			} catch (error) {
				console.error("Ошибка при обновлении фильма:", error.message);
			}
		});

		// Поиск фильма
		eventBus.on(EventBus.EVENTS.SEARCH, async (value) => {
			try {
				console.log("Поиск фильма:", value);
				movieList.innerHTML = "";

				if (!value.trim()) {
					const initMovies = allMovies.slice(0, limitMovies);
					renderMovies(initMovies);
					displayedMovies += initMovies.length;

					if (!mainConteiner.contains(btnMore.element)) {
						mainConteiner.append(btnMore.getContent());
					}
					return;
				}

				const queries = value.toLowerCase();
				const filteredMovies = allMovies.filter((movie) =>
					movie.name.toLowerCase().includes(queries)
				);
				renderMovies(filteredMovies);

				if (mainConteiner.contains(btnMore.element)) {
					btnMore.element.remove();
				}
			} catch (error) {
				console.error("Ошибка при поиске фильмов:", error.message);
			}
		});
	} catch (error) {
		console.error("Ошибка при загрузке фильмов:", error.message);
	}
});
