class Dialog {
    constructor(id, className) {
        this.dialog = document.getElementById(id);
        this.className = className;
    }

    open() {
        this.dialog.showModal();
    };
    close() {
        this.dialog.close();
    };
};

const dialog = new Dialog("dialog-id", "dialog");

document.addEventListener("click", (e) => {
    if (e.target === dialog.dialog) {
        dialog.close();
    }
});


export { dialog };
