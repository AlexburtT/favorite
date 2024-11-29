class ApiService {
    constructor() {
        this.db = {}
        this.lastId = 1;
    }
    createFilm(filmRecord) {
        this.db[this.lastId] = filmRecord;
        const result = {
            ...filmRecord,
            id: this.lastId
        }
        this.lastId++;
        return result
    }
};