const template = `
<section class="modal">
    <div class="modal__container">
        {{{close}}}
        <h2 class="modal__header">Создать чат</h2>
        <form id="modal">
            {{{input}}}
            {{{button}}}
        </form>
    </div>
</section>
`
export default template
