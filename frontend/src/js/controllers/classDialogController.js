import MovieRecords from "../api/apiMovieRecords";
import Card from "../components/cards/classCard";

class DialogController {
    #dialogElement;
    #formElement;

    /**
     * @param {Object} params - Параметры для создания контроллера диалога.
     * @param {HTMLDialogElement} dialogElement - Элемент диалогового окна.
     * @param {HTMLFormElement|null} formElement - Элемент формы внутри диалога.
     */
    constructor(dialogElement, formElement = null) {
        if (!(dialogElement instanceof HTMLDialogElement)) {
            throw new Error('Переданный элемент должен быть экземпляром HTMLDialogElement.');
        }

        this.#dialogElement = dialogElement;
        this.#formElement = formElement;

        this.#addEventListeners();
    }

    #addEventListeners() {      
        const closeButton = this.#dialogElement.querySelector('.dialog__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeDialog());
        }
       
        this.#dialogElement.addEventListener('click', (event) => {
            if (event.target === this.#dialogElement) {
                this.#formElement.reset();
                this.closeDialog();
            }
        });
        
        // Обработка отправки формы
        if (this.#formElement) {
            this.#formElement.addEventListener('submit', async (event) => {
                event.preventDefault();

                try {
                    const formData = new FormData(this.#formElement);
                    const createMovie = await MovieRecords.handleFormSave(formData);
                    console.log('Фильм успешно создан:', formData.get('name'));

                    const card = new Card(createMovie).getElement();
                    document.getElementById('movies-list').appendChild(card);
                    
                    this.#formElement.reset();
                    this.closeDialog();
                } catch (error) {
                    console.error('Ошибка при сохранении фильма:', error);
                }
            });
            
            const buttons = this.#formElement.querySelectorAll('button');
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    console.log('Кнопка нажата:', button.textContent.trim());
                    
                    if (button.type === 'reset' && button.classList.contains('dialog__form--btn--cancel')) {
                        this.#formElement.reset();
                        this.closeDialog();
                    }
                });
            });
        }
    }

    openDialog() {
        if (!this.#dialogElement.open) {
            this.#dialogElement.showModal();
        }
    }

    closeDialog() {
        if (this.#dialogElement.open) {
            this.#dialogElement.close();

            // Сброс формы при закрытии диалога
            this.#formElement.reset();
            console.log('Диалог закрыт.');
        }
    }

    getElement() {
        return this.#dialogElement;
    }
}

export default DialogController;