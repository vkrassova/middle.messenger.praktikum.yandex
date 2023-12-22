const template = `
<section class="modal {{class}}">
    <div class="modal__container">
        {{{close}}}
        <h2 class="modal__title">{{title}}</h2>
        <form id="modal-form">
            {{{input}}}
            {{{button}}}
        </form>
    </div>
</section>
`
export default template
