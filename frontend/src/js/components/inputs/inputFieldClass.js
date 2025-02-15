class InputField {
    #name;
    #type;
    #placeholder;
    #attributes;
    #className;
    #element;

    /**
     * @param {string} [name=''] - Имя поля (обязательный параметр).
     * @param {string} [type='text'] - Тип поля ('text', 'email', 'password', и т.д.).
     * @param {string} [placeholder=''] - Подсказка для поля.
     * @param {Object} [attributes={}] - Дополнительные атрибуты для <input>.
     * @param {string} [className=''] - Дополнительные CSS-классы для <input>.
     */
    constructor({
        name = '',
        type = 'text',
        placeholder = '',
        attributes = {},
        className = ''
    }) {
        this.#validateParams(name, type);
        this.#name = name;
        this.#type = type;
        this.#placeholder = placeholder;
        this.#attributes = attributes;
        this.#className = className;
        this.#element = this.#createInputField();
    }

    #validateParams(name, type) {
        if (!name) {
            throw new Error('Название поля не может быть пустым.');
        }

        if (!['text', 'number', 'file', 'search', 'textarea'].includes(type)) {
            throw new Error('Некорректный тип поля.');
        }
    }

    #createInputField() {
        const input = document.createElement('input');
        input.name = this.#name;
        input.type = this.#type;
        input.placeholder = this.#placeholder;
        input.className = `input ${this.#className}`;
        Object.entries(this.#attributes).forEach(([key, value]) => input.setAttribute(key, value));
        return input;
    }

    getElement() {
        return this.#element;
    }
}

export default InputField;
