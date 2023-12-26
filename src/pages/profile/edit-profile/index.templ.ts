const template = `
<section class="profile profile--settings">
    <div class="profile__container">
        <div class="profile__nav">
            <a class="profile__nav-icon" href="/home"></a>
        </div>
        <div class="profile__wrapper">
            {{{avatar}}}

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
