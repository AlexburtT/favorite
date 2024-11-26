const themeColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
console.log(themeColor);

// Напишите функцию-конструктор «User».

// Функция-конструктор должна иметь следующие свойства:

// firstName (Имя)
// lastName (Фамилия)
// А так же следующие методы:

// getFullName — метод возвращает имя и фамилию одной строкой
// getInitials — метод возвращает инициалы пользователя
// Пример использования:

// let user = new User("Слёрмик", "Южно-мостный");

// console.log(user.getFullName()) // "Слёрмик Южно-мостный"
// console.log(user.getInitials()) // "С.Ю."


// function User(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.getFullName = function () {
//         return `${this.firstName} ${this.lastName}`;
//     };
//     this.getInitials = function () {
//         return `${this.firstName[0]}.${this.lastName[0]}`;
//     };
// };

// let user = new User("Слёрмик", "Южно-мостный");

// console.log(user.getFullName()); // "Слёрмик Южно-мостный"
// console.log(user.getInitials()); // "С.Ю."

class User {

/**
 * Initializes a new instance of the User class with a first name and last name.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 */
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName = () => `${this.firstName} ${this.lastName}`;    

    getInitials = () => `${this.firstName[0]}.${this.lastName[0]}`;
};

let user = new User("Слёрмик", "Южно-мостный");

console.log(user.getFullName()); // "Слёрмик Южно-мостный"
console.log(user.getInitials()); // "С.Ю."