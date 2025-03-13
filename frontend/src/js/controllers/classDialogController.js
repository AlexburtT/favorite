import MovieRecords from "../api/apiServer";
import Card from "../components/cards/classCard";

class DialogController {
	#element;
	#contentInstance;

	/**
	 * @param {Object} params - Параметры для создания контроллера диалога.
	 * @param {HTMLDialogElement} element - Элемент диалогового окна.
	 * @param {HTMLElement|null} contentInstance - Контент внутри диалога (форма или карточка).
	 */
	constructor(element, contentInstance = null) {
		if (!(element instanceof HTMLDialogElement)) {
			throw new Error(
				"Переданный элемент должен быть экземпляром HTMLDialogElement."
			);
		}

		this.#element = element;
		this.#contentInstance = contentInstance;

		this.#addEventListeners();
	}

	#addEventListeners() {
		const closeButton = this.#element.querySelector(".dialog__close");
		if (closeButton) {
			closeButton.addEventListener("click", () => this.closeDialog());
		}

		this.#element.addEventListener("click", (event) => {
			if (event.target === this.#element) {
				this.closeDialog();
			}
		});

		this.#element.addEventListener("click", (event) => {
			const target = event.target;

			if (target.classList.contains("btn__dialog--cancel")) {
				console.log('Кнопка "Отмена" нажата из карточки.');
				this.closeDialog();
			}

			if (target.classList.contains("btn__dialog--edit")) {
				console.log('Кнопка "Редактировать" нажата из карточки.');
			}
		});

		if (this.#contentInstance instanceof HTMLFormElement) {
			this.#addFormEventListeners();
		}
	}

	#addFormEventListeners() {
		const form = this.#contentInstance;
		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			try {
				const apiMovie = new MovieRecords.getInstance();

				const formData = new FormData(form);
				const createMovie = await apiMovie.handleFormSave(formData);
				console.log("Фильм успешно создан:", formData.get("name"));

				const card = new Card(createMovie).getElement();
				document.getElementById("movies-list").appendChild(card);

				this.closeDialog();
				form.reset();
			} catch (error) {
				console.error("Ошибка при сохранении фильма:", error);
			}
		});

		const buttons = form.querySelectorAll("button");
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				console.log("Кнопка нажата:", button.textContent.trim());

				if (
					button.type === "reset" &&
					button.classList.contains("dialog__form--btn--cancel")
				) {
					this.closeDialog();
					form.reset();
				}
			});
		});
	}
	openDialog() {
		if (!this.#element.open) {
			this.#element.showModal();
		}
	}

	closeDialog() {
		if (this.#element.open) {
			this.#element.close();

			// Сброс формы при закрытии диалога
			if (this.#contentInstance instanceof HTMLFormElement) {
				this.#contentInstance.reset();
			}
			console.log("Диалог закрыт.");
		}
	}

	updateDialogContent(newContent) {
		if (!newContent || !(newContent instanceof HTMLElement)) {
			throw new Error(
				"Новый контент должен быть экземпляром HTMLElement."
			);
		}

		const currentContent =
			this.#element.querySelector(".dialog__form") ||
			this.#element.querySelector(".card");

		if (currentContent) {
			this.#element.removeChild(currentContent);
		}

		this.#element.appendChild(newContent.cloneNode(true));
	}

	updateDialogTitle(newTitle) {
		if (typeof newTitle !== "string" || newTitle.trim() === "") {
			throw new Error("Новый заголовок должен быть строкой.");
		}

		const dialogTitle = this.#element.querySelector(".dialog__title");
		if (dialogTitle) {
			dialogTitle.textContent = newTitle;
		} else {
			console.warn("Элемент с классом .dialog__title не был найден.");
		}
	}

	getElement() {
		return this.#element;
	}
}

export default DialogController;
