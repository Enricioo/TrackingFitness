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
    const err_msg = document.getElementById('errore-login');
    let errore = false;
    //controllo il corretto inserimento di tutti i dati
    //mi assicuro che la classe mancante venga aggiunta una sola volta
    for (let campo of formLogin) {
        if (campo.type!='button') {
            if(campo.value=="") {
                if(!campo.classList.contains('errore')) {
                    campo.classList.add('errore');
                }
                errore = true;
            }
        }
    }
    if (errore) {
        err_msg.classList.remove('hidden');
    } else {
        //login.
        console.log('ok login');
    }
}

async function signup(event) {
    const formSignup = document.forms.item(1);
    let errore = false;
    const err_msg1 = document.getElementById('errore-signup1');
    const err_msg2 = document.getElementById('errore-signup2');
    const err_msg3 = document.getElementById('errore-signup3');
    //controllo il corretto inserimento di tutti i dati
    for (let campo of formSignup) {
        if (campo.type!='button') {
            if (campo.type!='range') {
                if (campo.type!='checkbox') {
                    if (campo.value == "") {
                        if (!(campo.classList.contains('errore'))) {
                            campo.classList.add('errore');
                        }
                        errore = true;
                    }
                } else {
                    if (campo.checked == false) {
                        if (!(campo.parentElement.classList.contains('errore'))) {
                            campo.parentElement.classList.add('errore');
                        }
                        errore = true;
                    }
                }
            } else {
                if (document.getElementById('showPeso').innerText == "") {
                    if (!(document.getElementById('showPeso').parentElement.classList.contains('errore'))) {
                        document.getElementById('showPeso').parentElement.classList.add('errore');
                    }
                    errore = true;
                }
            }
        }
    }
    //controllo le password se sono uguali
    if (errore) {
        err_msg1.classList.remove('hidden');
        err_msg2.classList.remove('hidden');
        err_msg3.classList.remove('hidden');
    } else {
        //signup
        console.log('ok signup');
    }
}

function resetta(input, tipo) {
    let errore1 = null;
    let errore2 = null;
    let errore3 = null;
    if (tipo == 'login') {
        errore1 = document.getElementById('errore-login');
    } else {
        errore1 = document.getElementById('errore-signup1');
        errore2 = document.getElementById('errore-signup2');
        errore3 = document.getElementById('errore-signup3');
    }
    //tolgo i messaggi di errore se ci sono
    if(!(errore1.classList.contains('hidden'))) {
        errore1.classList.add('hidden');
    }
    //ripeto il procedimento per errore2 ed errore3 se non sono nulli
    if(errore2!=null) {
        if(!(errore2.classList.contains('hidden'))) {
            errore2.classList.add('hidden');
        }
    }
    if(errore3!=null) {
        if(!(errore3.classList.contains('hidden'))) {
            errore3.classList.add('hidden');
        }
    }
    //tolgo la segnalazione di errore dall'input
    if (input.type!='range') {
        if (input.type!='checkbox') {
            if(input.classList.contains('errore')) {
                input.classList.remove('errore');
            }
        } else {
            if (input.parentElement.classList.contains('errore')) {
                input.parentElement.classList.remove('errore');
            }
        }
    } else {
        if (document.getElementById('showPeso').parentElement.classList.contains('errore')) {
            document.getElementById('showPeso').parentElement.classList.remove('errore');
        }
    }
}