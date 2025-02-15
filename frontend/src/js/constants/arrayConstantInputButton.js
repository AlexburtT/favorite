export const inputsArray = [
    {
        label: 'Название',
        name: 'name',
        type: 'text',
        placeholder: 'Введите название фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label'
    },
    {
        label: 'Год выпуска',
        name: 'releaseYear',
        type: 'number',
        placeholder: 'Введите год выпуска фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label'
    },
    {
        label: 'Жанры',
        name: 'genres',
        type: 'text',
        placeholder: 'Введите жанры фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label'
    },
    {
        label: 'Постер',
        name: 'poster',
        type: 'file',
        placeholder: '',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label'
    },
    {
        label: 'Описание',
        name: 'description',
        type: 'textarea',
        placeholder: 'Введите описание фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label'
    }
];

export const buttonsArray = [
    {
        title: 'Отменить',
        type: 'reset',
        className: 'dialog__form--btn--cancel dialog__form--btn',
        onClick: () => {
            console.log('Кнопка "Отменить" нажата.');
        }
    },
    {
        title: 'Сохранить',
        type: 'submit',
        className: 'dialog__form--btn--save dialog__form--btn',
        onClick: (event) => {
            event.preventDefault(); // Предотвращаем отправку формы
            console.log('Кнопка "Сохранить" нажата.');
        }
    }
];