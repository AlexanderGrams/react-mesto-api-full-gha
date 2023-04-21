<a name="readme-top"></a>


[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url]
<br>
![GitHub repo size](https://img.shields.io/github/repo-size/AlexanderGrams/react-mesto-api-full-gha?color=yellow&style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/AlexanderGrams/react-mesto-api-full-gha?color=blue&style=flat-square)
<!-- [![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->





<br />
<div align="end">
  <a href="https://grams.nomoredomains.monster">
    <img src="./frontend/src/images/logo_them-withe.svg" alt="Logo" width="400" height="100">
  </a>

  <h3 align="start">Проект: "Место"</h3>

  <p align="start">
    Данная работа выполняется в рамках образовательной программы <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>. Проект представляет собой создание отзывчиво-адаптивного интерфейса, а так же работа с удаленной базой данных с использованием современных технологий <a href="https://reactjs.org/">React</a> и <a href="https://expressjs.com/">Express</a>. Он повторяет основной функционал популярных соцсетей: <a href="https://www.instagram.com/">Instagram</a>, <a href="https://www.facebook.com/">Facebook</a>, <a href="https://vk.com/">VKontakte</a>.
  </p>
</div>

---


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Содержание</summary>
  <ol>
    <li>
      <a href="#о-проекте">О проекте</a>
      <ul>
        <li><a href="#функционал">Функционал</a></li>
        <li><a href="#стек-технологий">Стек технологий</a></li>
      </ul>
    </li>
    <li><a href="#установка">Установка</a></li>
    <li><a href="#использование">Использование</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#контакты">Контакты</a></li>
    <li><a href="#планы-по-доработке">Планы по доработке</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## О проекте


Данный проект - социальная сеть включающая фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Приложение "Место" изначально созданное на нативных технологиях при использовании парадигмы объектно орентированного программирования, проделалало большой путь до своего конечного вида. В финешной версии используются современные технологии разработки, ООП заменен на функциональный подход, приложение использует собственный Бэкенд, который в свою очередь так же как и Фронтенд теперь расположен на виртуальной машине.

Frontend https://grams.nomoredomains.monster

Backend https://api.grams.nomoredomains.monster/users

<a href="https://grams.nomoredomains.monster">![start-page-img](./frontend/src/images/readme-img.png)</a>



### Функционал

* Адаптивный интерфейс
* Обмен данными с сервером
* Открытие и закрытие модальных окон (по кнопке, оверлею и клавише "Escape")
* Модальное окно с увеличенной фотографией карточки
* Редактирование информации пользователя
* Обновление аватара
* Добавление новой карточки
* Добавление и снятие лайка (включая счетчик лайков)
* Удаление карточки с модальным окном подтверждения действия
* Спиннеры загрузки
* Валидация форм




### Стек технологий

В проекте использпользовались: 

* [![React][React.js]][React-url]
    * <a href="https://reactjs.org/docs/context.html">React context</a>
    * <a href="https://reactjs.org/docs/hooks-overview.html">React hoocks</a>
    * <a href="https://reactrouter.com/en/main">React router</a>
* [![JavaScript][JavaScript]][JavaScript-url]
    * <a href="https://reactjs.org/docs/introducing-jsx.html">расширение jsx</a>
* [![Webpack][Webpack]][Webpack-url]
* [![Npm][Npm]][Npm-url]
* [![Babel][Babel]][Babel-url]
* [![BEM][Bem]][Bem-url]
    * <a href="https://ru.bem.info/methodology/filestructure/#nested">BEM nested</a>
* [![Node][Node]][Node-url]
* [![Mongodb][Mongodb]][Mongodb-url]
* [![Express][Express]][Express-url]

<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- GETTING STARTED -->
## Установка

Для запуска проекта в своей среде разработке следуйте следующим инструкциям:

1. Клонируйте репозиторий
   ```sh
   git clone https://github.com/AlexanderGrams/react-mesto-api-full-gha.git
   ```
2. Установите пакеты NPM
   ```sh
   npm install
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Запустить приложение

    для Front-end
   ```sh
   npm run start
   ```

    для Back-end
   ```sh
   npm run dev
   ```
>* Если у вас не произошел автоматический переход в браузер с открытым приложением, введите в адресную строку самостоятельно -  [http://localhost:3000](http://localhost:3000)
>* В процессе изменения кода страница будет автоматически перезагружаться. 
>* Back-end работает на 3001 порту


<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- USAGE EXAMPLES -->
## Использование
В приложении вы можете:
<br>

* Редактировать информацию о себе и изменять свой аватар
<br>

<a href="https://grams.nomoredomains.monster/">![start-page-img](./frontend/src/images/readme-img-edit-profile.png)</a>
<br>

* Добавлять фото карточки с подписями, для этого необходимо придумать подпись и вставить ссылку на изображение
<br>

<a href="https://grams.nomoredomains.monster/">![start-page-img](./frontend/src/images/readme-img-add-card.png)</a>
<br>

* Оставлять реакцию на свои и чужие фотокарточки
<br>

<a href="https://grams.nomoredomains.monster/">![start-page-img](./frontend/src/images/readme-img-like-card.png)</a>
<br>

* Открывать изображения из фотокарточек в полном разрешении изображения
<br>

<a href="https://grams.nomoredomains.monster/">![start-page-img](./frontend/src/images/readme-img-popup.png)</a>
<br>

* Удалять карточки нажав корзину и далее подтвердив действие
<br>

<a href="https://grams.nomoredomains.monster/">![start-page-img](./frontend/src/images/readme-img-delet-card.png)</a>

<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- Plans for completion -->
## Планы по доработке

* добавление периодического автоматического обновления галереи карточек
* добавление функции сабмита форм нажатием на клавишу "Enter" (в настоящий момент работает только в случае клика пользователем по полю формы)

<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Если у вас есть предложение, которое сделало бы это проект лучше, пожалуйста, разветвите репозиторий и создайте запрос на извлечение. Вы также можете просто открыть проблему с тегом "улучшение". Спасибо за ваш вклад!

1. Скопируйте себе проект.
2. Создайте свою ветку удивительной функциональности (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте свои изменения (`git commit -m 'Add some AmazingFeature'`)
4. Толкните свою ветку (`git push origin feature/AmazingFeature`)
5. Откройте запрос на извлечение

<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- CONTACT -->
## Контакты

Александр Грамс (разработчик):
 - Телеграм - [@Monteg_451](https://t.me/Monteg_451)
 - Email - Alexander.Grams@yandex.ru

>Ссылка на проект: [https://github.com/AlexanderGrams/react-mesto-api-full-gha](https://github.com/AlexanderGrams/react-mesto-api-full-gha)

>Ссылка на хостинг Front-end: [https://grams.nomoredomains.monster](https://grams.nomoredomains.monster)

>Ссылка на хостинг Back-end: [https://api.grams.nomoredomains.monster/users](https://api.grams.nomoredomains.monster/users)

<p align="right">(<a href="#readme-top">вернуться на верх</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AlexanderGrams/react-mesto-api-full-gha.svg?style=for-the-badge
[contributors-url]: https://github.com/AlexanderGrams/react-mesto-api-full-gha/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AlexanderGrams/react-mesto-api-full-gha.svg?style=for-the-badge
[forks-url]: https://github.com/AlexanderGrams/react-mesto-api-full-gha/network/members
[stars-shield]: https://img.shields.io/github/stars/AlexanderGrams/react-mesto-api-full-gha.svg?style=for-the-badge
[stars-url]: https://github.com/AlexanderGrams/react-mesto-api-full-gha/stargazers
[issues-shield]: https://img.shields.io/github/issues/AlexanderGrams/react-mesto-api-full-gha.svg?style=for-the-badge
[issues-url]: https://github.com/AlexanderGrams/react-mesto-api-full-gha/issues
[license-shield]: https://img.shields.io/github/license/AlexanderGrams/react-mesto-api-full-gha.svg?style=for-the-badge
[license-url]: https://github.com/AlexanderGrams/react-mesto-api-full-gha/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png


[JavaScript]: https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=f7e01d
[JavaScript-url]: https://www.javascript.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Webpack]: https://img.shields.io/badge/webpack-20232A?style=for-the-badge&logo=webpack&logoColor=75afcc
[Webpack-url]: https://webpack.js.org/
[Npm]: https://img.shields.io/badge/npm-20232A?style=for-the-badge&logo=npm&logoColor=BC3433
[Npm-url]: https://www.npmjs.com/
[Babel]: https://img.shields.io/badge/babel-20232A?style=for-the-badge&logo=babel&logoColor=f5da55
[Babel-url]: https://babeljs.io/
[BEM]: https://img.shields.io/badge/BEM-20232A?style=for-the-badge&logo=bem&logoColor=ffffff
[BEM-url]: https://ru.bem.info/
[Node]: https://img.shields.io/badge/node.js-20232A?style=for-the-badge&logo=node.js&logoColor=green
[Node-url]: https://nodejs.org/en
[Mongodb]: https://img.shields.io/badge/mongodb-20232A?style=for-the-badge&logo=mongodb&logoColor=00ED64
[Mongodb-url]: https://www.mongodb.com/
[Express]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=Express&logoColor=ffffff
[Express-url]: https://expressjs.com/ru/