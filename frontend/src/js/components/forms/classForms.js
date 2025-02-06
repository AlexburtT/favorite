import InputField from "../inputs/inputClass";
import ButtonClass from "../buttons/buttonClass";

export default class FormElement {
    constructor(id, name = '', inputs = [], buttons = [], formAttributes = {}) {
        
        if (!id) {
            throw new Error('ID формы должен быть указан!');
        }
           
        this.id = id;
        this.name = name;
        this.inputs = inputs;
        this.buttons = buttons;
        this.formAttributes = formAttributes;
        this.formElement = null;
    }

    validateInputs() {
        if (!Array.isArray(this.inputs)) {
            throw new Error('Inputs должен быть массивом!');
        }
        for (const input of this.inputs) {
            if (typeof input !== 'object' || !input.name || !input.labelText || !input.type) {
                throw new Error('Некоректная структура данных для inputs!');
            }
        }
    }

    validateButtons() {
        if (!Array.isArray(this.buttons)) {
            throw new Error('Buttons должен быть массивом!');
        }
        for (const button of this.buttons) {
            if (typeof button !== 'object' || !button.text || !button.type) {
                throw new Error('Некоректная структура данных для buttons!');
            }
        }
    }

    getFormElement() {
        return this.formElement;
    }

    createFormElement() {
        const form = document.createElement('form');
        form.id = this.id;
        form.name = this.name;
        form.className = 'dialog__form';
        Object.entries(this.formAttributes).forEach(([key, value]) => form.setAttribute(key, value)); 

        for (const input of this.inputs) {
            const inputFieldElement = new InputField(input.name, input.labelText, input.type, input.placeholder, input.classModifier, input.attributes).render();
            form.appendChild(inputFieldElement);
        }

        const buttonConteiner = document.createElement('div');
        buttonConteiner.className = 'dialog__form--conteiner--btn';

        for (const button of this.buttons) {
            const buttonElement = new ButtonClass(button.text, button.type, button.classModifier, button.attributes).render();
            buttonConteiner.appendChild(buttonElement);            
        }

        form.appendChild(buttonConteiner);

        this.formElement = form;
        return form;
    }
}