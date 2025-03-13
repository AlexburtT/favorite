class TitleMovie {
	#movie;
	#element;
	constructor(movie) {
		this.#movie = movie;
		this.#element = document.createElement("h1");
		this.#element.className = "card__title";
		this.#element.textContent = this.#movie.name;
	}

	getElement() {
		return this.#element;
	}
}

export default TitleMovie;
