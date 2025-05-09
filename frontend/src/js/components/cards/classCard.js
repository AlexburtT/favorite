import Block from "../../utils/Block";

class Card extends Block {
	constructor(props) {
		super({
			tagName: "article",
			className: `${props.className || "card"}`,
			attributes: {
				"data-id": props.movie?.id,
			},
			...props,
		});

		this.children = props.children;
	}

	render() {
		const card = this.element;

		const { image, title, year, genre, description, buttons } =
			this.props.children;

		if (image) card.append(image.getElement());
		if (title) card.append(title.getElement());
		if (year) card.append(year.getElement());
		if (genre) card.append(genre.getElement());
		if (description) card.append(description.getElement());

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "card__btn--container";

		buttons.forEach((buttonElement) => {
			buttonContainer.append(buttonElement.getContent());
		});
		card.appendChild(buttonContainer);

		return super.render();
	}

	destroy() {
		//console.log("Удаление дочернего контента из карточки", this.children);

		const { buttons } = this.children;

		[...buttons].forEach((child) => {
			child.destroy();
		});

		this.children = [];
		super.destroy();
	}
}

export default Card;
