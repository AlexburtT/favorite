class InputField {
    constructor(name, labelText, type = 'text', placeholder = '', classModifier = '', attributes = {}) {

        if (!name || !labelText || !type) {
            throw new Error('Параметры name, labelText и type обязательны!');
        }

        this.name = name;
        this.labelText = labelText;        
        this.type = type;
        this.placeholder = placeholder;        
        this.classModifier = classModifier;
        this.attributes = attributes;
        this.inputElement = null;
    }  

    getInputElement() {
        return this.inputElement;
    }
    
    render() {
        const labelInputConteiner = document.createElement('label');
        labelInputConteiner.htmlFor = this.name;

        const span = document.createElement('span');
        span.textContent = this.labelText;
        span.classList.add('dialog__form--label');
        labelInputConteiner.appendChild(span);              

        const input = document.createElement('input');
        input.name = this.name;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.className = `input ${this.classModifier}`; 
        Object.entries(this.attributes).forEach(([key, value]) => input.setAttribute(key, value));    
        
        labelInputConteiner.appendChild(input);

        this.inputElement = labelInputConteiner;
        return labelInputConteiner;
    }
}

export default InputField;
