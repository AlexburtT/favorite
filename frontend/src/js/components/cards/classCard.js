import DescriptionMovie from "./descriptionMovie";
import GenreMovie from "./genreMovie";
import MovieImage from "./imgPoster";
import TitleMovie from "./titleMovie";
import YearMovie from "./yearMovie";
import { createCardButtons } from "../buttons/btnUttils";

class Card {
    #movie;
    #element;
    constructor(movie) {
        this.#movie = movie;
        this.#element = this.#creatCardElement();
    }

    #creatCardElement() {
        const card = document.createElement('article');
        card.className = 'card';
        card.dataset.id = this.#movie.id;

        const img = new MovieImage(this.#movie).getElement();
        card.appendChild(img);

        const title = new TitleMovie(this.#movie).getElement();
        card.appendChild(title);

        const year = new YearMovie(this.#movie).getElement();
        card.appendChild(year);

        const genre = new GenreMovie(this.#movie).getElement();
        card.appendChild(genre);

        const description = new DescriptionMovie(this.#movie).getElement();
        card.appendChild(description);

        const buttonsContainer = createCardButtons(this.#movie);   
        card.appendChild(buttonsContainer);

        this.cardElement = card;

        return this.cardElement;
    }
    getElement() {
        return this.#element;
    }
}

export default Card;
