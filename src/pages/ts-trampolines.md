# Как увеличить глубину рекурсии при вычислениях на типах с помощью трамплин

![](https://habrastorage.org/webt/qx/jo/md/qxjomdpfkxqcqxt8zd6qztsyqhg.png)

Для кого-то дженерики, `extends` и `infer` в TypeScript остаются непонятной и избыточной шелухой над примитивными анотациями типов - и это нормально, если нет требований к **автоматическому** выводу типов при использовании каких-то утилитарных функций и конструкций. Для повышения же надежности кода стоит больше работы перепоручать машине и заставлять систему типов TypeScript делать максимум, на что она способна. О каких-то пределах этого максимума в статье и пойдет речь.

В первой части будут разобраны механизмы описания вычисления на типах для автоматического вывода этих самых типов и зачем это вообще может быть нужно. А во второй части разберем хаки позволяющие обойти некоторые системные ограничения анализатора TypeScript. Статья рассчитана на опытных разработчиков, но я постараюсь описывать вещи как можно проще и давать ссылки с подробностями для самостоятельного изучения.

---

В первую очередь нужно определиться что же такое статическое описание типов и зачем оно нужно. В интернетах есть множество обозначений и обучающих материалов расскрывающих вопрос более точно и подробно, но я попробую описать свое личное видение, как мне самому проще понимать предмет вопроса. Статическое описание типов - это отдельный язык программирования (ЯП) со своим синтаксисом и семантикой. TypeScript очень интересный ЯП в котором эта особенность выражена особенно явно - описание типов никогда и никак не влияет на сам код и на его поведение, оно лишь помогает сделать некоторый примитивный семантический анализ на наличие ошибок. Я отношусь к статическому описанию кода, как к инструменту автотестирования и документации.

Система типов ТС имеет множество достоинств и недостатков, но, забегая вперед, подчеркну что она [полная по Тьюрингу](https://github.com/microsoft/TypeScript/issues/14833), что означает возможность реализации на ней [виртуальной машины](https://gist.github.com/acutmore/9d2ce837f019608f26ff54e0b1c23d6e), информация о чем, в итоге, и помогла мне в достижении моих целей и написанию этой статьи. Но обо всем по порядку.

> если вы еще не знакомы с обобщенными и условными типами, можете почитать о них тут: [Generics](https://nauchikus.github.io/typescript-definitive-guide/book/contents/Tipy-Obobshcheniya-Generics), [Conditional Types (extends, infer)](https://nauchikus.github.io/typescript-definitive-guide/book/contents/Uslovnye-tipy-Conditional-Types)

## Дженерики

## Extends

## Infer

## Tuple

## Практический пример - нормализация

```ts
function normalize<
  IdName extends string,
  Element extends Record<string, unknown> & Record<IdName, keyof any>
>(list: Element[], idName: IdName) {
  const ids = [] as Element[IdName][];
  const map = {} as Partial<Record<Element[IdName], Element>>;

  list.forEach(el => {
    const id = el[idName];
    ids.push(id);
    map[id] = el;
  });

  return { ids, map };
}

// Type 'number[]' is not assignable to type 'never[]'
const _ids = [{ id: 1, value: "" }].reduce((acc, el) => [...acc, el.id], [])
// _map: {}
const _map = [{ id: 1, value: "" }].reduce((acc, el) => ({...acc, [el.id]: el}), {})

// ids: number[]
// map: Record<number, { id: number, value: string }>
const { ids, map } = normalize([{ id: 1, value: "" }], "id");

// (property) value: string | undefined
normalize([{ id: 1, value: "" }], "id").map[0]?.value
// Property 'value' does not exist on type '{ id: number; balue: string; }'.
normalize([{ id: 1, balue: "" }], "id").map[0]?.value

// Property 'uid' is missing in type '{ id: number; value: string; }'
normalize([{ id: 1, value: "" }], "uid");
```


## Вычисления на типах

Как-то я решил для интереса реализовать тип который получает число и вычисляет инкремент на 1 от этого числа

```ts
type PlusOne<N extends number, Acc extends any[] = []> = ((
  v: any,
  ...a: Acc
) => any) extends (...a: infer T) => any
  ? {
      end: Prepend<any, T>['length']
      next: PlusOne<N, T>
    }[T['length'] extends N ? 'end' : 'next']
  : never

type Test1 /*: 21*/ = PlusOne<20>
type Test2 /*: 31*/ = PlusOne<30> // Type instantiation is excessively deep and possibly infinite.(2589)
```

### Трамплины

Общая теория

[Общая теория](https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/)

[Применительно к TS](https://github.com/microsoft/TypeScript/issues/14833#issuecomment-534274187)

Шаблон:

```ts
type TemplateIsDone<Target, Accumulator> = Accumulator extends Target
  ? true
  : false
type TemplateWork<T> = T
type TemplateTrampoline<
  Target extends any,
  Accumulator extends any,
  Bounces extends any[]
> = {
  done: { tag: 'done'; state: Accumulator }
  bounce: { tag: 'bounce'; state: Accumulator }
  next: TemplateTrampoline<
    Target,
    TemplateWork<Accumulator>,
    Prepend<any, Bounces>
  >
}[TemplateIsDone<Target, Accumulator> extends true
  ? 'done'
  : Bounces['length'] extends 30
  ? 'bounce'
  : 'next']
```

Реализация:

```ts
type PlusOneIsDone<Target extends number, Accumulator extends any[]> = (((
  ...a: Accumulator
) => any) extends (a: any, ...args: infer T) => any
? T['length']
: never) extends Target
  ? true
  : false
type PlusOneWork<T extends any[]> = Prepend<any, T>
type PlusOneTrampoline<
  Target extends number,
  Accumulator extends any[],
  Bounces extends any[]
> = {
  done: { tag: 'done'; state: Accumulator }
  bounce: { tag: 'bounce'; state: Accumulator }
  next: PlusOneTrampoline<
    Target,
    PlusOneWork<Accumulator>,
    Prepend<any, Bounces>
  >
}[PlusOneIsDone<Target, Accumulator> extends true
  ? 'done'
  : Bounces['length'] extends 30
  ? 'bounce'
  : 'next']

type PlusOneWithTrampoline<
  N extends number,
  __bounce extends any = PlusOneTrampoline<N, [], []>
> = N extends 0 ? 1 : {
  bounce: PlusOneWithTrampoline<N, PlusOneTrampoline<N, __bounce['state'], []>>
  done: __bounce['state']['length']
}[__bounce['tag'] extends 'done'
  ? 'done'
  : __bounce['tag'] extends 'bounce'
  ? 'bounce'
  : never]

type Test3 /*: 21*/ = PlusOneWithTrampoline<20>
type Test4 /*: 101*/ = PlusOneWithTrampoline<100> // Fine!
// type Test5/*: 301*/ = PlusOneWithTrampoline<300> // Calculating, but needs a lot of performance
```
