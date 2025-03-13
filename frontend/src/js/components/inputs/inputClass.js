import Block from "../../utils/Block";

class Input extends Block {
	#name;

	/**
	 * Конструктор компонента Input.
	 *
	 * @param {string} [name=''] - Имя поля (обязательный параметр).
	 * @param {string} [type='text'] - Тип поля ('text', 'email', 'password', и т.д.).
	 * @param {string} [placeholder=''] - Подсказка для поля.
	 * @param {string} [className=''] - Дополнительные CSS-классы.
	 * @param {Object} [attributes={}] - Дополнительные атрибуты.
	 */
	constructor({
		name = "",
		type = "text",
		placeholder = "",
		className = "",
		attributes = {},
	} = {}) {
		super({
			tagName: "input",
			className: `input ${className}`,
			attributes: { name, type, placeholder, id: name, ...attributes },
		});

		this.#validateParams(name, type);
		this.#name = name;

		this.#setupInput();
	}

	#validateParams(name, type) {
		if (!name) {
			throw new Error("Название поля не может быть пустым.");
		}

		const input = document.createElement("input");
		input.type = type;
		if (input.type !== type) {
			throw new Error(`Некорректный тип поля: "${type}".`);
		}
	}

	#setupInput() {
		const element = this.getElement();

		if (!element.id && this.props.attributes.id) {
			element.id = this.props.attributes.id;
		}
	}

	setValue(value) {
		this.getElement().value = value;
	}

	getValue() {
		return this.getElement().value;
	}

	onChange(handler) {
		if (typeof handler !== "function") {
			throw new Error("Обработчик должен быть функцией.");
		}
		this.on("input", handler);
	}

	// Переопределение метода render для добавления специфичной логики
	render() {
		super.render();
		return this.getElement();
	}

	// Метод для очистки значения поля
	clearValue() {
		this.setValue("");
	}

	// Метод для проверки заполненности поля
	isEmpty() {
		return !this.getValue().trim();
	}
}

export default Input;
