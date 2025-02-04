import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";

document.addEventListener('DOMContentLoaded', () => {
  
  dateYearFooter;  

  const addBtn = document.getElementById('add-btn');
  const whatBtn = document.getElementById('what-btn');
    
  addBtn.addEventListener('click', () => {
    const dialog = new Dialog({ title: 'Привет Привет'})
    console.log('Кнопка "Добавить" была нажата');     
    dialog.open();  
  });
   
  whatBtn.addEventListener('click', () => {
    const dialog = new Dialog({ title: 'Пока Пока'})
    console.log('Кнопка "Что посмотреть?" была нажата');
    dialog.open();
  });

});