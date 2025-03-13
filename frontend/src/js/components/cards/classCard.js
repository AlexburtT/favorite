import MovieImage from "./imgPoster";
import TitleMovie from "./titleMovie";
import YearMovie from "./yearMovie";
import GenreMovie from "./genreMovie";
import DescriptionMovie from "./descriptionMovie";
import Block from "../../utils/Block";
import CardActions from "./cardActions";

class Card extends Block {
	#movie;

	constructor({ movie = {} } = {}) {
		super({
			tagName: "article",
			className: "card",
			attributes: {
				"data-id": movie.id,
			},
		});

		this.#movie = movie;
		this.setProps({ movie });
		this.#setupCard();
	}

	#setupCard() {
		const card = this.getElement();

		// Добавляем изображение
		const img = new MovieImage(this.#movie).getElement();
		card.appendChild(img);

		// Добавляем название фильма
		const title = new TitleMovie(this.#movie).getElement();
		card.appendChild(title);

		// Добавляем год выпуска
		const year = new YearMovie(this.#movie).getElement();
		card.appendChild(year);

		// Добавляем жанры
		const genre = new GenreMovie(this.#movie).getElement();
		card.appendChild(genre);

		// Добавляем описание
		const description = new DescriptionMovie(this.#movie).getElement();
		card.appendChild(description);

		const btns = new CardActions({ movie: this.#movie }).getElement();
		card.appendChild(btns);
	}

	componentDidUpdate(oldProps, newProps) {
		if (!oldProps || !newProps) return false;

		if (oldProps.movie.id !== newProps.movie.id) {
			this.#movie = newProps.movie;
			this.#rerenderCard();
		}
		return true;
	}

	#rerenderCard() {
		this.getElement().innerHTML = "";
		this.#setupCard();
	}
}

export default Card;
