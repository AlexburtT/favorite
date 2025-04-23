class DescriptionMovie {
	constructor(movie, isDialog = false) {
		this.movie = movie;
		this.element = document.createElement("p");
		this.element.className = `card__text card__text--description ${isDialog ? "" : "is-line-clamp"}`;
		this.element.textContent = this.movie.description;
	}

	getElement() {
		return this.element;
	}
}

export default DescriptionMovie;
