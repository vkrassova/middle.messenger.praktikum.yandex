const template = `
<section class="profile">
    <div class="profile__container">
        <div class="profile__nav">
            <a class="profile__nav-icon" href="/messenger"></a>
        </div>
        <div class="profile__wrapper">
            {{{avatar}}}
            <p class="profile__name">{{name}}</p>
            <div class="profile__fields">
            {{{first_name}}}
            {{{second_name}}}
            {{{display_name}}}
            {{{login}}}
            {{{email}}}
            {{{phone}}}
            </div>

            <div class="profile__buttons">
            <a href="/editPassword" class="profile__edit">Изменить пароль</a>
            <a href="/settings" class="profile__edit">Изменить данные</a>

            {{{buttonExit}}}
            </div>
        </div>
    </div>
</section>
`
export default template
