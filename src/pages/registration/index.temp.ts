const template = `
  <section class="registration">
    <div class="container registration__container">
        <h1 class="main-title">{{title}}</h1>
            <form>
                <div class="registration__inputs">
                    {{{inputEmail}}}
                    {{{inputLogin}}}
                    {{{inputFirstName}}}
                    {{{inputSecondName}}}
                    {{{inputPhone}}}

                    <div class="registration__passwords">
                      {{{inputPassword}}}
                      {{{inputPasswordRepeat}}}
                    </div>
                </div>

                <div class="registration__buttons">
                    <a href="/login" class="button button--fill" type={{type}}>Войти</a>
                    {{{buttonSubmit}}}
                </div>
            </form>
    </div>
  </section>
`

export default template
