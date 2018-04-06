# 1

На какую функцию должна быть ссылка в `f`, что бы код выполнился?

```javascript
f('console.log("done!")');
```

<!-- 
// var f = eval; // правильный вариант
// var f = Function; // не правильно, потому что вызов `f` вернет новую функцию, которую еще нужно вызвать
// var f = setTimeout; // правильный вариант, показывающий углубленные знания (хотя и бесполезные)
 -->

# 2

Результат будет `1`, почему?

```javascript
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

```javascript
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

```javascript
(() => 'абвгеёжзийклмнопрстуфхцчшщъыьэюя')().length ===
  (() => 'абвгеёжзийклмнопрстуфхцчшщъыьэюя')().length;
// false
```
<!-- `й` - это `и` с глифом -->
