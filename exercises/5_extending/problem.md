Паттерны помогают нам легко расширять функциональность приложения. Вместо изменения существующей логики, мы легко добавляем новые паттерны.

К примеру, мы приветствуем всех посетителей на английском языке и выводим сообщение:
```javascript
bishop.add('role: greetings, action: hello', message => {
  return `Hello, ${message.user}!`
})

const profile = {
  user: 'Vasya',
  lang: 'en'
}
bishop.act('role: greetings, action: hello', profile).then(console.log)
// 'Hello, Vasya'
```

Теперь мы добавим финский:

```javascript
bishop.add('role: greetings, action: hello, lang: fi', message => {
  return `Hei, ${message.user}`
})

const profile = {
  user: 'Vasya',
  lang: 'fi'
}
bishop.act('role: greetings, action: hello', profile).then(console.log)
// 'Hei, Vasya'
```

# Задача
Возьмите модуль math.js из предыдущих упражнений, и добавьте туда сервис который возвращает число в форме строки (расписать подробнее).
