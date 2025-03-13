import Block from "../../utils/Block";
import FormField from "./formField";
import Button from "../buttons/buttonClass";
import eventBusT from "../../utils/EventBus";

class Form extends Block {
	#id;
	#name;
	#inputs;
	#buttons;

	/**
	 * @param {Object} params - Параметры для создания формы.
	 * @param {string} params.id - ID формы (обязательный параметр).
	 * @param {string} [params.name=''] - Имя формы.
	 * @param {Array<Object>} [params.inputs=[]] - Массив параметров для создания полей ввода.
	 * @param {Array<Object>} [params.buttons=[]] - Массив параметров для создания кнопок.
	 * @param {Object} [params.attributes={}] - Дополнительные атрибуты для <form>.
	 */
	constructor({
		id = "",
		name = "",
		inputs = [],
		buttons = [],
		className = "",
		attributes = {},
		...props
	} = {}) {
		super({
			tagName: "form",
			className: `${className}`,
			attributes: { id, name, ...attributes },
			eventBus: eventBusT,
		});

		this.#validateParams(id);
		this.#id = id;
		this.#name = name;

		this.#inputs = inputs.map((inputProps) =>
			new FormField(inputProps).render()
		);
		this.#buttons = buttons.map((buttonProps) =>
			new Button(buttonProps).render()
		);

		this.#setupForm();
	}

	#validateParams(id) {
		if (!id && typeof id !== "string") {
			throw new Error("ID формы должен быть непустой строкой");
		}
	}

	#setupForm() {
		const form = this.getElement();

		this.#inputs.forEach((input) => form.appendChild(input));

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "dialog__form--container--btn";

		this.#buttons.forEach((button) => buttonContainer.appendChild(button));
		form.appendChild(buttonContainer);

		form.addEventListener("submit", (event) => {
			event.preventDefault();

			eventBusT.emit(eventBusT.getEvents().SAVE_MOVIE, form);
		});
	}

	reset() {
		const formElement = this.getElement();
		if (formElement instanceof HTMLFormElement) {
			formElement.reset();
		}
	}
}

export default Form;
