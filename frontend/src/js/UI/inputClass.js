export class Input {
    constructor(name, label, value, type, placeholder, className) {
        this.name = name;
        this.label = label;
        this.value = value;
        this.type = type;
        this.placeholder = placeholder;
        this.className = className;
    }  
    render() {
        return `
        <label>
              <span class="dialog__label">Название</span>
              <input
                name="filmName"
                type="text"
                class="input dialog__input"
                placeholder="Введите название фильма"
              />
            </label>
        `
    }      
}

