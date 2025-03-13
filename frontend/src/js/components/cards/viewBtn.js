import Button from "../buttons/buttonClass";

class ViewBtn extends Button {
	#movie;

	constructor({ movie = {} } = {}) {
		super({
			tagName: "button",
			title: this.#movie.viewed ? "Просмотрено" : "Не просмотрено",
			className: `btn__card--viewed ${this.#movie.viewed ? "is-viewed" : ""}`,
		});

		this.#movie = movie;
		const span = document.createElement("span");
		span.innerHTML = "&#10004;";
		this.getElement().appendChild(span);
	}

	onClick(handler) {
		this.getElement().addEventListener("click", handler);
	}
}

export default ViewBtn;
