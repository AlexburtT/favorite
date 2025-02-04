export default class Dialog {
    constructor({id = "dialog-id", formInstance}) {
        this.formInstance = formInstance;
        this.id = id;        
        this.dialog = document.getElementById(this.id) || null;
    }

    createDialog() {
        if(!this.dialog) {
            this.dialog = document.createElement('dialog');
            this.dialog.id = this.id;
            this.dialog.classList.add('dialog');
    
            let content = `      
            <h2 class="dialog__title">ФОРМА ПУСТАЯ</h2> 
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
        }        
    }

    isOpen() {
        return this.dialog && this.dialog.open;
    }
}