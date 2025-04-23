/**
 * Нормализуем данные фильма
 * @param {Object} rawMovie - Сырые данные фильма
 * @returns {Object} - Нормализованные данные фильма
 */
export default function normalizeMovieData(rawMovie) {
	return {
		id: rawMovie.id || "",
		name: rawMovie.name || "Фильм без названия",
		releaseYear:
			typeof rawMovie.releaseYear === "number"
				? rawMovie.releaseYear
				: null,
		poster:
			Array.isArray(rawMovie.poster) && rawMovie.poster.length > 0
				? rawMovie.poster
				: ["http://localhost:3000/posters/no_product_img.png"],
		genres:
			Array.isArray(rawMovie.genres) && rawMovie.genres.length > 0
				? rawMovie.genres
				: ["Жанр не указан"],
		viewed: Boolean(rawMovie.viewed),
		favorite: Boolean(rawMovie.favorite),
		description: rawMovie.description || "",
	};
}
