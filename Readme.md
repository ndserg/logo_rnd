# «Тестовое задание от Rocket Business»

**_Landing Page многопрофильной клиники_**

---

**[Проект On-Line](https://logornd.dendev.ru)**

#### Используемые технологии

- HTML
- SASS (SCSS)
- JS
- GULP

### Описание проекта

- Валидация HTML: W3C
- Адаптивная верстка Mobile First (3 Break Points: Mobile, Tablet, Desktop )
- Pixel-Perfect в браузерах последних версий: Chrome, Yandex Browser, Mozilla
- Протестировано на доступность и переполнение контента, загрузку нестандартных для макета изображений
- Изображения и иконки встроены inline в HTML для дальнейшей возможности использования CMS
- Структура - БЭМ
- JS: Мобильное меню, Слайдер, Контактная форма (+ сообщения об удачной / неудачной отправке)
- PHP: отправка писем с помощью контактной формы.

> Настройка отправки писем осуществляется в файле - send_mail.php. Поля необходимые для настройки отправки:

- _$mail->Host (ваш SMTP сервер)._
- _$mail->Username (ваш логин к SMTP серверу)._
- _$mail->Password (ваш пароль к SMTP серверу)._
- _$mail->setFrom (адрес электронной почты отправителя - ваш e-mail и заголовок письма)._
- _$mail->addAddress (e-mail на который вы хотите получать отправленные письма)._

### Сборка проекта

> Готовый проект формируется в папку - build.

- Перед сборкой и запуском проекта необходимо установить зависимости командой: `npm i`
- Сборка для разработки с запуском локального сервера: `npm start`
- Сборка "production": `npm run build`

### Скриншоты

![Скриншот Desktop](/screenshots/logornd_desktop.jpg)
![Скриншот Tablet](/screenshots/logornd_tablet.jpg)
![Скриншот Mobile](/screenshots/logornd_mobile.jpg)
