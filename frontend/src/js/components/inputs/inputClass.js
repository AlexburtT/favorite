export default class InputField {
    constructor(name, labelText, type, placeholder, classModifier) {
        this.name = name;
        this.labelText = labelText;        
        this.type = type;
        this.placeholder = placeholder;        
        this.classModifier = classModifier;
        this.inputElement = null;
    }  

    getInputElement() {
        return this.inputElement;
    }
    
    render() {
        const labelInputConteiner = document.createElement('label');
        const span = document.createElement('span');
        span.textContent = this.labelText;
        span.classList.add('dialog__form--label');
        labelInputConteiner.appendChild(span);              

        const input = document.createElement('input');
        input.name = this.name;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.className = `input ${this.classModifier}`;     
        
        labelInputConteiner.appendChild(input);

        this.inputElement = labelInputConteiner;
        return labelInputConteiner;
    }
}

