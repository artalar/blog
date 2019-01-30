## Именование коммитов

### Описание

Название коммита должно состоять из 4 частей: фича (бизнес-сущность), техническая-сущность, тип изменения, описание. При этом фича может разделяться (точкой) на подфичи, а описание содержать номер задачи. Первые три части разделяются `/`, перед описанием ставится двоеточие:

```js
const commitMessage = `${featureName}.${subFeatureName}/${techType}/${changeType}: ${issueNumber} ${description}`;
```

### Примеры:

- **`shopCard.amount/style/mod: #27 outline`** - изменили стиль аутлайна для инпута суммы на корзине
- **`shopCard/test/add: #28 snapshots`** - добавлено снапшот-тестирование для корзины
- **`app/build/fix: #29 reduce bundle size`**

### Технические типы

- **logic** - business logic of user feature
- **style** - view (UI) of user feature
- **util** - utility functions and services
- **type** - types definition
- **test** - tests for functional
- **doc** - description and specification
- **example** - storybook, docz, etc
- **deps** - third party dependency changes (replaces, forks, API improves)
- **perf** - performance changes
- **pretty** - prettify formating, white-space, missing semi-colons, etc
- **config**: changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm), configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

### Типы модификаций

- **add** - new functional
- **mod** - modifying functional **with** behavior changes
- **fix** - correcting functional **without** behavior changes (refactor, inner interface updates)
- **del** - delete functional
