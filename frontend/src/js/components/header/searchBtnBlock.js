import Button from "../buttons/buttonClass";
import Input from "../inputs/inputClass";
import EventBus from "../../utils/EventBus";
import { createEditMovieForm } from "../forms/createMovieForm";
import { createCheckbox } from "../inputs/createChekbox";
import { getUniqueGenres } from "../../utils/sorted";

export const searchBtnConteinerHeader = (allMovies) => {
	const eventBus = EventBus.getInstance();

	const blockSearchBtn = document.querySelector(".search__line");
	const inputBlock = document.querySelector(".input__conteiner");

	const search = new Input({
		className: "input input--search",
		name: "search",
		type: "search",
		placeholder: "Поиск",

		events: {
			input: (e) => {
				eventBus.emit(EventBus.EVENTS.SEARCH, e.target.value);
			},
		},
	});

	inputBlock.append(search.getContent());

	const buttons = [
		new Button({
			title: "Добавить",
			className: "btn header__btn",
			events: {
				click: () => {
					const formDialog = createEditMovieForm();
					eventBus.emit(EventBus.EVENTS.OPEN_DIALOG_BTN, {
						title: "Добавить фильм",
						children: formDialog,
					});
					//eventBus.debugEvents();
				},
			},
		}),

		new Button({
			title: "Что посмотреть?",
			className: "btn header__btn",
			events: {
				click: () => {
					const uniqueGenres = getUniqueGenres(allMovies);
					const sortForm = createCheckbox(uniqueGenres);
					eventBus.emit(EventBus.EVENTS.OPEN_DIALOG_BTN, {
						title: "Что посмотреть?",
						children: sortForm,
					});
				},
			},
		}),
	];

	buttons.forEach((button) => {
		blockSearchBtn.append(button.getContent());
	});
};
