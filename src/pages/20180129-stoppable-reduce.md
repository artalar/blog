# Название

// TODO: Убрать пять штук "в"

В данной статье мы рассмотрим с вами некоторую эволюционную цепочку обработки данных в цикле в языках программировании в целом и в JavaScript (по стандарту EcmaScript 5) в частности. Я постараюсь донести основные концепции и разобрать все на примерах доступно для любого новичка.

## Введение

#### Оглавление

* [while](#while)
* [for](#for)
* [Array.prototype.forEach](#array.prototype.forEach)
* [Array.prototype.map](#array.prototype.map)
* [Array.prototype.reduce](#array.prototype.reduce)
* [Ленивые вычисления](#lazy-evaluation)
* [Array.prototype.stoppableReduce](#array.prototype.stoppableReduce)

## while

Тут про цикл

## for

Тцт про сахарный цикл

## <a id="array.prototype.forEach">Array.prototype.forEach</a>

Тут про ФП'шный сахар

## <a id="array.prototype.map">Array.prototype.map</a>

Тут про персистентность

## <a id="array.prototype.reduce">Array.prototype.reduce</a>

Тут про гибкость

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
    if (end) break;

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
