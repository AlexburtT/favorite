class DescriptionMovie {
    #movie;
    #element;

    constructor(movie) {
        this.#movie = movie;
        this.#element = document.createElement('p');
        this.#element.className = 'card__text card__text--description';
        this.#element.textContent = this.#movie.description;
    }

    getElement() {
        return this.#element;
    }
}

export default DescriptionMovie;