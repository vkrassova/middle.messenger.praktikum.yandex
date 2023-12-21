const template = `
<section class="modal modal__chat">
    <div class="modal__container">
        {{{close}}}
        <h2 class="modal__title">{{title}}</h2>
        <form id="modal">
            {{{input}}}
            {{{button}}}
        </form>
    </div>
</section>
`
export default template
