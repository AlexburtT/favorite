class DOMHelper {
    /**
     * Обновляет состояние кнопки.
     * @param {HTMLElement} button - Элемент кнопки.
     * @param {string} className - Имя класса для изменения состояния.
     * @param {boolean} isActive - Флаг активности.
     */
    static updateButtonState(button, className, isActive) {
        if (isActive) {
            button.classList.add(className);
        } else {
            button.classList.remove(className);
        }

        if (button.classList.contains('btn__card--viewed')) {
            const viewSpan = button.querySelector('span');
            if (viewSpan) {
                button.textContent = isActive ? 'Просмотрено ' : 'Не просмотрено ';
                viewSpan.style.color = isActive ? '#008000' : '#000000';
            }
        }
    }

    /**
     * Удаляет элемент из DOM.
     * @param {HTMLElement} element - Элемент для удаления.
     */
    static removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    /**
     * Очищает содержимое контейнера, исключая заголовок и кнопку закрытия диалога.
     * @param {HTMLElement} container - Контейнер для очистки.
     */
    static clearDialogContent(container) {
        Array.from(container.children).forEach((child) => {
            if (child.tagName !== 'H2' && child.tagName !== 'BUTTON') {
                container.removeChild(child);
            }
        });
    }

    /**
     * Обновляет карточку фильма после редактирования.
     * @param {HTMLElement} card - Элемент карточки.
     * @param {Object} updatedFields - Обновленные поля.
     */
    static updateCardFromForm(card, updatedFields) {
        card.querySelector('.card__title').textContent = updatedFields.name || card.dataset.name;
        card.querySelector('.card__description--year').textContent = updatedFields.releaseYear || card.dataset.releaseYear;
        card.querySelector('.card__descriptions').textContent =
            (updatedFields.genres || card.dataset.genres).join(', ');

        // Обновляем состояние кнопок
        const likeButton = card.querySelector('.btn__like--favorite');
        if (likeButton) {
            DOMHelper.updateButtonState(likeButton, 'is-like', Boolean(updatedFields.favorite));
        }

        const viewedButton = card.querySelector('.btn__card--viewed');
        if (viewedButton) {
            DOMHelper.updateButtonState(viewedButton, 'is-viewed', Boolean(updatedFields.viewed));
        }
    }
}

export default DOMHelper;