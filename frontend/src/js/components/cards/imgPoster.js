class MovieImage {
	#movie;
	#element;

	constructor(movie) {
		this.#movie = movie;
		this.#validateParams();
		this.#element = this.#createImageElement();
	}

	#validateParams() {
		if (
			!this.#movie.poster ||
			(!Array.isArray(this.#movie.poster) &&
				typeof this.#movie.poster !== "string")
		) {
			throw new Error("Постер должен быть строкой или массивом строк.");
		}

		if (
			Array.isArray(this.#movie.poster) &&
			this.#movie.poster.length === 0
		) {
			throw new Error("Массив постеров пуст.");
		}

		if (!this.#movie.name || typeof this.#movie.name !== "string") {
			throw new Error("Название фильма должно быть непустой строкой.");
		}
	}

	#createImageElement() {
		if (
			Array.isArray(this.#movie.poster) &&
			this.#movie.poster.length > 1
		) {
			return this.#createSlider(this.#movie.poster);
		} else {
			const posterPath = Array.isArray(this.#movie.poster)
				? this.#movie.poster[0]
				: this.#movie.poster;
			return this.#createSingleImage(posterPath);
		}
	}

	#createSingleImage(posterPath) {
		const img = document.createElement("img");
		img.src =
			posterPath || "http://localhost:3000/posters/no_product_img.png";
		img.alt = this.#movie.name || "Фильм";
		img.className = "card__img";

		return img;
	}

	#createSlider(posterPaths) {
		const sliderContainer = document.createElement("div");
		sliderContainer.className = "card__slider";

		const sliderTrack = document.createElement("div");
		sliderTrack.className = "card__slider-track";

		posterPaths.forEach((posterPath) => {
			const slide = this.#createSingleImage(posterPath);
			slide.classList.add("card__slider-slide");
			sliderTrack.appendChild(slide);
		});

		sliderContainer.appendChild(sliderTrack);

		// Добавляем кнопки навигации (если нужны)
		const prevButton = document.createElement("button");
		prevButton.className = "card__slider-btn card__slider-btn--prev";
		prevButton.textContent = "<";

		const nextButton = document.createElement("button");
		nextButton.className = "card__slider-btn card__slider-btn--next";
		nextButton.textContent = ">";

		sliderContainer.append(prevButton, nextButton);

		return sliderContainer;
	}

	getElement() {
		return this.#element;
	}
}

export default MovieImage;
