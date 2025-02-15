import InputField from "./inputFieldClass";
import Label from "./labelClass";

class Input {
    #label;
    #input;
    #element;

     /** 
     * @param {string} [label=''] - Текст метки.
     * @param {string} [name=''] - Имя поля (обязательный параметр).
     * @param {string} [type='text'] - Тип поля ('text', 'email', 'password' и т.д.).
     * @param {string} [placeholder=''] - Подсказка для поля.
     * @param {Object} [attributes={}] - Дополнительные атрибуты для <input>.
     * @param {string} [classNameInput=''] - Дополнительные CSS-классы для <input>.
     * @param {string} [classNameLabel=''] - Дополнительные CSS-классы для <label>.
     */
    constructor({
        label = '',
        name = '',
        type = 'text',
        placeholder = '',
        attributes = {},
        classNameInput = '',
        classNameLabel = ''
    }) {
        this.#validateParams(name);
        this.#label = new Label({
            name: label,
            htmlFor: name,
            className: classNameLabel
        }).getElement();
        this.#input = new InputField({
            name,
            type,
            placeholder,
            attributes,
            className: classNameInput
        }).getElement();
        
        this.#label.append(this.#input);
        this.#element = this.#label;        
    }

    #validateParams(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('Имя поля должно быть непустой строкой.');
        }
    }
    getElement() {
        return this.#element;
    }
}

export default Input;
