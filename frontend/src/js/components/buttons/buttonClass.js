class ButtonElement {
    constructor(
        text = '', 
        type = 'button', 
        classModifier = '', 
        attributes = {},
        svgPath = null
    ) {
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
        this.svgPath = svgPath;
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

        if (this.svgPath) {
            const svg = this.createSvgIcon(this.svgPath);
            button.appendChild(svg);
        }

        Object.entries(this.attributes).forEach(([key, value]) => button.setAttribute(key, value));

        this.buttonElement = button;
        return button;
    }

    createSvgIcon(pathData) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');

        svg.appendChild(path);

        return svg;
    }
}

export default ButtonElement;