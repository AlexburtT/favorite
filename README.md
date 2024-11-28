# Курс: JavaScript-разработчик. Дипломный

## Домашнее задание № 9.3

### Методические рекомендации

* document — входная точка HTML документа для JS

* getElementById — возвращает элемент у которого атрибут id совпадает с той строкой, которую вы передали, иначе null

* addEventListener — позволяет начать реагировать на какое-либо событие у элемента, например click.

element.addEventListener(
  // Первым параметром передается тип события, например click, mousedown
  "event-name",
  // Вторым параметром функция, которая будет вызвана при срабатывании события
  () => {}
)

* classList — позволяет взаимодействовать с классами элемента.

    + add позволяет добавить класс
    + remove удалить

### Полезные ссылки
* [Document](https://developer.mozilla.org/ru/docs/Web/API/Document)
* [getElementById](https://developer.mozilla.org/ru/docs/Web/API/Document/getElementById)
* [addEventListener](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener)
* [classList](https://developer.mozilla.org/ru/docs/Web/API/Element/classList)



# Практическое задание

Задание: реализовать функцию-конструктор с методами open и close, для взаимодействия с диалогом.

Эта функциональность будет применена для взаимодействия со всплывающими окнами в приложении.

1. Вынесите логику поиска диалога и взаимодействия с ним в отдельную функцию, чтобы не дублировать её и каждый раз тратить на это время. Пример использования ниже.
let dialog = new Dialog(
  // Уникальный id HTML элемента, в котором находится диалог
  "dialog-id",
  // CSS класс, который нужно добавить этому элементу, чтобы его показать
  "class-to-show-dialog"
);

2. Вы можете обратиться к этому объекту диалога и, например, показать его следующим образом:
dialog.open();

3. Соответственно, чтобы закрыть его нужно вызвать метод close:
dialog.close();

В итоге можно будет работать с несколькими разными диалогами, при этом у них одинаковая логика работы и все в одном месте:

let addButton = document.getElementById("add-button");
let dialog = new Dialog("dialog-id", "class-to-show-dialog");

addButton.addEventListener("click", () => {
  dialog.open();
});