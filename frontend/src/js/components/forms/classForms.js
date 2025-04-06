import Block from "../../utils/Block";
import EventBus from "../../utils/EventBus";

class Form extends Block {
	constructor(props) {
		super({
			tagName: "form",
			className: `${props.className}`,
			attributes: {
				id: props.id,
				name: props.name,
				"aria-label": props["aria-label"] || `Форма ${props.name}`,
			},
			...props,
		});

		this.children = props.children;
		this.eventAction = props.eventAction;
		console.log("eventAction", this.eventAction);

		this.element.addEventListener("submit", (event) => {
			event.preventDefault();
			console.log("submit", this.element);
			EventBus.getInstance().emit(props.eventAction, this.element);
		});
	}

	render() {
		const form = this.element;

		const { inputs, buttons } = this.props.children;

		inputs.forEach((inputElement) => {
			form.append(inputElement.getContent());
		});

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "dialog__form--container--btn";

		buttons.forEach((buttonElement) => {
			buttonContainer.append(buttonElement.getContent());
		});
		form.appendChild(buttonContainer);

		return super.render();
	}

	reset() {
		const formElement = this.element;
		if (formElement instanceof HTMLFormElement) {
			formElement.reset();
		}
	}

	destroy() {
		console.log("Удаление дочернего контента из Формы", this.children);

		this.reset();

		const { inputs, buttons } = this.children;

		[...inputs, ...buttons].forEach((child) => {
			child.destroy();
		});

		this.children = [];
		super.destroy();
	}
}

export default Form;
