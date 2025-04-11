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
import { createFilterBtns, filterByGenre } from "./src/js/utils/sorted.js";

let allMovies = [];
window.limitMovies = 8;
window.displayedMovies = 0;

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const eventBus = EventBus.getInstance();
		eventBus.clearAllEvents();
		const formHandler = new FormHandler();

		dateYearFooter();
		scrollTop();

		const mainConteiner = document.querySelector(".main");
		const movieList = document.getElementById("movies-list");

		//Получение всех фильмов
		const movieRecords = await MovieRecords.getInstance().findAll();
		allMovies = movieRecords;

		const resetLocalStorage = () => {
			localStorage.clear();
		};
		resetLocalStorage();

		const dialog = new Dialog({});
		document.body.append(dialog.getContent());

		const allMoviesProxy = new Proxy(allMovies, {
			set(target, prop, value, receiver) {
				Reflect.set(target, prop, value, receiver);

				console.log("Масив после изменения allMovies", allMovies);
				return true;
			},
		});

		allMovies = allMoviesProxy;
		console.log("allMovies при инициализации", allMovies);

		searchBtnConteinerHeader(allMovies);

		//Рендер фильмов
		const cardInstanses = [];

		const renderMovies = (movies, append = false) => {
			if (!append) {
				const cards = movieList.querySelectorAll(".card");
				cards.forEach((card) => {
					const cardInstanse = cardInstanses[card.dataset.id];

					if (cardInstanse) {
						cardInstanse.destroy();
						delete cardInstanses[card.dataset.id];
					}
				});

				movieList.innerHTML = "";
			}

			movies.forEach((rawMovie) => {
				const normalizeMovie = normalizeMovieData(rawMovie);
				const existCard = movieList.querySelector(
					`[data-id="${normalizeMovie.id}"]`
				);

				if (!existCard) {
					const card = createCard(normalizeMovie);
					movieList.append(card.getContent());
					cardInstanses[normalizeMovie.id] = card;
				}
			});
		};

		window.renderMovies = renderMovies;

		const initMovies = allMovies.slice(0, window.limitMovies);
		renderMovies(initMovies);

		window.displayedMovies += initMovies.length;

		//Получение следующих фильмов
		const btnMore = new Button({
			type: "button",
			className: "btn btn-more",
			title: "Показать еще",
			events: {
				click: async () => {
					console.log(
						"window.displayedMovies",
						window.displayedMovies
					);
					console.log(
						"allMovies при нажатии кнопки показать еще",
						allMovies
					);
					const nextMovies = allMovies.slice(
						window.displayedMovies,
						window.displayedMovies + window.limitMovies
					);

					console.log("nextMovies", nextMovies);
					renderMovies(nextMovies, true);
					window.displayedMovies += nextMovies.length;

					if (window.displayedMovies >= allMovies.length) {
						btnMore.element.remove();
					}
				},
			},
		});

		mainConteiner.append(btnMore.getContent());

		//Кнопки фильтрации фильмов Избранные и просмотренные
		const { btnViewed, btnFavorite } = createFilterBtns(allMovies, btnMore);
		const conteinerBtn = document.createElement("div");
		conteinerBtn.className = "logo__conteiner--filter";
		conteinerBtn.append(btnViewed.getContent(), btnFavorite.getContent());
		const conteiner = document.querySelector(".logo__conteiner");
		conteiner.append(conteinerBtn);

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

		// Сохранение созданного фильма
		eventBus.on(EventBus.EVENTS.CREATE_MOVIE, async (formElement) => {
			try {
				const createMovie =
					await formHandler.handleMovieForm(formElement);

				console.log("createMovie in save", createMovie);

				const normalizeMovie = normalizeMovieData(createMovie);
				console.log("normalizeMovie in save", normalizeMovie);
				const card = createCard(normalizeMovie);
				movieList.insertAdjacentElement(
					"afterbegin",
					card.getContent()
				);

				allMovies.splice(0, 0, normalizeMovie);

				dialog.close();

				console.log("Фильм сохранен", allMovies);
			} catch (error) {
				console.error("Ошибка при создании фильма:", error.message);
			}
		});

		//Удаление фильма из БД и карточки
		eventBus.on(EventBus.EVENTS.DELETE_MOVIE, async ({ id, poster }) => {
			try {
				console.log("Удаляеми фильм с id", id, poster);
				await MovieRecords.getInstance().deletePoster(poster[0]);
				await MovieRecords.getInstance().deleteMovie(id);

				const card = movieList.querySelector(`[data-id="${id}"]`);
				card.remove();

				const index = allMovies.findIndex((movie) => movie.id === id);
				console.log("index", index);
				if (index !== -1) {
					allMovies.splice(index, 1);
				}

				window.displayedMovies = Math.min(
					allMovies.length,
					window.limitMovies
				);

				if (movieList.children.length === 0) {
					const initMovies = allMovies.slice(0, window.limitMovies);
					renderMovies(initMovies, false);

					if (allMovies.length > window.limitMovies) {
						mainConteiner.append(btnMore.getContent());
					}
				}
				console.log("allMovies после удаления", allMovies, id);

				dialog.close();
			} catch (error) {
				console.error(error);
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

		//Сортировка по жанрам
		eventBus.on(EventBus.EVENTS.APPLY_GENRE_FILTER, async () => {
			try {
				const hasActiveChecked = Array.from(
					document.querySelectorAll(".checkbox__input")
				).some((checkbox) => checkbox.checked);

				if (!hasActiveChecked) {
					window.displayedMovies = 0;
					const initMovies = allMovies.slice(0, window.limitMovies);
					renderMovies(initMovies, false);
					window.displayedMovies += initMovies.length;

					if (!mainConteiner.contains(btnMore.element)) {
						mainConteiner.append(btnMore.getContent());
					}
					return;
				}

				const filteredMovies = filterByGenre(allMovies);
				renderMovies(filteredMovies, false);
				console.log("filteredMovies", filteredMovies);

				if (mainConteiner.contains(btnMore.element)) {
					btnMore.element.remove();
				}
			} catch (error) {
				console.error(error);
			}
		});

		// Поиск фильма
		eventBus.on(EventBus.EVENTS.SEARCH, async (value) => {
			try {
				if (!value.trim()) {
					window.displayedMovies = 0;
					const initMovies = allMovies.slice(0, window.limitMovies);
					renderMovies(initMovies, false);
					window.displayedMovies += initMovies.length;

					if (!mainConteiner.contains(btnMore.element)) {
						mainConteiner.append(btnMore.getContent());
					}
					return;
				}

				const queries = value.toLowerCase();
				const filteredMovies = allMovies.filter((movie) =>
					movie.name.toLowerCase().includes(queries)
				);
				renderMovies(filteredMovies, false);

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
