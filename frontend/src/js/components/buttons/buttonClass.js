export default class ButtonClass {
    constructor(text, type = 'button', classModifier = '', attributes = {}) {

        if (!text) {
            throw new Error('Текст кнопки должен быть указан!');
        }

        if (!['button', 'submit', 'reset'].includes(type)) {
            throw new Error('Тип кнопки должен быть button, submit или reset!');
        }

        this.text = text;
        this.type = type;
        this.classModifier = classModifier;
        this.attributes = attributes;
        this.buttonElement = null;
    }

    getButtonElement() {
        return this.render();
    }

    render() {
        const button = document.createElement('button');
        button.textContent = this.text;
        button.type = this.type;
        button.className = `btn ${this.classModifier}`;
        Object.entries(this.attributes).forEach(([key, value]) => button.setAttribute(key, value));

        this.buttonElement = button;
        return button;
    }
}