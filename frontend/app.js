import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";
import FormElement from "./src/js/components/forms/classForms.js";
import renderCardMovie from "./src/js/renderCardMovie.js";
import scrollTop from "./src/js/scrollTop.js";
import { inputsArray } from "./src/js/constants/inputsArray.js";
import { buttonsArray } from "./src/js/constants/buttonsArray.js";

document.addEventListener('DOMContentLoaded', async () => {

  dateYearFooter;
  inputsArray;
  buttonsArray;

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

  renderCardMovie;

  scrollTop;
});
