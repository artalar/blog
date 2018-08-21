### Pointer Events vs Touch Events
_Touch Events_ описывают работу с тачем. Появились в 2009 в WebKit, в 2011 спецификация на согласовании была заблокирована, в 2013 принята. Каждое событие имеет в target блок с которого началось событие.

![caniuse Touch Events](http://s.csssr.ru/U8SMMLH99/2018.08.21-11:00:39.png)

_Pointer Events_ описывают работу с "прикосновения" (мышь, тач, перо), похожи по API Mouse Events . Появились в 2012, приняты в 2015. Каждое событие имеет в target блок над которым указатель в момент события, методом `.setPointerCapture(e.pointerId)` можно зафиксировать элемент для текущего движения(?). Свойства евента: MouseEvent + pointerType, isPrimary, width, height (ширина и высота контакта), pressure (сила давления), tiltX, tiltY (углы наклона). Так же в CSS есть `touch-action: auto | none | pan-x | pan-y | manipulation`

![caniuse Pointer Events](http://s.csssr.ru/U8SMMLH99/2018.08.21-11:12:59.png)

# Mouse

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
- Видео доклада "Pointer Events vs Touch Events" https://www.youtube.com/watch?v=4o9joROJVHg