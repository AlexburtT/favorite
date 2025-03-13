class GenreMovie {
	#movie;
	#element;

	constructor(movie) {
		this.#movie = movie;
		this.#element = document.createElement("p");
		this.#element.className = "card__text card__text--genre";
		this.#element.textContent = this.#movie.genres.join(", ");
	}

	getElement() {
		return this.#element;
	}
}

export default GenreMovie;
