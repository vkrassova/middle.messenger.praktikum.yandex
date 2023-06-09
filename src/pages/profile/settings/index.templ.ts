const template = `
<section class="profile profile--settings">
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

            <form class="profile__fields profile__fields--settings">
                <div class="profile__fields-item"><span class="profile__fields-name">Почта</span>
                {{{inputEmail}}}
                </div>
                <div class="profile__fields-item">
                <span class="profile__fields-name">Логин</span>
                {{{inputLogin}}}
                </div>
                <div class="profile__fields-item">
                <span class="profile__fields-name">Имя</span>
                {{{inputFirsName}}}
                </div>
                <div class="profile__fields-item">
                <span class="profile__fields-name">Фамилия</span>
                {{{inputSecondName}}}
                </div>
                <div class="profile__fields-item">
                <span class="profile__fields-name">Имя в чате</span>
                {{{inputNickName}}}
                </div>
                <div class="profile__fields-item">
                <span class="profile__fields-name">Телефон</span>
                {{{inputPhone}}}
                </div>

                <div class="profile__buttons">
                {{{buttonSave}}}
                </div>
            </form>
        </div>
    </div>
</section> 
`
export default template
