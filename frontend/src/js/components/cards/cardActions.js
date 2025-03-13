import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";
import ViewBtn from "./viewBtn";
import LikeBtn from "./likeBtn";

class CardActions extends Block {
	#movie;

	constructor({ movie = {} } = {}) {
		super({
			tagName: "div",
			className: "card__btns--container",
			eventBus: EventBus,
		});

		this.#movie = movie;
		this.$setupCardActions();
	}

	$setupCardActions() {
		const btnsContainer = this.getElement();

		const likeButton = new LikeBtn({ movie: this.#movie });
		likeButton.onClick(() => {
			EventBus.emit(EventBus.events.TOGGLE_LIKE, { id: this.#movie.id });
		});
		btnsContainer.appendChild(likeButton.getElement());

		const viewButton = new ViewBtn({ movie: this.#movie });
		viewButton.onClick(() => {
			EventBus.emit(EventBus.events.TOGGLE_VIEW, { id: this.#movie.id });
		});
		btnsContainer.appendChild(viewButton.getElement());
	}

	updateFavoriteStatus(favorite) {
		const likeButton = this.getElement().querySelector(
			".btn__like--favorite"
		);
		if (likeButton) {
			likeButton.classList.toggle("is-favorite", favorite);
		}
	}

	updateViewedStatus(viewed) {
		const viewButton =
			this.getElement().querySelector(".btn__card--viewed");
		if (viewButton) {
			viewButton.classList.toggle("is-viewed", viewed);
		}
	}
}

export default CardActions;
