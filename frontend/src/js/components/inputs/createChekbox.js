import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";
import Input from "./inputClass";

class CheckBoxConteiner extends Block {
	constructor(genres) {
		super({
			tagName: "div",
			className: "checkbox__conteiner",
		});

		this.children = [];

		genres.forEach((genre) => {
			const checkbox = new Input({
				type: "checkbox",
				name: `genre-${genre}`,
				label: genre,
				className: "checkbox__input",
				classNameLabel: "checkbox__label",
				checked: localStorage.getItem(`genre-${genre}`) === "true",
				events: {
					change: (event) => {
						localStorage.setItem(
							`genre-${genre}`,
							event.target.checked
						);
						EventBus.getInstance().emit(
							EventBus.EVENTS.APPLY_GENRE_FILTER
						);
					},
				},
			});

			this.element.append(checkbox.getContent());
			this.children.push(checkbox);
		});
	}

	destroy() {
		console.log("Удаление дочернего контента из CheckBox", this.children);

		this.children.forEach((child) => {
			child.destroy();
		});

		this.children = [];
		super.destroy();
	}
}

export const createCheckbox = (genres) => {
	return new CheckBoxConteiner(genres);
};
