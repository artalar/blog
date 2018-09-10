<!--

# Заметки

### Pointer Events vs Touch Events
_Touch Events_ описывают работу с тачем. Появились в 2009 в WebKit, в 2011 спецификация на согласовании была заблокирована, в 2013 принята. Каждое событие имеет в target блок с которого началось событие.

![caniuse Touch Events](http://s.csssr.ru/U8SMMLH99/2018.08.21-11:00:39.png)

_Pointer Events_ описывают работу с "прикосновения" (мышь, тач, перо), похожи по API Mouse Events . Появились в 2012, приняты в 2015. Каждое событие имеет в target блок над которым указатель в момент события, методом `.setPointerCapture(e.pointerId)` можно зафиксировать элемент для текущего движения(?). Свойства евента: MouseEvent + pointerType, isPrimary, width, height (ширина и высота контакта), pressure (сила давления), tiltX, tiltY (углы наклона). Так же в CSS есть `touch-action: auto | none | pan-x | pan-y | manipulation`

![caniuse Pointer Events](http://s.csssr.ru/U8SMMLH99/2018.08.21-11:12:59.png)

## Mouse

- менять иконку мышки

# _

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

- Учебник на русском https://learn.javascript.ru/drag-and-drop
- Спека - https://html.spec.whatwg.org/multipage/dnd.html#dnd
- **Подробное введение** - https://www.html5rocks.com/ru/tutorials/dnd/basics/#toc-dataTransfer
- Пример - https://habr.com/post/125424/
- UX - https://habr.com/post/216737/
- Сортировка без jQuery - https://habr.com/company/mailru/blog/207048/
- Видео доклада "Pointer Events vs Touch Events" https://www.youtube.com/watch?v=4o9joROJVHg

 -->

# План

## История и возможности Drag and Drop в Web

> ## **1.** *Вводный теоретический урок (без кодинга) для знакомства с DnD в общем и в вебе в частности*

### Что такое Drag and Drop

**_Drag and Drop_** - _Drag'n'Drop_ - _DnD_ - дословно "потяни и положи" - это паттерн пользовательского опыта (UX) для взаимодействия с визуальным интерфейсом, с помощью которого пользователь может быстрее и, главное, нагляднее выполнить какую-то комплексную операцию, с помощью "перетягивания" [мышкой] на экране смыслового блока в другой смысловой контекст .

Например, если пользователь работает с несколькими списками и ему нужно переместить элемент из одного списка в другой, как бы он мог это сделать в "обычном" интерфейсе? Ему нужно совершить целый ряд точечных действий: 1) вызвать меню элемента, 2) выбрать опцию переноса в другой список, 3) выбрать необходимый список. При этом каждый пункт - это своя микрозадача со своим микроконтекстом: необходимо найти нужную кнопку из перечня всех, необходимо добраться до нее мышью или клавиатурой что бы выбрать и так сделать трижды, согласно нашему примеру. Все это прибавляет ментальный вес и увеличивает дискомфорт пользователя.

Как же можно упростить взаимодействие? В обычной жизни мы бы просто взяли рукой предмет из одного ящика и переложили бы в другой, а можно ли что-то подобное сделать через экран? DnD предлагает нам использовать мышь как руку в реальном мире: взять ей что-то и перетащить куда нужно - ментально эта операция воспринимается намного проще.

![](../assets/2018-09-10-08-47-47.png)

В действительности, хоть DnD и проще для пользователя, но его техническая реализация совсем не простая, особенно до введения стандарта HTML5

### DnD до HTML5

Фундаментально пользователю для перетаскивания нужно не много: 1) зажать кнопку мыши над блоком, 2) переместить мышку, 3) отпустить кнопку. Но каждый из этих пунктов на техническом уровне сопровождается целым рядом особенностей, в частности: как определять перетаскиваемый элемент, как плавно изменять его положение, как определять куда его можно "бросить", а куда нет - все это осложняется, порой, сложной структурой DOM элементов и [слишком] гибкой системой событий.

А что если пользователь хочет перетянуть элемент не мышкой, может быть у него сенсорный экран телефона или стилус?

#### История API: Mouse Events, Touch Events, Pointer Events

Сейчас доля сенсорных устройств, в частности смартфонов и планшетов, быстро увеличивается и захватывает web. Но изначальная спецификация для работы с указателем - мышкой, это не предполагала.

В 2009 году, вслед за айфоном, в движке WebKit появилась спецификация Touch Events, которая описывала интерфейс для работы с событиями от прикосновения к экрану и сильно отличалась от спецификации Mouse Events. Долгое время эта спецификация подвергалась критике и не принималась в стандарт, но в 2013 году, все же, была принята.

Но Touch Events описывали только взаимодействие пальцем с экраном, при этом как-то нужно было обрабатывать стилус: силу и угол его нажатия. Так же в MakBook последних поколений появилась возможность регестрировать силу нажатия на тачпад, что то же было бы интересно использовать в веб-приложениях.

Спецификация Pointer Events, появившееся в 2012 году и принятая в 2015 предполагает включать в себя все возможные взаимодействия с интерфейсом, включая и новые углы и силу наклона, и, возможно, какие-то будущие особенности. Интерфейс и API Pointer Events наследуются от Mouse Events, поэтому удобны в работе.

Одним из ключевых различий Pointer Events от Touch Events, помимо ограниченного API последнего, является то что каждое pointer событие имеет в target блок над которым указатель в момент события, а каждое событие touch имеет в target блок с которого началось событие - что менее удобно.

В общем и целом рекомендуется использовать Pointer Events с полифилами для Safari

#### Механика Mouse Events

> Свойства события и логика работы с ними для DnD

### DnD в HTML5

> Новые методы

> Перетаскивание из других окон ОС

## Примеры решения задач на HTML5 DnD

> ## **2.** *Кодинг*

### Детальнее об API и его использовании

### Перемещиение картин в галереи между альбомами

#### Пример с кодом

### Что нельзя сделать c HTML5 DnD

> Прозрачность для больших блоков

> Анимации движения

> Кастомизации положения: только вертикальное или только горизонтальное перетаскивание (слайдеры)

## Полный контроль DnD

> ## **3.** *Кодинг*

> вступление `ahead to the past`

### Движение

> Рисуем комету

> перетаскиванием через Mouse Event

#### left + top vs копирование vs transform

#### Один обработчик для нескольких элементов

> onmouseenter onmouseleave

#### Анимации

> Хвост кометы

## react-dnd

> ## **4.** *Знакомство с концепциями*

#### Влияние redux

#### Обзор API

## Пример на react-dnd

> ## **5.** *Кодинг*
> может быть разделить на 2 урока...

### Переписываем галерею

> DropTarget

### Переписываем комету

> DragLayer