Изначально DnD реализовывался через клонирование элемента и движение (и захват) его по mouse событиям

События:

- dragstart - при старте драга
- drag
- dragenter - при попадании мыши на таргет
- dragleave - при ухода мыши с таргета
- dragover - при каждом движении над объектом
- drop
- dragend

Атрибут this/e.target отличается для каждого типа событий и зависит от места в модели событий перетаскивания.

В некоторых браузерах при перетягивании файлов в окно браузера они автоматически открываются, что бы такого не произошло нам нужно отменить стандартное поведение браузера. `event.preventDefault();`

Загрузка файла с отображением прогресса

```javascript
var xhr = new XMLHttpRequest();
xhr.upload.addEventListener(
  "progress",
  event => {
    // percent
    parseInt((event.loaded / event.total) * 100);
  },
  false
);
```

Для touch можно использовать метод document.elementFromPoint, который позволяет получить ссылку на элемент по координатам.

Следует отметить, что в большинстве браузеров перетаскивание выделенных фрагментов текста, изображений и элементов привязок с атрибутом href (src?)поддерживается по умолчанию. Его можно перенести в адресную строку, элемент <input type="file" /> и даже на рабочий стол.

Селектор `[draggable]`?

Другие (в частности FF) в ходе операции перетаскивания требуют [отправки данных](https://www.html5rocks.com/ru/tutorials/dnd/basics/#toc-dataTransfer)

Помните о том, что не все элементы могут быть целью (например, изображения).

### Материалы по теме

- Спека - https://html.spec.whatwg.org/multipage/dnd.html#dnd
- **Подробное введение** - https://www.html5rocks.com/ru/tutorials/dnd/basics/#toc-dataTransfer
- Пример - https://habr.com/post/125424/
- UX - https://habr.com/post/216737/
- Сортировка без jQuery - https://habr.com/company/mailru/blog/207048/
