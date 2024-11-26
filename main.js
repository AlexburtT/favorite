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

// Функция, которая из списка ASCII кодов возвращает собранную строку. 

let codes = [ 74, 97, 118, 97, 83, 99, 114, 105, 112, 116 ];

function asciiToString(codes) {
    return String.fromCharCode(...codes);
}

console.log(asciiToString(codes));

// Реализовать метод toString, который при приведении объекта к строке возвращает JSON строку, вместо [object Object]

let userObj = {
    name: "John",
    lastNameObj: "Doe",
    toString() {
        return JSON.stringify(this);
    }
};

console.log(String(userObj));

// Напишите функцию, которая считает среднее арифметическое из списка чисел. 

let numbers = [1, 2, 3, 4, 5, 6];

function average(numbers) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

console.log(average(numbers));

// Напишите функцию преобразования одного типа в другой. Параметры, которые принимает функция:

// То, что нужно преобразовать

// В какой тип нужно попытаться преобразовать

// Возможные значения параметра

// number
// string
// boolean
// Пример использования:

// transformTo("123", "number") // 123
// transformTo(345, "string") // "345"
function transformTo(value, type) {
    switch (type) {
        case "number":
            return Number(value);
        case "string":
            return String(value);
        case "boolean":
            return Boolean(value);
        default:
            throw new Error(`Неизвестнгый тип: ${type}`);
    }
};

console.log(transformTo("123", "number")); // 123
console.log(transformTo(345, "string")); // "345"
console.log(transformTo(true, "boolean")); // true

let userNameGh = "Don";

function log() {
    userNameGh = "Bob";
    console.log(userNameGh);
}

userNameGh = "Cew";

log();

// Задача состоит в том, чтобы избавиться от параметра у метода getValues. То есть я хочу вызывать просто метод user.getValues() и не передавать никаких параметров. Чтобы решить эту задачу вам нужно исправлять код только функции values

function values() {
  for (let key in this) {
    console.log(key)
  }
}

function UserValues(name, age) {
  this.name = name;
  this.age = age;
  this.getValues = values;
}

let userV = new UserValues("Sam", 15);
userV.getValues();