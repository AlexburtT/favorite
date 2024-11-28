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
