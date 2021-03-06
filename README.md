# EmojiHub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

- [x] на всех страницах список эмоджи с гитхаба <https://api.github.com/emojis>
- [x] список должен быть в актуальном состоянии при каждом обновлении страницы
- [x] слева блок навигации с тремя пунктами меню
- [x] активный пункт меню должен быть выделен
- [x] над списком - заголовок и строка поиска по названию эмоджи
- [x] таблица должна иметь следующие колонки - имя, ссылка (путь до эмоджи), превью(эмоджи размером 25x25), `[*]`(иконка звездочки), `[x]`(иконка удалить)
- [x] при наведении на превью эмоджи должна всплывать полноразмераная картинка
- [x] при нажатии на `[*]` эмоджи добавляется в список любимых и меняет иконку на более яркую
- [x] при нажатии на `[x]` эмоджи удаляется из текущего списка и добавляется в список удаленного
- [x] при обновлении страницы состояние списков должно сохранятся
- [x] список удаленных аналогичен основном списку, за исключением наличия действия `[восстановить]`, и отсутвием `[*]` `[x]`
- [x] действие `[восстановить]` удаляет эмоджи из списка удаленных и добавляет в основной список
- [x] список любимых аналогичен основном списку, за исключением отсутсия `[*]`
- [x] в списке любимых `[x]` удаляет эмоджи из списка любимых и меняет состояние в основном списке

## Отсебятина

- Вместо `[x]` и `[*]` использовал иконки.
- Добавил кнопку `show more`
- Базовая обработка ошибок сервера и спиннер при загрузке данных
- bootstrap

## Технологии

- Angular 12.2.0
- bootstrap 5
- rxjs 6.6.0
- eslint
- typescript

## Запуск

Run `npm start` for a dev server. Navigate to <http://localhost:4200/>.

## Gh-pages

<https://doyouwannatea.github.io/emoji-hub/>
