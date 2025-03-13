import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";

class Button extends Block {
	/**
	 * @param {string} [title=''] - Текст кнопки.
	 * @param {string} [type='button'] - Тип кнопки ('button', 'submit', 'reset').
	 * @param {string|null} [svgPath=null] - Путь SVG-иконки.
	 * @param {string} [className=''] - Дополнительные CSS-классы.
	 * @param {Function} [onClick=null] - Пользовательский обработчик клика.
	 */
	constructor({
		title = "",
		type = "button",
		svgPath = null,
		className = "",
		onClick = null,
		...props
	} = {}) {
		super({
			tagName: "button",
			className: `btn ${className}`,
			attributes: { type },
			eventBus: EventBus.getInstance(),
			...props,
		});

		this.#setupContent(title, svgPath);
		this.#validateParams(type);

		if (typeof onClick === "function") {
			this.on("click", onClick);
		}
	}

	#setupContent(title, svgPath) {
		const element = this.getElement();

		if (svgPath) {
			const svg = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"svg"
			);
			svg.setAttribute("width", "24");
			svg.setAttribute("height", "24");
			svg.setAttribute("viewBox", "0 0 24 24");
			svg.setAttribute("fill", "none");

			const path = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"path"
			);
			path.setAttribute("d", svgPath);
			path.setAttribute("stroke-width", "2");
			path.setAttribute("stroke-linecap", "round");
			path.setAttribute("stroke-linejoin", "round");
			path.setAttribute("stroke", "currentColor");

			svg.appendChild(path);
			element.appendChild(svg);
		} else if (title) {
			element.textContent = title;
		}
	}

	#validateParams(type) {
		if (!["button", "submit", "reset"].includes(type)) {
			throw new Error(
				"Недопустимый тип кнопки! Допустимые значения: button, submit, reset."
			);
		}
	}

	render() {
		super.render();
		return this.getElement();
	}
}

export default Button;
