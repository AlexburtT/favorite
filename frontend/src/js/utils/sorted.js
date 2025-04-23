import Button from "../components/buttons/buttonClass";

let activeFilter = [];

export const createFilterBtns = (movies, btnMore) => {
	const countViewed = movies.filter((movie) => !movie.viewed).length;
	const countFavorite = movies.filter((movie) => movie.favorite).length;

	const btnViewed = new Button({
		title: `Не просмотрено — ${countViewed}`,
		type: "button",
		className: "btn__filter",
		events: {
			click: () => {
				toggleFilter("viewed", movies, btnMore, btnViewed);
			},
		},
	});

	const btnFavorite = new Button({
		title: "Избранное — " + countFavorite,
		type: "button",
		className: "btn__filter",
		events: {
			click: () => {
				toggleFilter("favorite", movies, btnMore, btnFavorite);
			},
		},
	});
	return { btnViewed, btnFavorite };
};

function toggleFilter(filter, movies, btnMore, btnInstance) {
	const isActive = activeFilter.includes(filter);

	if (isActive) {
		activeFilter = activeFilter.filter((item) => item !== filter);
		btnInstance.element.classList.remove("is-active");
	} else {
		activeFilter.push(filter);
		btnInstance.element.classList.add("is-active");
	}

	apllyFilter(movies, btnMore);
}

function apllyFilter(movies, btnMore) {
	let filteredMovies = [...movies];

	if (activeFilter.length > 0) {
		filteredMovies = movies.filter((movie) => {
			return activeFilter.every((filter) => {
				if (filter === "viewed") return !movie.viewed;
				if (filter === "favorite") return movie.favorite;
				return true;
			});
		});

		hideBtnMore(btnMore);
		window.displayedMovies = 0;
	} else {
		filteredMovies = movies.slice(0, window.limitMovies);
		window.displayedMovies = Math.min(window.limitMovies, movies.length);
		if (movies.length > window.limitMovies) {
			restoreBtnMore(btnMore);
		}
	}

	renderMoviesFilter(filteredMovies);
}

function renderMoviesFilter(movies) {
	window.renderMovies(movies, false);
}

function hideBtnMore(btnMore) {
	if (btnMore) {
		btnMore.element.remove();
	}
}

function restoreBtnMore(btnMore) {
	const mainConteiner = document.querySelector(".main");

	if (!mainConteiner.contains(btnMore.element)) {
		mainConteiner.append(btnMore.getContent());
	}
}

//Получаем уникальные жанры
export function getUniqueGenres(movies) {
	const genres = movies.flatMap((movie) => movie.genres || []);
	return [...new Set(genres)];
}

export const filterByGenre = (movies) => {
	const selectedGenres = [];

	document.querySelectorAll(".checkbox__input").forEach((checkbox) => {
		if (checkbox.checked) {
			selectedGenres.push(checkbox.name.replace("genre-", ""));
		}
	});

	if (selectedGenres.length === 0) {
		return movies;
	}

	return movies.filter((movie) =>
		selectedGenres.every((genre) => movie.genres.includes(genre))
	);
};
