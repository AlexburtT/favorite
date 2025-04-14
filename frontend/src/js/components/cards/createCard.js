import TitleMovie from "./components/titleMovie";
import MovieImage from "./components/imgPoster";
import YearMovie from "./components/yearMovie";
import GenreMovie from "./components/genreMovie";
import DescriptionMovie from "./components/descriptionMovie";

import Card from "./classCard";
import Button from "../buttons/buttonClass";
import EventBus from "../../utils/EventBus";

export const createCard = (movie) => {
	const likeBtn = new Button({
		className: `btn__like--favorite ${movie.favorite ? "is-favorite" : ""}`,
		["aria-label"]: movie.favorite
			? "Удалить из избранного"
			: "Добавить в избранное",
		svgPath:
			"M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z",
		events: {
			click: () => {
				EventBus.getInstance().emit(EventBus.EVENTS.TOGGLE_LIKE, {
					id: movie.id,
					likeBtn,
				});
			},
		},
	});

	const viewBtn = new Button({
		title: movie.viewed ? "Просмотрено" : "Не просмотрено",
		className: `btn btn__card--viewed ${movie.viewed ? "is-viewed" : ""}`,
		events: {
			click: () => {
				EventBus.getInstance().emit(EventBus.EVENTS.TOGGLE_WATCHED, {
					id: movie.id,
					viewBtn,
				});
			},
		},
	});

	const card = new Card({
		movie,
		children: {
			image: new MovieImage(movie),
			title: new TitleMovie(movie),
			year: new YearMovie(movie),
			genre: new GenreMovie(movie),
			description: new DescriptionMovie(movie),
			buttons: [likeBtn, viewBtn],
		},
		events: {
			click: (e) => {
				if (
					likeBtn.element.contains(e.target) ||
					viewBtn.element.contains(e.target)
				)
					return;
				EventBus.getInstance().emit(EventBus.EVENTS.OPEN_DIALOG_CARD, {
					movie,
				});
			},
		},
	});

	return card;
};

export const createCardDialog = (movie) => {
	const buttonsArray = [
		{
			title: "Отмена",
			type: "button",
			className: "btn dialog__form--btn cancel",
			events: {
				click: () => {
					EventBus.getInstance().emit(EventBus.EVENTS.CLOSE_DIALOG);
				},
			},
		},
		{
			title: "Редактировать",
			type: "button",
			className: "btn dialog__form--btn edit",
			events: {
				click: () => {
					EventBus.getInstance().emit(
						EventBus.EVENTS.OPEN_DIALOG_FORM_EDIT,
						{
							movie,
						}
					);
				},
			},
		},
	];

	const buttons = buttonsArray.map(
		(buttonConfig) => new Button(buttonConfig)
	);

	const card = new Card({
		movie,
		className: "card is-dialog",
		children: {
			image: new MovieImage(movie),
			year: new YearMovie(movie),
			genre: new GenreMovie(movie),
			description: new DescriptionMovie(movie, true),
			buttons: buttons,
		},
	});

	return card;
};
