class Dialog {
    #title;
    #className;
    #contentInstance;
    #attributes;
    #element;

    /**
     * @param {string} [title='Элемент не передан!'] - Заголовок диалога.
     * @param {string} [className=''] - Дополнительные CSS-классы для диалога.
     * @param {Object} [attributes={}] - Дополнительные атрибуты для <dialog>.
     * @param {Object|null} [contentInstance=null] - Экземпляр контента (например, форма).
     */

    constructor({
        title = 'Элемент не передан!',
        className = '',
        contentInstance = null,
        attributes = {}
    }) {
        this.#validateTitle(title);
        this.#title = title;
        this.#className = className;
        this.#contentInstance = contentInstance;
        this.#attributes = attributes;

        this.#element = this.#createDialog();        
    }

    #validateTitle(title) {
        if (!title) {
            throw new Error('Заголовок должен быть указан!');
        }
    }

    #createDialog() {
        const dialog = document.createElement('dialog');
        dialog.className = `dialog ${this.#className}`;

        const title = document.createElement('h2');
        title.className = 'dialog__title';
        title.textContent = this.#title;

        const closeButton = document.createElement('button');
        closeButton.className = 'dialog__close';
        closeButton.textContent = 'x';

        Object.entries(this.#attributes).forEach(([key, value]) => dialog.setAttribute(key, value));

        dialog.append(title, closeButton);

        if (this.#contentInstance) {
            dialog.append(this.#contentInstance);
        }
        
        return dialog;
    }

    getElement() {
        return this.#element;
    }
}

export default Dialog;
