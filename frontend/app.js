import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";
import FormElement from "./src/js/components/forms/classForms.js";


document.addEventListener('DOMContentLoaded', () => {
  
  dateYearFooter;  

  const inputsArray = [
    { 
      labelText: 'Название', 
      type: 'text', 
      name: 'nmovieName', 
      placeholder: 'Введите название фильма', 
      classModifier:'dialog__form--input' 
    },
    { 
      labelText: 'Год выпуска', 
      type: 'number', 
      name: 'movieYear', 
      placeholder: 'Введите год выпуска', 
      classModifier:'dialog__form--input' 
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

  const formInstance = new FormElement('dialog__form', '', inputsArray, buttonsArray, { method: 'POST', action: '/submit'});
  formInstance.createFormElement(); 

  const addBtn = document.getElementById('add-btn');
  const whatBtn = document.getElementById('what-btn');

  if (!addBtn || !whatBtn) {
    console.error('Не удалось найти кнопки');
    return;
  }
    
  addBtn.addEventListener('click', () => {
    const dialog = new Dialog({       
      formInstance,
      title: 'Создание закладки',
      additionalClasses: ['class-to-show-dialog']    
    });

    console.log('Кнопка "Добавить" была нажата');     
    dialog.open();  
  });
   
  whatBtn.addEventListener('click', () => {
    const dialog = new Dialog({       
      formInstance,
      title: 'Пока Пока',
      additionalClasses: ['class-to-show-dialog']
    })
    console.log('Кнопка "Что посмотреть?" была нажата');
    dialog.open();
  });
});
