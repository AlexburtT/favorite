export default class Dialog {
    constructor({ formInstance, title = 'Форма пустая', additionalClasses = [] }) {
        this.formInstance = formInstance;
        this.title = title;
        this.dialog = null;
        this.additionalClasses = additionalClasses;
    }

    createDialog() {
        if (!this.dialog) {
            if (!document.createElement('dialog').showModal) {
                console.error('Ваш браузер не поддерживает тег <dialog>.');
                return;
            }

            this.dialog = document.createElement('dialog');
            this.dialog.classList.add('dialog', ...this.additionalClasses);

            const content = `
                <h2 class="dialog__form--title">${this.title}</h2>
                <button class="dialog__close">&times;</button>
            `;
            this.dialog.innerHTML = content;

            if (this.formInstance) {
                const formElement = this.formInstance.getFormElement();
                if (formElement) {
                    this.dialog.appendChild(formElement);

                    // Обработчики для кнопок
                    const cancelButton = formElement.querySelector('.dialog__form--btn--cancel');
                    if (cancelButton) {
                        cancelButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            this.close();
                            this.resetForm();
                        });
                    }

                    const saveButton = formElement.querySelector('.dialog__form--btn--save');
                    if (saveButton) {
                        saveButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            this.handleSave();
                        });
                    }
                }
            }

            document.body.appendChild(this.dialog);

            // Общие обработчики событий
            this.dialog.querySelector('.dialog__close').addEventListener('click', () => {
                this.close();
                this.resetForm();
            });

            this.dialog.addEventListener('click', (event) => {
                if (event.target === this.dialog) {
                    this.close();
                    this.resetForm();
                }
            });
            
            this.dialog.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.close();
                    this.resetForm();
                }
            });

            this.dialog.addEventListener('close', () => {
                if (this.dialog.parentNode) {
                    this.dialog.remove();
                }
            });
        }
    }

    open() {
        this.createDialog();
        if (this.dialog) {
            this.dialog.showModal();
        }
    }

    close() {
        if (this.dialog) {
            this.dialog.close();
        }
    }

    handleSave() {
        if (this.formInstance && this.formInstance.getFormElement()) {
            const formData = new FormData(this.formInstance.getFormElement());
            console.log('Данные формы:', Object.fromEntries(formData.entries()));
            this.close();
            this.resetForm();
        } else {
            console.error('Форма не найдена.');
        }
    }

    resetForm() {
        if (this.formInstance && this.formInstance.getFormElement()) {
            this.formInstance.getFormElement().reset();
        } else {
            console.error('Форма не найдена.');
        }
    }
}
