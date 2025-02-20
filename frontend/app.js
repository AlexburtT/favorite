import { dateYearFooter } from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/components/dialogs/classDialog.js";
import { scrollTop } from "./src/js/scrollTop.js";
import { inputsArray, buttonsArray } from "./src/js/constants/arrayConstantInputButton.js";
import Form from "./src/js/components/forms/classForms.js";
import DialogController from "./src/js/controllers/classDialogController.js";
import Card from "./src/js/components/cards/classCard.js";
import MovieRecords from "./src/js/api/apiServer.js";
import CardController from "./src/js/controllers/CardController.js";
import normalizeMovieData from "./src/js/utils/normalizeMovieData.js";
import CreateMovieForm from "./src/js/components/forms/createMovieForm.js";
import EventHandlers from "./src/js/utils/eventHandlers.js";


document.addEventListener('DOMContentLoaded', async () => {

  try {
    dateYearFooter();
    scrollTop();

    const moviesList = document.getElementById('movies-list');
    if (!moviesList) {
      console.error('Элемент #movies-list не найден.');
      return;
    }   

    const cardDialog = new Dialog({
      title: 'Редактирование закладки',
      className: 'update-movie-dialog'
    });

    const dialogController = new DialogController(cardDialog.getElement(), null);
    const eventHandlers = new EventHandlers();

    const moviesApi = MovieRecords.getInstance();
    const rawMovies = await moviesApi.findAll(); 
    const normolizeMovies = rawMovies.map(normalizeMovieData);
    normolizeMovies.forEach((movie) => {
      const card = new Card(movie).getElement();
      moviesList.appendChild(card);
      new CardController(card, movie, dialogController, eventHandlers);
    });

    const createDialog = new Dialog({      
      title: 'Создание закладки',
      className: 'create--movie-dialog'
    });      

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
    console.error('Ошибка при загрузке фильмов:', error.message);
  }
});
