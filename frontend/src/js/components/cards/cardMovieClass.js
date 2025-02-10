class CardMovieElement {
    constructor(movie) {
        this.movie = movie;
        this.cardElement = null;
    }
    createCardElement() {
        if (!this.cardElement) {
            const card = document.createElement('article');
            card.className = 'card';
            card.dataset.id = this.movie.id;

            const imgMovie = document.createElement('img');
            imgMovie.src = this.movie.poster || 'http://localhost:3000/posters/no_product_img.png';
            imgMovie.alt = this.movie.name;
            imgMovie.className = 'card__img';
            card.appendChild(imgMovie);

            const titleMovie = document.createElement('h1');
            titleMovie.className = 'card__title';
            titleMovie.textContent = this.movie.name;
            card.appendChild(titleMovie);
            
            const yearMovie = document.createElement('p');
            yearMovie.className = 'card__description--year';
            yearMovie.textContent = this.movie.releaseYear;
            card.appendChild(yearMovie);

            const genreMovie = document.createElement('p');
            genreMovie.className = 'card__descriptions';
            genreMovie.textContent = this.movie.genres.join(', ');
            card.appendChild(genreMovie);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'card__btns';

            const likeButton = document.createElement('button');
            likeButton.className = 'btn__like';

            const likeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            likeSvg.setAttribute('width', '24');
            likeSvg.setAttribute('height', '24');
            likeSvg.setAttribute('viewBox', '0 0 24 24');
            likeSvg.setAttribute('fill', 'none');
            likeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

            const likePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            likePath.setAttribute('d', 'M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z');
            likePath.setAttribute('stroke-width', '2');
            likePath.setAttribute('stroke-linecap', 'round');
            likePath.setAttribute('stroke-linejoin', 'round');
            likeSvg.appendChild(likePath);
            likeButton.appendChild(likeSvg);

            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn__card view';
            viewButton.textContent = 'Просмотрено';
            const viewSpan = document.createElement('span');
            viewSpan.innerHTML = '&#10004;';
            viewButton.appendChild(viewSpan);

            // Добавляем кнопки в контейнер
            buttonsContainer.appendChild(likeButton);
            buttonsContainer.appendChild(viewButton);

            // Добавляем контейнер с кнопками в карточку
            card.appendChild(buttonsContainer);

            this.cardElement = card;

            // Добавляем обработчики событий для кнопок
            this.addEventListeners();
        }    
        return this.cardElement;    
    }

    getCardElement() {
        return this.cardElement;
    }

    addEventListeners() {
        const likeButton = this.cardElement.querySelector('.btn__like');
        const viewButton = this.cardElement.querySelector('.btn.btn__card.view');

        if (likeButton) {
            likeButton.addEventListener('click', () => {
                this.handleLikeButtonClick();
            });
        }

        if (viewButton) {
            viewButton.addEventListener('click', () => {
                this.handleViewButtonClick();
            });
        }

        // Добавляем обработчик клика на всю карточку
        this.cardElement.addEventListener('click', (event) => {
            if (event.target !== likeButton && event.target !== viewButton) {
                this.handleCardClick();
            }
        });
    }

     /**
     * Обработчик клика на кнопку "Лайк"
     */
     handleLikeButtonClick() {
        console.log(`Фильм "${this.movie.name}" добавлен в избранное.`);
        const likePath = this.cardElement.querySelector('.btn__like svg path');
        if (likePath) {
            likePath.setAttribute('stroke', '#FFD700'); // Меняем цвет лайка
        }
    }

    /**
     * Обработчик клика на кнопку "Просмотрено"
     */
    handleViewButtonClick() {
        console.log(`Фильм "${this.movie.name}" помечен как просмотренный.`);
        const viewSpan = this.cardElement.querySelector('.btn.btn__card.view span');
        if (viewSpan) {
            viewSpan.style.color = '#008000'; // Меняем цвет галочки
        }
    }

    /**
     * Обработчик клика на саму карточку
     */
    handleCardClick() {
        console.log(`Открытие диалога редактирования для фильма "${this.movie.name}".`);
        // Здесь можно вызвать логику открытия диалога редактирования
    }

     /**
     * Очищает состояние карточки (например, при повторном рендере)
     */
     resetState() {
        const likePath = this.cardElement.querySelector('.btn__like svg path');
        if (likePath) {
            likePath.setAttribute('stroke', '#000000'); // Возвращаем цвет лайка к исходному
        }

        const viewSpan = this.cardElement.querySelector('.btn.btn__card.view span');
        if (viewSpan) {
            viewSpan.style.color = '#000000'; // Возвращаем цвет галочки к исходному
        }
    }

    /**
     * Обновляет данные карточки
     */
    updateMovieData(newMovieData) {
        this.movie = newMovieData; // Обновляем данные фильма

        // Обновляем текстовые поля
        this.cardElement.querySelector('.card__description--year').textContent = this.movie.releaseYear;
        this.cardElement.querySelector('.card__title').textContent = this.movie.name;
        this.cardElement.querySelector('.card__descriptions').textContent = this.movie.genres.join(', ');

        // Сбрасываем состояние кнопок
        this.resetState();
    }
}
