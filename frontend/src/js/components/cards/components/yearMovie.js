class YearMovie {
	constructor(movie) {
		this.movie = movie;
		this.element = document.createElement("p");
		this.element.className = "card__description--year";
		this.element.textContent = this.movie.releaseYear;
	}
	getElement() {
		return this.element;
	}
}

export default YearMovie;
