export default class InputField {
    constructor(name, labelText, type, placeholder, className) {
        this.name = name;
        this.labelText = labelText;        
        this.type = type;
        this.placeholder = placeholder;
        this.className = className;
    }  
    
    render() {
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.classList.add('dialog__label');
        span.textContent = this.labelText;

        const input = document.createElement('input');
        input.name = this.name;
        input.type = this.type;
        input.placeholder = this.placeholder;
        input.classList.add(this.className);

        label.appendChild(span);
        label.appendChild(input);
        return label;
    }
}

