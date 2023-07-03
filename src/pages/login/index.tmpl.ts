const template = `
<div class="login">
    <div class="login__container">
    <h1 class="main-title">Вход</h1>
        <form>
            <div class="login__inputs">
                {{{inputLogin}}}
                {{{inputPassword}}}
            </div>
            <div class="login__buttons">
                {{{button}}} 
            </div>
        </form>
    </div>
</div>
`
export default template
