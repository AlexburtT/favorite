import renderMovieCard from "./src/js/renderCardMovie.js";
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
    const movieName = formData.get('movieName');
  const movieYear = formData.get('movieYear');
  let moviePoster = formData.get('moviePoster'); // Это будет объект FileList, если пользователь выбрал файл

  // Если выбрано изображение, то получаем его URL
  if (moviePoster instanceof FileList && moviePoster.length > 0) {
    moviePoster = URL.createObjectURL(moviePoster[0]);
  } else {
    moviePoster = ''; // Пустая строка, если нет файла
  }

  // Создаем новый объект с данными фильма
  const newMovieData = {
    name: movieName,
    releaseYear: movieYear,
    poster: moviePoster,
    genres: [], // По умолчанию пустые жанры
    viewed: false,
    description: '',
    favorite: false,
  };

  try {
    // Отправляем запрос на создание фильма
    const createdMovie = await MovieRecords.createMovie(newMovieData);
    
    alert(`Фильм "${createdMovie.name}" успешно добавлен!`);
    
    // Закрываем диалог после успешной отправки
    dialog.close();
  } catch (error) {
    console.error('Ошибка при создании фильма:', error);
    alert('Не удалось создать фильм. Попробуйте позже.');
  }
});