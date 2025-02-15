class Label {
    #name;
    #htmlFor;
    #className;
    #element;

    /**
     * @param {Object} params - Параметры для создания метки.
     * @param {string} [params.name=''] - Текст метки (обязательный параметр).
     * @param {string} [params.htmlFor=''] - Связанный элемент (id input'a).
     * @param {string} [params.className=''] - Дополнительные CSS-классы для метки.
     */
    constructor({
        name = '',
        htmlFor = '',
        className = ''
    }) {
        this.#validateParams(name, htmlFor);
        this.#name = name;
        this.#htmlFor = htmlFor;
        this.#className = className;
        this.#element = this.#createLabel();
    }

    #validateParams(name, htmlFor) {
        if (!name || typeof name !== 'string') {
            throw new Error('Название поля должно быть непустой строкой.');
        }

        if (!htmlFor || typeof htmlFor !== 'string') {
            throw new Error('htmlFor должен быть непустой строкой.');
        }
    }

    #createLabel() {
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.textContent = this.#name;
        span.className = `label ${this.#className}`;
        label.appendChild(span);
        label.htmlFor = this.#htmlFor;
        return label;
    }

    getElement() {
        return this.#element;
    }
}

export default Label;