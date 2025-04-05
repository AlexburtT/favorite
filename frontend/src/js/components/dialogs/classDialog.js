import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";
import CloseDialogBtn from "./closeDialog";
import TitleDialog from "./titleDialog";

class Dialog extends Block {
	/**
	 * @param {Object} props - Параметры для создания диалога.
	 * @param {string} [props.title='Элемент не передан!'] - Заголовок диалога.
	 * @param {Array<Block>} [props.children=[]] - Дочерние компоненты (например, форма).
	 */
	constructor(props) {
		super({
			tagName: "dialog",
			className: props.className || "dialog",
			attributes: {
				"data-id": props.id,
				"aria-label": props.title || "Диалог",
			},
			...props,
		});

		this.titleElement = new TitleDialog();
		this.children = null;

		this.element.addEventListener("click", (event) => {
			if (event.target === this.element) {
				console.log("Клик вне диалога.");
				this.close();
			}
		});

		const eventBus = EventBus.getInstance();
		eventBus.on(
			EventBus.EVENTS.OPEN_DIALOG_BTN,
			this.open.bind(this),
			this
		);

		eventBus.on(EventBus.EVENTS.CLOSE_DIALOG, this.close.bind(this), this);
	}

	render() {
		const element = this.element;
		const btnClose = new CloseDialogBtn(() => {
			console.log("Кнопка закрыть нажата, диалог закрыт");
			this.close();
		});

		element.append(btnClose.element);

		return super.render();
	}

	open({ title, children }) {
		if (title) {
			this.titleElement.setTitle(title);
			this.element.append(this.titleElement.element);
		}

		if (children) {
			this.children = children;
			this.element.append(children.getContent());
		}

		const element = this.getContent();
		if (!element.open) {
			element.showModal();
		}
		console.log("Диалог открыт.", this);
	}

	close() {
		const element = this.getContent();
		if (element.open) {
			element.close();

			this.clearContent();

			EventBus.getInstance().emit(EventBus.EVENTS.CLOSE_DIALOG, {
				dialog: this,
			});
		}
	}

	clearContent() {
		if (this.children) {
			console.log(
				"Удаление дочернего контента из Диалога",
				this.children
			);
			this.children.destroy();
			this.children = null;
		}

		if (this.titleElement) {
			this.titleElement.innerHTML = "";
		}
	}
}

export default Dialog;
