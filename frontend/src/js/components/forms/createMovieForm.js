import { inputsArray } from "../../constants/inputsArray";
import EventBus from "../../utils/EventBus";
import Button from "../buttons/buttonClass";
import Input from "../inputs/inputClass";
import Form from "./classForms";

const buttonsArray = [
	{
		title: "Отменить",
		type: "reset",
		className: "btn dialog__form--btn--cancel dialog__form--btn",
		events: {
			click: () => {
				EventBus.getInstance().emit(EventBus.EVENTS.CLOSE_DIALOG);
			},
		},
	},
	{
		title: "Сохранить",
		type: "submit",
		className: "btn dialog__form--btn--save dialog__form--btn",
		events: {
			click: () => {
				console.log("save");
			},
		},
	},
];

export const createMovieForm = () => {
	const inputs = inputsArray.map((inputConfig) => new Input(inputConfig));
	const buttons = buttonsArray.map(
		(buttonConfig) => new Button(buttonConfig)
	);

	return new Form({
		id: "dialog__form",
		name: "create--movie-form",
		className: "dialog__form",
		children: { inputs, buttons },
	});
};

export const createEditMovieForm = (movie) => {
	const inputs = inputsArray.map((inputConfig) => {
		console.log("Проверяю", inputConfig.name, movie[inputConfig.name]);
		return new Input({
			...inputConfig,
			value: movie[inputConfig.name] || "",
		});
	});
	const buttons = buttonsArray.map(
		(buttonConfig) => new Button(buttonConfig)
	);
	buttons.push(
		new Button({
			title: "Удалить",
			type: "button",
			className: "btn dialog__form--btn--delete dialog__form--btn",
			events: {
				click: () => {
					EventBus.getInstance().emit(EventBus.EVENTS.DELETE_MOVIE, {
						id: movie.id,
					});
				},
			},
		})
	);

	return new Form({
		id: "dialog__form",
		name: "edit--movie-form",
		className: "dialog__form",
		children: { inputs, buttons },
	});
};
