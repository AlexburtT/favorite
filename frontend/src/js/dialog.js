class Dialog {
    constructor(dialogId) {
        this.dialogElement = document.getElementById(dialogId);
        this.formElement = this.dialogElement.querySelector('.dialog__form');
        this.buttons = Array.from(this.dialogElement.querySelectorAll('.dialog__btn'));
        this.submitted = false;
        
        // Добавление обработчиков событий
        this.buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                if (button.textContent === 'Сохранить' && !this.submitted) {
                    this.submitForm();
                    this.submitted = true;
                }
                
                this.close();
            });
        });
        
        // Обработчик закрытия диалога по ESC
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
        
        // Обработчик закрытия диалога по клику за пределами диалога
        this.dialogElement.addEventListener('click', (event) => {
            if (!this.formElement.contains(event.target)) {
                this.close();
            }
        });
    }
    
    isOpen() {
        return this.dialogElement.hasAttribute('open');
    }
    
    open() {
        this.dialogElement.showModal();
        this.submitted = false;
    }
    
    close() {
        this.dialogElement.close();
        this.clearForm();
    }
    
    clearForm() {
        this.formElement.reset();
    }
    
    submitForm() {
        const data = new FormData(this.formElement);
        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        this.clearForm();
    }
}; 

export default Dialog;
