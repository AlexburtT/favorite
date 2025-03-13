import Dialog from "./src/js/components/dialogs/classDialog.js";
import EventBus from "./src/js/utils/EventBus.js";

import { dateYearFooter } from "./src/js/dateYearFooter.js";
import { scrollTop } from "./src/js/scrollTop.js";

import { searchBtnConteinerHeader } from "./src/js/components/header/searchBtnBlock.js";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const eventBus = EventBus.getInstance();

		dateYearFooter();
		scrollTop();
		searchBtnConteinerHeader();

		const movieList = document.getElementById("movies-list");
		// const movieRecords = await MovieRecords.getInstance().findAll();

		// movieRecords.forEach((rawMovie) => {
		//   const normalizeMovie = normalizeMovieData(rawMovie);
		//   const card = new Card({ movie: normalizeMovie });
		//   movieList.appendChild(card.getElement());
		// });

		// const createMovieForm = new CreateMovieForm();

		const dialog = new Dialog({
			title: "Создание закладки",
			// contentInstance: createMovieForm,
			attributes: { id: "create-movie" },
		});

		document.body.append(dialog.getElement());

		eventBus.on(EventBus.EVENTS.OPEN_DIALOG_BTN, () => {
			console.log('Открываем диалог "Создание фильма".');
			dialog.open(); // Просто открываем диалог
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

		//  eventBusT.on(eventBusT.getEvents().TOGGLE_LIKE, async ({ id }) => {
		//     try {
		//       const movie = await MovieRecords.getInstance().findById(id);
		//       movie.favorite = !movie.favorite;
		//       await MovieRecords.getInstance().updateMovie(id, movie);

		//       const card = movieList.querySelector(`[data-id="${id}"]`);
		//       if (card) {
		//         const cardButtons = new CardButtons({ movie });
		//         card.querySelector('.card__btns--container').replaceWith(cardButtons.getElement());
		//         cardButtons.updateFavoriteStatus(movie.favorite);
		//       }
		//     } catch (error) {
		//       console.error('Ошибка при переключении лайка:', error.message);
		//     }
		//   });
	} catch (error) {
		console.error("Ошибка при загрузке фильмов:", error.message);
	}
});
