class TitleDialog {
	constructor(title = "Элемент не передан!") {
		this.element = document.createElement("h1");
		this.element.className = "dialog__title";
		this.element.textContent = title;
	}
	setTitle(title) {
		this.element.textContent = title;
	}
}

export default TitleDialog;
