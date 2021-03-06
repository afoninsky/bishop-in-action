В своих системах мы хотим использовать различные системы взаимодействия микросервисов. Передача сообщений может быть осуществлена через сервер очередей (например, rabbitmq), http-транспорт, tcp-сокеты и так далее.

Предположим, что мы хотим связать две копии bishop на разных компьютерах в одну сеть. Для этого мы можем использовать транспорт `http`. При этом, мы автоматически получим REST API-интерфейс к сервису, и им смогут пользоваться другие приложения.

Создадим сервис на хосте `computer-first`:
```javascript
const service = require('bishop')()

service.add('role: test, command: hello', () => { return 'Hello, world!' } )

service.use('bishop-http', {
  listenPort: 8080
}).then(() => {
  service.listen()
})

```
Мы можем убедиться что сервис слушает на порту 8080 выполнив команду `curl -X POST http://computer-first:8080`.

Теперь подключимся с помощью клиента с хоста `computer-second` и добавим ссылку на сервис:
```javascript
const client = require('bishop')()

client.use('bishop-http', {
  name: 'remote-computer',
  address: ' http://computer-first:8080',
}).then(() => {
  client.add('role: test' , 'remote-computer')
})

```

Готово. После этой операции, в нашем клиентском приложении все маршруты, содержащие `role: test`, будут перенаправляться на хост `computer-first`:
```javascript
client.act('role: test, command: some').then(console.log)
// 'Hello, world!'
```


Возможность использовать транспортные плагины дает нам широкий простор для написания микросервисов. Мы можем выносить бизнес-логику на соседние процессы, машины или континенты. В любом из этих случаев вам не придется думать как доставить сообщение нужному сервису, библиотека сделает это за нас. Более того, мы можем использовать одновременно несколько различных транспортов, или безболезненно менять один на другой.

Все что нам требуется - создать соответствующие паттерны, и указать какой транспорт использовать для обращения к их сервисам.

# Задача
Используя код, приведенный выше, модифицируйте свой сервис, чтобы он ожидал входящие подключения на порту `3000`.

# Ссылки
* https://github.com/afoninsky/bishop-http - транспорт для взаимодействия сервисов через http-протокол
