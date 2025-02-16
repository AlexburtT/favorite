import { dateYearFooter } from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";
import { scrollTop } from "./src/js/scrollTop.js";
import { inputsArray, buttonsArray } from "./src/js/constants/arrayConstantInputButton.js";
import Form from "./src/js/components/forms/classForms.js";
import DialogController from "./src/js/controllers/classDialogController.js";
import Card from "./src/js/components/cards/classCard.js";
import MovieRecords from "./src/js/api/apiMovieRecords.js";


document.addEventListener('DOMContentLoaded', async () => {

  try {
    dateYearFooter();
    scrollTop();

  const form = new Form({
    id: 'dialog__form',
    name: 'bookmark-form',
    inputs: inputsArray,
    buttons: buttonsArray,
    attributes: { method: 'POST', action: '/submit' }
  });

  const formElement = form.getElement();

  const dialog = new Dialog({
    contentInstance: formElement,
    title: 'Создание закладки',
    className: 'create-dialog'   
  });

  const dialogElement = dialog.getElement();

  const dialogController = new DialogController(dialogElement, formElement);

  const addBtn = document.getElementById('add-btn');
        if (!addBtn) {
            console.error('Элемент #add-btn не найден.');
            return;
        }

        // Открытие диалога по клику на кнопку "Добавить"
        addBtn.addEventListener('click', () => {
            dialogController.openDialog();
            console.log("Кнопка 'Добавить' нажата, диалог открыт.");
        });

        // Добавление диалога в документ
        document.body.appendChild(dialogElement);
    } catch (error) {
        console.error('Ошибка при инициализации компонентов:', error.message);
    }

    const moviesList = document.getElementById('movies-list');
    if (!moviesList) {
      console.error('Элемент #movies-list не найден.');
      return;
    }

    try {
      const movies = await MovieRecords.findAll();
      console.log('Все фильмы:', movies);
      renderMovies(movies);    
    } catch (error) {
      console.error('Ошибка при получении фильмов:', error);
    }

    function renderMovies(movies) {
      moviesList.innerHTML = ''; // Очищаем контейнер
      movies.forEach(movie => {
        const card = new Card(movie).getElement();        
        moviesList.appendChild(card);
      });
    }
});
