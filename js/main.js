import { ApiService } from "./apiService";

document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-id");
    const addBtn = document.getElementById("add-button");

    addBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    document.addEventListener("click", (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
});


// Реализуйте класс Reader со следующими свойствами:
// ФИО
// Номер читательского билета (Например, 123)
// Название факультета
// Дата рождения
// Телефон
// А так же методы:

// takeBook
// returnBook
// У обоих методов два варианта использования:

// Если передать число, то покажется сообщение в консоль, о том что конкретный читатель взял или вернул столько-то книг
// Если передать строку, то покажется что читатель взял или вернул книгу под названием и имя книги
// Пример использования:

// let reader = new Reader("Сэм", 123, "Фронтенд", new Date(2032, 1, 4), "+79453441232");

// reader.takeBook(2); // Сэм взял(а) книги. Кол-во: 2
// reader.takeBook("Мастер и Маргарита"); // Сэм взял(а) книгу под названием «Мастер и Маргарита»

// reader.returnBook(2); // Сэм вернул(а) книги. Кол-во: 2
// reader.returnBook("Мастер и Маргарита"); // Сэм вернул(а) книгу под названием «Мастер и Маргарита»

class Reader {
    constructor(fio, number, faculty, date, phone) {
        this.fio = fio;
        this.number = number;
        this.faculty = faculty;
        this.date = date;
        this.phone = phone;
    }
    takeBook(number) {
        console.log(`${this.fio} взял(а) книги. Кол-во: ${number}`);
    }
    returnBook(number) {
        console.log(`${this.fio} вернул(а) книги. Кол-во: ${number}`);
    }
};

let reader = new Reader("Сэм", 123, "Фронтенд", new Date(2032, 1, 4), "+79453441232");

reader.takeBook(2); // Сэм взял(а) книги. Кол-во: 2
reader.takeBook("Мастер и Маргарита"); // Сэм взял(а) книгу под названием «Мастер и Маргарита»

reader.returnBook(2); // Сэм вернул(а) книги. Кол-во: 2
reader.returnBook("Мастер и Маргарита"); // Сэм вернул(а) книгу под названием «Мастер и Маргарита»