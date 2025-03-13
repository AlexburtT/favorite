import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";

class Dialog extends Block {
	#title;
	#contentInstance;
	/**
	 * @param {string} [title='Элемент не передан!'] - Заголовок диалога.
	 * @param {Object|null} [contentInstance=null] - Экземпляр контента (например, форма).
	 */
	constructor({
		title = "Элемент не передан!",
		contentInstance = null,
		className = "",
		attributes = {},
		...props
	} = {}) {
		super({
			tagName: "dialog",
			className: `dialog ${className || ""}`,
			attributes: { ...attributes },
			eventBus: EventBus.getInstance(),
			...props,
		});

		this.#validateTitle(title);
		this.#title = title;
		this.#contentInstance = contentInstance?.getElement();

		this.#setupDialog();
	}

	#validateTitle(title) {
		if (!title || typeof title !== "string") {
			throw new Error("Заголовок должен быть указан!");
		}
	}

	#setupDialog() {
		const element = this.getElement();

		const title = document.createElement("h2");
		title.className = "dialog__title";
		title.textContent = this.#title;

		const closeButton = document.createElement("button");
		closeButton.className = "dialog__close";
		closeButton.textContent = "x";
		closeButton.type = "button";
		closeButton.addEventListener("click", () => {
			console.log('Клик на кнопку "x".');
			this.close();
		});

		this.on("click", (event) => {
			if (event.target === element) {
				console.log("Клик вне диалога.");
				this.close();
			}
		});

		element.append(title, closeButton);

		if (this.#contentInstance) {
			element.append(this.#contentInstance);
		}
	}

	open() {
		const element = this.getElement();
		if (!element.open) {
			element.showModal();
			this.emit(EventBus.EVENTS.DIALOG_OPENED, { dialog: this });
		}
	}

	close() {
		const element = this.getElement();
		if (element.open) {
			element.close();
			this.emit(EventBus.EVENTS.CLOSE_DIALOG, { dialog: this });
		}
	}

	// Переопределение метода render для добавления специфичной логики
	render() {
		super.render();
		return this.getElement();
	}
}

export default Dialog;
