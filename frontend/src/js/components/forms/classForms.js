import Input from "@/js/components/inputs/classInput.js";
import Button from "@/js/components/buttons/buttonClass.js";


class Form {
    #id;
    #name;
    #inputs;
    #buttons;
    #atributes;
    #element;

    /**
     * @param {string} id - ID формы (обязательный параметр).
     * @param {string} [name=''] - Имя формы.
     * @param {Array<Object>} [inputs=[]] - Массив параметров для создания полей ввода.
     * @param {Array<Object>} [buttons=[]] - Массив параметров для создания кнопок.
     * @param {Object} [attributes={}] - Дополнительные атрибуты для <form>.
     */
    constructor({
        id = '',
        name = '',
        inputs = [],
        buttons = [],
        attributes = {}
    }) {
        this.#validateParams(id);
        this.#id = id;
        this.#name = name;
        this.#inputs = inputs.map((inputProps) => new Input(inputProps));
        this.#buttons = buttons.map((buttonProps) => new Button(buttonProps));
        this.#atributes = attributes;
        this.#element = this.#createForm();
    }

    #validateParams(id) {
        if (!id && typeof id !== 'string') {
            throw new Error('ID формы должен быть непустой строкой');
        }
    }    

    #createForm() {
        const form = document.createElement('form');        
        form.id = this.#id;
       
        form.name = this.#name;
        form.className = 'dialog__form';
        Object.entries(this.#atributes).forEach(([key, value]) => {
            form.setAttribute(key, value);
        });

        for (const input of this.#inputs) {
            form.appendChild(input.getElement());
        }

        // Добавляем контейнер для кнопок
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dialog__form--container--btn';

        for (const button of this.#buttons) {
            buttonContainer.appendChild(button.getElement());
        }

        form.appendChild(buttonContainer);
        return form;
    } 

    getElement() {
        return this.#element;
    }
}

export default Form;
