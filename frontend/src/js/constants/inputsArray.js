export const inputsArray = [
    {
        labelText: 'Название',
        type: 'text',
        name: 'nmovieName',
        placeholder: 'Введите название фильма',
        classModifier: 'dialog__form--input'
    },
    {
        labelText: 'Год выпуска',
        type: 'number',
        name: 'movieYear',
        placeholder: 'Введите год выпуска',
        classModifier: 'dialog__form--input'
    },
    {
        labelText: 'Жанры',
        type: 'text',
        name: 'movieGenres',
        placeholder: 'Введите жанры через запятую',
        classModifier: 'dialog__form--input'
    },
    {
        labelText: 'Постер',
        type: 'file',
        name: 'moviePoster',
        // placeholder: 'Добавьте ссылку на постер или файл',
        classModifier: 'dialog__form--input dialog__form--input--poster'
    },
    {
        labelText: 'Описание',
        type: 'text',
        name: 'movieDescription',
        placeholder: 'Введите описание фильма',
        classModifier: 'dialog__form--input'
    }
];