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
        alert('ok accesso');
    }
}

async function signup(event) {
    const formSignup = document.forms.item(1);
    let errore = false;
    let errorePw = false;
    const err_msg = document.getElementById('errore-signup');
    const err_pw = document.getElementById('errore-pw');
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
    if (formSignup['signup-password'].value!=formSignup['signup-conferma'].value) {
        if (!formSignup['signup-password'].classList.contains('errore')) {
            formSignup['signup-password'].classList.add('errore');
        }
        if (!formSignup['signup-conferma'].classList.contains('errore')) {
            formSignup['signup-conferma'].classList.add('errore');
        }
        errorePw = true;
    }
    if (!(errore)&&!(errorePw)) {
        //signup
        alert('ok registrazione');
    } else {
        if (errore) {
            err_msg.classList.remove('hidden');
        }
        if (errorePw) {
            err_pw.classList.remove('hidden');
        }
    }
}

function resetta(input, tipo) {
    let errore1 = null;
    let errore2 = null;
    if (tipo == 'login') {
        errore1 = document.getElementById('errore-login');
    } else {
        errore1 = document.getElementById('errore-signup');
        errore2 = document.getElementById('errore-pw');
    }
    //tolgo i messaggi di errore se ci sono
    if(!(errore1.classList.contains('hidden'))) {
        errore1.classList.add('hidden');
    }
    //ripeto il procedimento per l'errore2 se non è nullo
    if(errore2!=null) {
        if(!(errore2.classList.contains('hidden'))) {
            errore2.classList.add('hidden');
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