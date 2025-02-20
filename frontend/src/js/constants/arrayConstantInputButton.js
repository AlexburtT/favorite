export const inputsArray = [
    {
        label: 'Название',
        name: 'name',
        type: 'text',
        placeholder: 'Введите название фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label',
        attributes: { required: true }
    },
    {
        label: 'Год выпуска',
        name: 'releaseYear',
        type: 'number',
        placeholder: 'Введите год выпуска фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label',
        attributes: { required: true }
    },
    {
        label: 'Жанры',
        name: 'genres',
        type: 'text',
        placeholder: 'Введите жанры фильма',
        classModifier: 'dialog__form--input',
        classNameLabel: 'dialog__form--label',
        attributes: { required: true }
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
        classNameLabel: 'dialog__form--label',
        attributes: { required: true }
    }
];

export const buttonsArray = [
    {
        title: 'Отменить',
        type: 'reset',
        className: 'dialog__form--btn--cancel dialog__form--btn'        
    },
    {
        title: 'Сохранить',
        type: 'submit',
        className: 'dialog__form--btn--save dialog__form--btn'       
    }
];

export const buttonsArrayEdit = [
    {
        title: 'Отмена',
        type: 'button',
        className: 'dialog__form--btn--save dialog__form--btn'       
    },
    {
        title: 'Удалить',
        type: 'button',
        className: 'dialog__form--btn--save dialog__form--btn'       
    },
    {
        title: 'Обновить',
        type: 'submit',
        className: 'dialog__form--btn--save dialog__form--btn'       
    }
];