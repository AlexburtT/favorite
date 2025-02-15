class Button {
    #title;
    #type;
    #className;
    #attributes;    
    #svgPath;
    #element;

    /**  
     * @param {string} [title=''] - Текст кнопки.
     * @param {string} [type='button'] - Тип кнопки ('button', 'submit', 'reset').
     * @param {string} [className=''] - Дополнительные CSS-классы.
     * @param {Object} [attributes={}] - Дополнительные атрибуты.
     * @param {string|null} [svgPath=null] - Путь SVG-иконки.
     */
    constructor({
        title = '',
        type = 'button',
        className = '',
        attributes = {},
        svgPath = null
    }) {
        this.#validateParams(type);
        this.#title = title;
        this.#type = type;
        this.#className = className;
        this.#attributes = attributes;
        this.#svgPath = svgPath;
        this.#element = this.#createButton();
    }

    #validateParams(type) {
        if (!['button', 'submit', 'reset'].includes(type)) {
            throw new Error('Недопустимый тип кнопки! Допустимые значения: button, submit, reset.');
        }

        if (this.#svgPath && typeof this.#svgPath !== 'string') {
            throw new Error('Путь SVG-иконки должен быть строкой!');
        }
    }

    #createButton() {
        const button = document.createElement('button');
        button.textContent = this.#title;
        button.type = this.#type;
        button.className = `btn ${this.#className}`;        

        Object.entries(this.#attributes).forEach(([key, value]) => button.setAttribute(key, value));

        if (this.#svgPath) {
            const svg = this.#createSvgIcon(this.#svgPath);
            button.appendChild(svg);
        }

        return button;
    }

    #createSvgIcon(pathData, width = 24, height = 24, color = 'currentColor') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', color === 'currentColor' ? 'none' : color);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke', color);

        svg.appendChild(path);
        return svg;
    }

    getElement() {
        return this.#element;
    }
}

export default Button;
