import Button from "../buttons/buttonClass";
import Input from "../inputs/inputClass";
import EventBus from "../../utils/EventBus";
import { createEditMovieForm } from "../forms/createMovieForm";

export const searchBtnConteinerHeader = () => {
	const eventBus = EventBus.getInstance();
	eventBus.clearAllEvents();

	const blockSearchBtn = document.querySelector(".search__line");
	const inputBlock = document.querySelector(".input__conteiner");

	const search = new Input({
		className: "input input--search",
		name: "search",
		type: "search",
		placeholder: "Поиск",

		events: {
			input: (e) => {
				console.log(e.target.value);
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
					eventBus.debugEvents();
				},
			},
		}),

		new Button({
			title: "Что посмотреть?",
			className: "btn header__btn",
			events: {
				click: () => {
					console.log("Что посмотреть - здесь будет сортировка");
					//const sortForm = editMovieForm();
					eventBus.emit(EventBus.EVENTS.OPEN_DIALOG_BTN, {
						title: "Что посмотреть?",
						//children: sortForm,
					});
				},
			},
		}),
	];

	buttons.forEach((button) => {
		blockSearchBtn.append(button.getContent());
	});
};
