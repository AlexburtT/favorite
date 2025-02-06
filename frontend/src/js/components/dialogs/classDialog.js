export default class Dialog {
    constructor({formInstance, title = 'Форма пустая'}) {
        this.formInstance = formInstance;               
        this.title = title;
        this.dialog = null;
    }

    createDialog() {
        if(!this.dialog) {
            this.dialog = document.createElement('dialog');            
            this.dialog.classList.add('dialog');
    
            let content = `      
            <h2 class="dialog__form--title">${this.title}</h2> 
            <button class="dialog__close">&times;</button>       
        `;
    
            this.dialog.innerHTML = content;

            if(this.formInstance) {
                this.formElement = this.formInstance.getFormElement();
                this.dialog.appendChild(this.formElement);
            }
            document.body.appendChild(this.dialog);
    
            this.dialog.querySelector(".dialog__close").addEventListener("click", () => this.close());

            this.dialog.addEventListener("click", (event) => {
                if (event.target === this.dialog) {
                     this.close();
                }                   
            });

            this.dialog.addEventListener("keydown", (event) => {
                if (event.key === "Escape") this.close();
            });
        }       
    }

    open() {
        this.createDialog();
        this.dialog.showModal();
    }

    close() {
        if(this.dialog) {
            this.dialog.close();
            setTimeout(() => {
                if (this.dialog.parentNode) {
                    this.dialog.remove();
                }
            }, 100);
        }        
    }
}