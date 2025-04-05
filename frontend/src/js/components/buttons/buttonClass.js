import Block from "../../utils/Block";
class Button extends Block {
	/**
	 * @param {Object} props - параметры для создания кнопки.
	 * @param {string} [props.className] - класс кнопки.
	 * @param {string} [props.type="button"] - тип кнопки.
	 * @param {string} [props.id] - ID кнопки.
	 * @param {string} [props.label] - метка кнопки.
	 * @param {...Object} [props] - остальные параметры.
	 */

	constructor(props) {
		super({
			tagName: "button",
			className: props.className,
			attributes: {
				type: props.type || "button",
				"aria-label": `Кнопка ${props["aria-label"] || props.title}`,
			},
			...props,
		});
	}

	/**
	 * Renders the button element with optional SVG or text content.
	 * If `svgPath` is provided in the properties, it appends an SVG element with a path.
	 * If `title` is provided in the properties, it sets the button's text content.
	 */

	render() {
		const btn = this.element;

		if (this.props.svgPath) {
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
			path.setAttribute("d", this.props.svgPath);
			path.setAttribute("stroke-width", "2");
			path.setAttribute("stroke-linecap", "round");
			path.setAttribute("stroke-linejoin", "round");
			path.setAttribute("stroke", "currentColor");
			svg.appendChild(path);
			btn.append(svg);
		} else if (this.props.title) {
			btn.textContent = this.props.title;
		}

		return super.render();
	}

	destroy() {
		console.log("Удаление кнопки", this);
		super.destroy();
	}
}

export default Button;
