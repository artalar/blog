![](../assets/work_In_progress.png)

# Эффективная обработка данных с функциями высшего порядка

## Приветствиие

> (а оно нужно?)

## Введение

Данная техническая повесть поможет начинающим разработчикам глубже понять и эффективнее применять инструменты обработки данных и их массивы, колекции в JavaScript (JS). Много внимания будет уделено повторению простых конструкций и особенностей языка, которые вы, скорее всего, уже знаете. При этом я так же постараюсь доступно напомнить о низкоуровневых механизмах работы интерпритатора и сборщика мусора в JS. Все это обернуто в лирическое расследование, результаты которого будут для каждого свои.

### Оглавление

* [for](#for)
* [while](#while)
* [Array.prototype.forEach](#array.prototype.forEach)
* [Array.prototype.map](#array.prototype.map)
* [Array.prototype.reduce](#array.prototype.reduce)
* [Ленивые вычисления](#lazy-evaluation)
* [Array.prototype.stoppableReduce](#array.prototype.stoppableReduce)
* [Трансдьюсер](#transducer)
* [Заключение](#conclusion)
* [Благодарности](#gratitude)


## for

Для того что бы разбирать итерации по коллекциям в функциях высшего порядка, о которых речь пойдет ниже, давайте начнем с начала и определимся с характерными чертами циклов

## while

Пока...

## <a id="array.prototype.forEach">Array.prototype.forEach</a>

Тут про ФП'шный сахар (ES5) - функции высшего порядка
Для каждого...

## <a id="array.prototype.map">Array.prototype.map</a>

Тут про персистентность
Сопоставить...

## <a id="array.prototype.reduce">Array.prototype.reduce</a>

Тут про гибкость
Сворачивая...

```javascript
Array.prototype.reduce = function(callback, defaultAccumulator) {
  let accumulator =
    defaultAccumulator === undefined ? this[0] : defaultAccumulator;
  let currentIndex = defaultAccumulator === undefined ? 1 : 0;

  for (; currentIndex < this.length; currentIndex++) {
    accumulator = callback(accumulator, this[currentIndex], currentIndex, this);
  }

  return accumulator;
};
```

```javascript
[1, 2, 3, 4, 5].reduce((acc, v) => (acc > 6 ? acc : acc + v));
// 11
```

## <a id="lazy-evaluation">Ленивые вычисления</a>

Тут про то как классно можно прерывать вычисления

## <a id="array.prototype.stoppableReduce">Array.prototype.stoppableReduce</a>

Шутка! На самом деле такого метода в нативном JS нет, хотя при использовании библиотеки [Ramda](http://ramdajs.com/) его [функционал можно заполучить](http://ramdajs.com/docs/#reduced)

```javascript
Array.prototype.stoppableReduce = function(callback, defaultAccumulator) {
  let accumulator =
    defaultAccumulator === undefined ? this[0] : defaultAccumulator;
  let currentIndex = defaultAccumulator === undefined ? 1 : 0;
  let end = false;
  const stopper = lastAccumulator => {
    end = true;
    return lastAccumulator;
  };

  for (; currentIndex < this.length; currentIndex++) {
    if (end === true) break;

    accumulator = callback(
      accumulator,
      this[currentIndex],
      currentIndex,
      this,
      stopper
    );
  }

  return accumulator;
};
```

```javascript
[1, 2, 3, 4, 5].stoppableReduce(
  (acc, v, i, a, s) => (acc > 6 ? s(acc) : acc + v)
);
// 11
```

## <a id="transducers">Трансдьюсер</a>

## <a id="conclusion">Заключение</a>
