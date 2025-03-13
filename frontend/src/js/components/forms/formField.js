import Block from "../../utils/Block";
import Input from "../inputs/inputClass";

class FormField extends Block {
	#input;

	/**
	 * @param {Object} params - Параметры для создания поля ввода с меткой.
	 * @param {string} [params.label=''] - Текст метки.
	 * @param {string} [params.name=''] - Имя поля (обязательный параметр).
	 * @param {string} [params.type='text'] - Тип поля ('text', 'email', 'password', и т.д.).
	 * @param {string} [params.placeholder=''] - Подсказка для поля.
	 */

	constructor({
		label = "",
		name = "",
		type = "text",
		placeholder = "",
		attributes = {},
		classNameInput = "",
		classNameLabel = "",
	} = {}) {
		super({
			tagName: "label",
			className: classNameLabel ? `${classNameLabel}` : "",
			attributes: { ...attributes },
		});

		this.#validateParams(label, name);

		const span = document.createElement("span");
		span.textContent = label;
		span.className = "input__label--name";
		this.getElement().appendChild(span);

		this.#input = new Input({
			name,
			type,
			placeholder,
			attributes: { ...attributes },
			className: classNameInput,
		}).getElement();

		this.getElement().appendChild(this.#input);
		this.getElement().setAttribute("for", name);
	}

	#validateParams(label, name) {
		if (!label || typeof label !== "string") {
			throw new Error("Текст метки должен быть непустой строкой.");
		}

		if (!name || typeof name !== "string") {
			throw new Error("Имя поля должно быть непустой строкой.");
		}
	}
}

export default FormField;
