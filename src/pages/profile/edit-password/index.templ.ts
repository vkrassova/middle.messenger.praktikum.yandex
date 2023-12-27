const template = `
<section class="profile profile--settings">
    <div class="profile__container">
        <div class="profile__nav">
            <a class="profile__nav-icon" href="/messenger"></a>
        </div>
        <div class="profile__wrapper">
            {{{avatar}}}

            <form class="profile__fields profile__fields--settings">
                {{{oldPassword}}}
                {{{newPassword}}}
                {{{repeatPassword}}}
                <div class="profile__buttons">
                {{{buttonSave}}}
                </div>
            </form>
        </div>
    </div>
</section>
`
export default template
