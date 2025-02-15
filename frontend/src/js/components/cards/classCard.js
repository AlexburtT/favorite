import Button from "../buttons/buttonClass";
import GenreMovie from "./genreMovie";
import MovieImage from "./imgPoster";
import TitleMovie from "./titleMovie";
import YearMovie from "./yearMovie";

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

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'card__btns';

        const likeButtonsProps = {
            type: 'button',
            className: 'btn__like',
            svgPath: 'M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z'
        };

        const likeButton = new Button(likeButtonsProps).getElement();

        const viewButtonProps = {
            title: 'Не просмотрено',
            type: 'button',
            className: 'btn btn__card no-view',
        }

        const viewButton = new Button(viewButtonProps).getElement();
        const viewSpan = document.createElement('span');
        viewSpan.innerHTML = '&#10004;';
        viewButton.appendChild(viewSpan);

        // Добавляем кнопки в контейнер
        buttonsContainer.appendChild(likeButton);
        buttonsContainer.appendChild(viewButton);

        // Добавляем контейнер с кнопками в карточку
        card.appendChild(buttonsContainer);

        this.cardElement = card;

        return this.cardElement;
    }
    getElement() {
        return this.#element;
    }
}

export default Card;
