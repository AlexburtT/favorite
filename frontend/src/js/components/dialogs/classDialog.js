import eventBus from "../../uttils/EventBus";

export default class Dialog {
    constructor({ formInstance, title = 'Форма пустая', additionalClasses = [] }) {
        this.formInstance = formInstance;
        this.title = title;
        this.dialog = null;
        this.additionalClasses = additionalClasses;

        // Подписываемся на события через EventBus
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        eventBus.on('dialog:close', () => this.close());
        eventBus.on('form:save', (data) => this.handleSave(data)); 
    }

    unsubscribeFromEvents() {
        eventBus.off('dialog:close', this.close.bind(this));
        eventBus.off('form:save', this.handleSave.bind(this));
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
                }
            }

            document.body.appendChild(this.dialog);

            // Обработчики событий для диалога
            this.dialog.querySelector('.dialog__close').addEventListener('click', () => {
                eventBus.publish('dialog:close'); 
                console.log("Кнопка закрытия диалога нажата.");
            });
            this.dialog.addEventListener('click', (event) => {
                if (event.target === this.dialog) {
                    eventBus.publish('dialog:close'); 
                    console.info('Диалог закрыт по клику вне диалога.');
                }
            });
            this.dialog.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    eventBus.publish('dialog:close'); 
                    console.info('Диалог закрыт по нажатию клавиши Escape.');
                }
            });
        }
    }

    open() {
        if (!this.dialog) {
            this.createDialog(); 
        }
        this.dialog.showModal(); 
    }

    close() {
        if (this.dialog) {
            this.dialog.close();
            this.formInstance.resetForm();
        }
    }

    handleSave(data) {
        const { formId } = data;
        if (this.formInstance && this.formInstance.getFormElement()?.id === formId) {
            const formData = new FormData(this.formInstance.getFormElement());
            console.dir(Object.fromEntries(formData.entries()));

            // Отправка данных на сервер
            this.sendFormData(formData);

            // Закрываем диалог после сохранения
            eventBus.publish('dialog:close');
        } else {
            console.error(`Форма с ID "${formId}" не найдена.`);
        }
    }

    sendFormData(formData) {
        // Реализация отправки данных на сервер
        fetch('/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Данные успешно отправлены на сервер:', data);
        })
        .catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
    }
}
