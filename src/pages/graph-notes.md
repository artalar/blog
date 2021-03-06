# Графы

> В первую очередь граф - это набор данных, которые можно отобразить как угодно и в котором один и тот же набор данных можно отобразить разными способами. Визуальное представление графа - это удобная форма взаимодействия с ним, но не необходимая.

Состоят из ***вершин*** и ***граней***. В зависимости от того как соединяются вершины гранями граф имеет тот или иной тип:

- ***Полный*** - каждая вершина имеет грань к каждой другой вершине
- ***Простой*** (обыкновенный) - грани не имеют направления (связь по признаку, а не отношению)
- ***Ориентированный*** (***ор***) - грани имеют направления (связь по отношению)
- ***Мульти*** - имеет ***кратные ребра*** - несколько **не**направленных ребер на одних и тех же вершинах
- ***Псевдо*** - одна вершина и несколько ребер

> ***Маршрут*** - последовательность вершина - ребро - ... - вершина. Если замкнут - называется ***циклом***, иначе ***цепью*** или ***путем***

- ***Связный*** граф - граф в котором между любыми двумя вершинами есть маршрут (т.е. нет вершин без граней)

***Подграф*** - кусок графа. ***Индуцированный (поражденный)*** подграф сохраняет все ребра графа

Соединенные ребром вершины называются ***смежные*** или ***инцедентные***

***Степень*** вершины - величина равная числу ребер, концом которых служит эта вершина

***Дерево*** - связанный ациклический граф
