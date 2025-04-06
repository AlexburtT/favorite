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

export const createEditMovieForm = (movie) => {
	const inputs = inputsArray.map((inputConfig) => {
		return new Input({
			...inputConfig,
			value: movie ? movie[inputConfig.name] : "",
		});
	});
	const buttons = buttonsArray.map(
		(buttonConfig) => new Button(buttonConfig)
	);

	if (movie) {
		buttons.push(
			new Button({
				title: "Удалить",
				type: "button",
				className: "btn dialog__form--btn--delete dialog__form--btn",
				events: {
					click: () => {
						EventBus.getInstance().emit(
							EventBus.EVENTS.DELETE_MOVIE,
							{
								id: movie.id,
								poster: movie.poster,
							}
						);
					},
				},
			})
		);
	}

	return new Form({
		id: movie ? movie.id : "dialog__form",
		name: "edit--movie-form",
		className: "dialog__form",
		children: { inputs, buttons },
		eventAction: movie
			? EventBus.EVENTS.UPDATE_MOVIE
			: EventBus.EVENTS.CREATE_MOVIE,
	});
};
