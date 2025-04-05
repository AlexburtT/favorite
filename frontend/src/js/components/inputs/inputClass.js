import Block from "../../utils/Block";

class Input extends Block {
	/**
	 * Конструктор компонента Input.
	 *
	 * @param {string} [name=''] - Имя поля (обязательный параметр).
	 * @param {string} [type='text'] - Тип поля ('text', 'email', 'password', и т.д.).
	 * @param {string} [placeholder=''] - Подсказка для поля.
	 * @param {string} [className=''] - Дополнительные CSS-классы.
	 * @param {Object} [attributes={}] - Дополнительные атрибуты.
	 */
	constructor(props) {
		const { label } = props;

		const baseAttributes = {
			type: props.type || "text",
			name: props.name,
			placeholder: props.placeholder || "",
			id: props.name,
			"aria-label": props["aria-label"] || `Поле ${props.name}`,
			required: props.required,
		};

		if (props.value) {
			baseAttributes.value = props.value;
		}

		super({
			tagName: "input",
			className: props.className,
			attributes: {
				...baseAttributes,
			},
			...props,
		});

		this.props = {
			label,
			...props,
		};
	}

	render() {
		const { label, name, classNameLabel } = this.props;

		if (label) {
			const labelElement = document.createElement("label");
			labelElement.setAttribute("for", name);
			labelElement.className = classNameLabel;

			const span = document.createElement("span");
			span.textContent = label;
			span.className = "input__label--name";

			const inputElement = this.element;

			labelElement.append(span, inputElement);
			this.setContent(labelElement);
		}
		return super.render();
	}

	destroy() {
		console.log("Удаление input", this);
		super.destroy();
	}
}

export default Input;
