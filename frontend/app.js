import renderFilmCard from "./src/js/cardFilm.js";
import MovieRecords from "./src/js/classMovieRecords.js";
import dateYearFooter from "./src/js/dateYearFooter.js";
import Dialog from "./src/js/dialog.js";
import scrollTop from "./src/js/scrollTop.js";

const addBtn = document.querySelector("#add-button");

const dialog = new Dialog('dialog-id');

addBtn.addEventListener("click", () => {    
    dialog.open();
});

dialog.formElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(dialog.formElement);
    const filmName = formData.get('filmName');
  const filmYear = formData.get('filmYear');
  let filmPoster = formData.get('filmPoster'); // Это будет объект FileList, если пользователь выбрал файл

  // Если выбрано изображение, то получаем его URL
  if (filmPoster instanceof FileList && filmPoster.length > 0) {
    filmPoster = URL.createObjectURL(filmPoster[0]);
  } else {
    filmPoster = ''; // Пустая строка, если нет файла
  }

  // Создаем новый объект с данными фильма
  const newFilmData = {
    name: filmName,
    releaseYear: filmYear,
    poster: filmPoster,
    genres: [], // По умолчанию пустые жанры
    viewed: false,
    description: '',
    favorite: false,
  };

  try {
    // Отправляем запрос на создание фильма
    const createdFilm = await MovieRecords.createFilm(newFilmData);
    
    alert(`Фильм "${createdFilm.name}" успешно добавлен!`);
    
    // Закрываем диалог после успешной отправки
    dialog.close();
  } catch (error) {
    console.error('Ошибка при создании фильма:', error);
    alert('Не удалось создать фильм. Попробуйте позже.');
  }
});







