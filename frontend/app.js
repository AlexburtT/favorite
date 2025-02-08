import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";
import FormElement from "./src/js/components/forms/classForms.js";

document.addEventListener('DOMContentLoaded', async () => {

  dateYearFooter;

  const inputsArray = [
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

  const buttonsArray = [
    {
      text: 'Отменить',
      type: 'button',
      classModifier: 'dialog__form--btn--cancel dialog__form--btn'
    },
    {
      text: 'Сохранить',
      type: 'button',
      classModifier: 'dialog__form--btn--save dialog__form--btn'
    }
  ];

  const createFormInstance = new FormElement('dialog__form', '', inputsArray, buttonsArray, { method: 'POST', action: '/submit' });
  createFormInstance.createFormElement();

  const createDialog = new Dialog({
    formInstance: createFormInstance,
    title: 'Создание закладки',
    additionalClasses: ['create-dialog']
  });

  const addBtn = document.getElementById('add-btn');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      createDialog.open();
    });
  } else {
    console.error('Элемент #add-btn не найден.');
  }
});
