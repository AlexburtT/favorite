import InputField from "../inputs/inputClass";
import ButtonElement from "../buttons/buttonClass";
import eventBus from "../../uttils/EventBus";

class FormElement {
    constructor(id, name = '', inputs = [], buttons = [], formAttributes = {}) {
        if (!id) {
            throw new Error('ID формы должен быть указан.');
        }

        this.id = id;
        this.name = name;
        this.inputs = inputs;
        this.buttons = buttons;
        this.formAttributes = formAttributes;
        this.formElement = null;

        this.validateInputs();
        this.validateButtons();
    }

    validateInputs() {
        if (!Array.isArray(this.inputs)) {
            throw new Error('Inputs должен быть массивом!');
        }
        for (const input of this.inputs) {
            if (typeof input !== 'object' || !input.name || !input.labelText || !input.type) {
                throw new Error('Некорректная структура данных для inputs.');
            }
        }
    }

    validateButtons() {
        if (!Array.isArray(this.buttons)) {
            throw new Error('Buttons должен быть массивом!');
        }
        for (const button of this.buttons) {
            if (typeof button !== 'object' || !button.text || !button.type) {
                throw new Error('Некорректная структура данных для buttons.');
            }
        }
    }

    createFormElement() {
        if (!this.formElement) {
            const form = document.createElement('form');
            form.id = this.id;
            form.name = this.name;
            form.className = 'dialog__form';
            Object.entries(this.formAttributes).forEach(([key, value]) => {
                form.setAttribute(key, value);
            });

            // Добавляем поля ввода
            for (const input of this.inputs) {
                const inputField = new InputField(input.name, input.labelText, input.type, input.placeholder, input.classModifier, input.attributes).render();
                form.appendChild(inputField);
            }

            // Добавляем контейнер для кнопок
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'dialog__form--container--btn';

            for (const button of this.buttons) {
                const btnElement = new ButtonElement(button.text, button.type, button.classModifier, button.attributes).render();
                buttonContainer.appendChild(btnElement);
            }

            form.appendChild(buttonContainer);
            this.formElement = form;

            // Добавляем обработчики событий для кнопок
            this.addEventListeners(this.formElement);;
        }

        return this.formElement;
    }

    addEventListeners(formElement) {
        const cancelButton = formElement.querySelector('.dialog__form--btn--cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', (event) => {
                event.preventDefault();
                eventBus.publish('dialog:close'); 
                console.info('Диалог закрыт по нажатию кнопки "Отмена".');                
            });
        }

        const saveButton = formElement.querySelector('.dialog__form--btn--save');
        if (saveButton) {
            saveButton.addEventListener('click', (event) => {
                event.preventDefault();
                eventBus.publish('form:save', { formId: formElement.id }); 
                console.info('Данные сохранены. Диалог закрыт по нажатию кнопки "Сохранить".');
            });
        }
    }

    getFormElement() {
        return this.formElement;
    }

    resetForm() {
        if (this.formElement) {
            this.formElement.reset(); 
        } else {
            console.warn('Форма не существует. Пересоздание формы...');            
        }
    }

    populateForm(data) {
        if (this.formElement) {
            for (const [name, value] of Object.entries(data)) {
                const input = this.formElement.querySelector(`[name="${name}"]`);
                if (input) {
                    input.value = value; 
                }
            }
        } else {
            console.error('Форма еще не создана.');
        }
    }
}

export default FormElement;
