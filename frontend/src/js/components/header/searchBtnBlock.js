import EventBus from "../../utils/EventBus";
import Button from "../buttons/buttonClass";
import Input from "../inputs/inputClass";

export const searchBtnConteinerHeader = () => {
	const event = EventBus.getInstance();

	const blockSearchBtn = document.querySelector(".search__line");
	const inputBlock = document.querySelector(".input__conteiner");

	const search = new Input({
		name: "search",
		type: "search",
		placeholder: "Type something here...",
		className: "input--search",
	});

	inputBlock.append(search.getElement());

	const buttons = [
		new Button({
			title: "Добавить",
			className: "header__btn",
			type: "button",
			onClick: () => {
				event.emit(EventBus.EVENTS.OPEN_DIALOG_BTN);
			},
		}),

		new Button({
			title: "Что посмотреть?",
			type: "button",
			className: "header__btn",
			onClick: () => {
				console.log('Кнопка "Что посмотреть?" была нажата.');
			},
		}),
	];

	buttons.forEach((button) => {
		blockSearchBtn.append(button.getElement());
	});
};
