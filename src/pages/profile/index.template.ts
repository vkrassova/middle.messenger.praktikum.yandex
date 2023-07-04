const template = `
<section class="profile">
    <div class="profile__container">
        <div class="profile__nav">
            <a class="profile__nav-icon" href="/">
                <img src={{icon}} alt="exit">
            </a>
        </div>
        <div class="profile__wrapper">
            <div class="profile__avatar">
                <div class="profile__avatar-icon"><img src={{avatarIcon}} alt="avatar's cover"></div>
                <input type="file" id="file" class="profile__avatar-input" name="avata"/>
                <img src="" id="avatar" alt="avatar">
            </div>

            <p class="profile__name">{{name}}</p>
            <ul class="profile__fields">
                <li class="profile__fields-item"><span class="profile__fields-name">Почта</span>
                <span class="profile__fields-value">pochta@yandex.ru</span>
                </li>
                <li class="profile__fields-item"><span class="profile__fields-name">Логин</span><span class="profile__fields-value">Текст</span></li>
                <li class="profile__fields-item"><span class="profile__fields-name">Имя</span><span class="profile__fields-value">Текст</span></li>
                <li class="profile__fields-item"><span class="profile__fields-name">Фамилия</span><span class="profile__fields-value">Текст</span></li>
                <li class="profile__fields-item"><span class="profile__fields-name">Имя в чате</span><span class="profile__fields-value">Текст</span></li>
                <li class="profile__fields-item"><span class="profile__fields-name">Телефон</span><span class="profile__fields-value">8 (999) 00 00 00</span></li>
            </ul>

            <div class="profile__buttons">
            <button class="profile__edit">Изменить пароль</button>
            <a href="/settings" class="profile__edit">Изменить данные</a>

            {{{buttonExit}}}
            </div>
        </div>
    </div>
</section> 
`
export default template
