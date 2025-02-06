import InputField from "../inputs/inputClass";

export default class FormElement {
    constructor(id, name = 'movieRecordSave', inputs) {        
        this.id = id;
        this.name = name;
        this.inputs = inputs;
        this.formElement = null;
    }

    getFormElement() {
        return this.formElement;
    }

    createFormElement() {
        const form = document.createElement('form');
        form.id = this.id;
        form.className = 'dialog__form';
        form.name = this.name;

        if (!Array.isArray(this.inputs)) {
            throw new Error('Inputs должен быть массивом!');
        }

        for (const input of this.inputs) {
            const inputFieldElement = new InputField(input.name, input.labelText, input.type, input.placeholder, input.classModifier).render();
            form.appendChild(inputFieldElement);
        }

        this.formElement = form;
        return form;
    }
}