const switchers = document.getElementsByClassName('switcher');
//creo un eventListener per ogni pulsante
for (let pulsante of switchers) {
    pulsante.addEventListener('click', function() {
        //la funzione al click toglie la classe is-active a entrambi i container dei pulsanti
        for (let button of switchers) {
            button.parentElement.classList.remove('is-active');
        }
        //dopodiché aggiunge la classe is-active al container del pulsante premuto
        this.parentElement.classList.add('is-active');
    })
}
const btnCambio = document.getElementsByClassName('cambio');
//creo un eventListener per tutti i pulsanti cambio
for (let btn of btnCambio) {
    btn.addEventListener('click', function() {
        //la funzione al click nasconde il fieldset del pulsante
        this.parentElement.classList.add('hidden');
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.remove('hidden');
    })
}
function mostraPeso(peso) {
    document.getElementById('showPeso').innerText = peso + 'Kg';
}

async function login(event) {
    const formLogin = document.forms.item(0);
    console.log(formLogin);
}