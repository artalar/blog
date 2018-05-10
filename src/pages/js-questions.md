# 1

На какую функцию должна быть ссылка в `f`, что бы код выполнился?

```js
f('console.log("done!")');
```

<!-- 
// var f = eval; // правильный вариант
// var f = Function; // не правильно, потому что вызов `f` вернет новую функцию, которую еще нужно вызвать
// var f = setTimeout; // правильный вариант, показывающий углубленные знания (хотя и бесполезные)
 -->

# 2

Результат будет `1`, почему?

```js
[{ а: 1 }, { а: 2 }, { а: 3 }].reduce((a, v) => {
  if (a) {
    var { а } = v;
  }
  return a + +!а;
}, 0);
// 1
```

<!-- Издевательская задачка. `а` в объектах - русский символ, если заменить на англ. - будет `3` -->

# 3

Какой результат выполнения `terrrrrnaraty(0, 'test', false)({test: true})`?

```js
const isfunc = val => typeof val === 'function';
const isstr = val => typeof val === 'string';
const terrrrrnaraty = (first, second, third = undefined) => props =>
  (isfunc(first) ? first(props) : isstr(first) ? !!props[first] : !!first)
    ? isfunc(second) ? second(props) : second
    : isfunc(third) ? third(props) : third;

terrrrrnaraty(0, 'test', false)({ test: true });
```

<!-- `false` -->

# 4

Почему результат `false`?

```js
(() => 'абвгеёжзийклмнопрстуфхцчшщъыьэюя')().length ===
(() => 'абвгеёжзийклмнопрстуфхцчшщъыьэюя')().length;
// false
```
<!-- `й` - это `и` с глифом -->

# 5

Реализуйте функцию `delayed`

```js
delayed(() => console.log(1));
console.log(2);
delayed(() => console.log(3));
setTimeout(() => console.log(4));
delayed(() => console.log(5));
console.log(6);
// 2
// 6
// 1
// 3
// 5
// 4
```

<!-- `const delayed = callback => Promise.resolve().then(callback)` -->

# 6

Реализуйте функцию `arrayReverse`, в которой осуществляется проход по массиву и возврат нового массива с элементами в обратной последовательности (reverse) в один проход и функционально (без циклов, а с помощью встроенных методов массива), но без `Array.prototype.reverse` и `Array.prototype.reduceRight`.

```js
arrayReverse([1,2,3])
// [3,2,1]
```

<!-- `const arrayReverse = array => array.map((v,i,a) => a[a.length - i - 1])` -->
