import MovieRecords from "../api/apiServer";
import DialogController from "./classDialogController";
import { createDialogCardButtons } from "../components/buttons/btnUttils";

class CardController {
	#element;
	#movie;
	#dialogController;

	/**
	 * @param {HTMLElement} element - Элемент карточки фильма.
	 * @param {Object} movie - Данные фильма.
	 * @param {DialogController} dialogController - Контроллер общего диалога.
	 */
	constructor(element, movie, dialogController) {
		if (!(element instanceof HTMLElement)) {
			throw new Error("Element is not HTMLElement");
		}

		this.#element = element;
		this.#movie = movie;
		this.#dialogController = dialogController;

		this.#addEventListeners();
	}

	#addEventListeners() {
		// Кнопка "Лайк"
		const likeButton = this.#element.querySelector(".btn__like--favorite");
		if (likeButton) {
			likeButton.addEventListener("click", async () => {
				await this.#toggleState("favorite", likeButton, "is-favorite");
			});
		}

		// Кнопка "Просмотрено"
		const viewedButton = this.#element.querySelector(".btn__card--viewed");
		if (viewedButton) {
			viewedButton.addEventListener("click", async () => {
				await this.#toggleState("viewed", viewedButton, "is-viewed");
			});
		}

		// Обработка клика на саму карточку
		this.#element.addEventListener("click", (event) => {
			if (!event.target.closest("button")) {
				console.log(`Карточка "${this.#movie.name}" нажата`);
				this.#showFullCardDialog();
			}
		});
	}

	async #toggleState(stateKey, button, className) {
		if (!button) return;

		try {
			// Инвертируем состояние
			this.#movie[stateKey] = !this.#movie[stateKey];

			// Обновляем внешний вид кнопки
			this.#updateButtonsState(button, className);

			const movieApi = MovieRecords.getInstance();

			// Обновляем данные в базе
			await movieApi.updateMovie(this.#movie.id, {
				[stateKey]: this.#movie[stateKey],
			});

			console.log(
				`Фильм "${this.#movie.name}" помечен как ${this.#movie[stateKey] ? stateKey : "не " + stateKey}.`
			);
		} catch (error) {
			console.error("Ошибка при обновлении состояния:", error.message);

			// Возвращаем предыдущее состояние
			this.#movie[stateKey] = !this.#movie[stateKey];
			this.#updateButtonsState(button, className);
		}
	}

	#updateButtonsState(button, className) {
		if (this.#movie[className.replace("is-", "")]) {
			button.classList.add(className);
		} else {
			button.classList.remove(className);
		}

		if (button.classList.contains("btn__card--viewed")) {
			const viewSpan = button.querySelector("span");
			if (viewSpan) {
				button.textContent = this.#movie.viewed
					? "Просмотрено"
					: "Не просмотрено";
				button.appendChild(viewSpan);
			}
		}
	}

	#showFullCardDialog() {
		try {
			const fullCardElement = this.#element.cloneNode(true);
			this.#dialogController.updateDialogTitle(this.#movie.name);

			const buttonsContainer = fullCardElement.querySelector(
				".card__btns--container"
			);
			if (buttonsContainer) {
				buttonsContainer.innerHTML = "";
				fullCardElement.appendChild(createDialogCardButtons());
			}

			this.#dialogController.updateDialogContent(fullCardElement);
			this.#dialogController.openDialog();
		} catch (error) {
			console.error(
				"Ошибка при открытии диалогового окна:",
				error.message
			);
		}
	}
	getElement() {
		return this.#element;
	}
}

export default CardController;
