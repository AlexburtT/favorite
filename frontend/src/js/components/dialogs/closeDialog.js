class CloseDialogBtn {
	constructor(onClick) {
		this.element = document.createElement("button");
		this.element.className = "dialog__close";
		this.element.textContent = "x";
		this.element.type = "button";
		if (typeof onClick === "function") {
			this.element.addEventListener("click", onClick);
		}
	}
}

export default CloseDialogBtn;
