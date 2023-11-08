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
            </div>

            <p class="profile__name">{{name}}</p>
            <div class="profile__fields">
            {{{login}}}
            </div>

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
