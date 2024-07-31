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
        err_msg.innerHTML='<b>Campo mancante!</b>';
        err_msg.classList.remove('hidden');
    } else {
        //i campi sono inseriti correttamente
        const username = formLogin['login-username'];
        const password = formLogin['login-password'];
        const utente = {
            username: username.value,
            password: password.value
        }
        //provo a fare il login
        try {
            const response = await fetch('http://localhost:8080/utenti/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utente)
            });
            if(response.status==200) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('authToken', token);
                redirect(token);
            } else {
                err_msg.innerHTML='<b>Utente non riconosciuto!</b>'
                err_msg.classList.remove('hidden');
            }
        }catch (error) {
            err_msg.innerHTML='<b>Errore di comunicazione con il server!<br> Controlla la tua connessione.</b>'
            err_msg.classList.remove('hidden');
        }
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
        const nuovoUtente = {
            nome: formSignup['signup-nome'].value,
            cognome: formSignup['signup-cognome'].value,
            username: formSignup['signup-username'].value,
            email: formSignup['signup-email'].value,
            password: formSignup['signup-password'].value,
            eta: formSignup['signup-eta'],
            peso: formSignup['signup-peso'].value,
            altezza: formSignup['signup-altezza'].value,
            ruolo: 'USER'
        }
        //provo a creare il nuovo utente
        try {
            const response = await fetch('http://localhost:8080/utenti/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuovoUtente)
            });
            if (response.status==201) {
                //utente creato
                const utente = {
                    username: formSignup['signup-username'].value,
                    password: formSignup['signup-password'].value
                }
                console.log(utente);
                try {
                    const risposta = await fetch('http://localhost:8080/utenti/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(utente)
                    });
                    if(risposta.status==200) {
                        const data = await risposta.json();
                        const token = data.token;
                        localStorage.setItem('authToken', token);
                        redirect(token);
                    } else {
                        err_msg.innerHTML='<b>Errore di comunicazione con il server!<br> Controlla la tua connessione.</b>';
                        err_msg.classList.remove('hidden');
                    }
                } catch(error) {
                    err_msg.innerHTML='<b>Errore di comunicazione con il server!<br> Controlla la tua connessione.</b>';
                    err_msg.classList.remove('hidden');
                }
            }else {
                err_msg.innerHTML='<b>Errore durante la registrazione.<br> Riprova più tardi.</b>';
                err_msg.classList.remove('hidden');
            }
        }catch (error) {
            err_msg.innerHTML='<b>Errore di comunicazione con il server!<br> Controlla la tua connessione.</b>';
            err_msg.classList.remove('hidden');
        }
    } else {
        if (errore) {
            err_msg.innerHTML='<b>Campo mancante!</b>';
            err_msg.classList.remove('hidden');
        }
        if (errorePw) {
            err_pw.classList.remove('hidden');
        }
    }
}

async function modificaPw() {
    const formNuovaPw = document.forms.item(2);
    const error_msg = document.getElementById('errore-nuova');
    const error_pw = document.getElementById('errore-pw-nuova');
    let errore = false;
    let errorePw = false;
    //controllo che siano stati inseriti tutti i campi
    for (let campo of formNuovaPw) {
        if (campo.type!='button') {
            if (campo.value=='') {
                if(!campo.classList.contains('errore')) {
                    campo.classList.add('errore');
                }
                errore = true;
            }
        }
    }
    //controllo che i due campi password coincidano
    if (formNuovaPw['nuova-password'].value!=formNuovaPw['nuova-conferma'].value) {
        if(!(formNuovaPw['nuova-password'].classList.contains('errore'))) {
            formNuovaPw['nuova-password'].classList.add('errore');
        }
        if(!(formNuovaPw['nuova-conferma'].classList.contains('errore'))) {
            formNuovaPw['nuova-conferma'].classList.add('errore');
        }
        errorePw = true;
    }
    if (!(errore)&&!(errorePw)) {
        //cambio password
        alert('ok cambio password');
    } else {
        if (errore) {
            error_msg.classList.remove('hidden');
        }
        if (errorePw) {
            error_pw.classList.remove('hidden');
        }
    }
}

function resetta(input, tipo) {
    let errore1 = null;
    let errore2 = null;
    if (tipo == 'login') {
        errore1 = document.getElementById('errore-login');
    } else if (tipo=='signup') {
        errore1 = document.getElementById('errore-signup');
        errore2 = document.getElementById('errore-pw');
    } else {
        errore1 = document.getElementById('errore-nuova');
        errore2 = document.getElementById('errore-pw-nuova');
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

function showHidePW(inputID, iconaClass) {
    //prendo le icone da cambiare
    let icona = document.getElementsByClassName(iconaClass);
    let password = document.getElementById(inputID);;
    if (password.type =='password') {
        password.type='text';
    } else {
        password.type='password';
    }
    for (let img of icona) {
        img.classList.toggle('hidden');
    }
}

function checkPwStrength(password, etichetta) {
    const pw = password.value;
    const msgStrength = document.getElementById(etichetta);
    const registratiBtn = document.getElementById('bottoneRegistrati');
    //faccio il controllo della forza solo se una password è stata inserita
    //e comprende tra gli 8 e i 16 caratteri
    if (pw != '') {
        if(pw.length>=8&&pw.length<=16) {
            //la password deve avere una lunghezza compresa tra 8 e 16 caratteri
            //dichiaro gli array con messaggio e colore da mostrare all'utente
            const msg = ['molto debole', 'debole', 'ok', 'forte', 'molto forte'];
            const color = ['#ff0000', '#F06E39', '#FFC300', '#8fce00', '#008000'];
            //rimuovo la disabilitazione al pulsante se ce l'ha
            if (registratiBtn.hasAttribute('disabled')) {
                registratiBtn.removeAttribute('disabled');
            }
            //calcolo la forza della password
            let forza = 0;
            if(pw.length > 12) {
                forza+=1;
            }
            arrayTest = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^0-9a-zA-Z]/ ];
            arrayTest.forEach(controllo => {
                if (controllo.test(pw)) {
                    forza+=1;
                }
            })
            //formatto il messaggio sulla forza in base al risultato
            msgStrength.innerHTML = '<b>'+msg[(forza-1)]+' <span data-bs-toggle="tooltip" data-bs-title="Consigli password?" style="color: black;">?</span></b>';
            msgStrength.style.color = color[(forza-1)];
            //mostro il messaggio all'utente
            msgStrength.classList.remove('hidden');
        } else {
            alert ('La lunghezza della password non va bene!');
            registratiBtn.setAttribute('disabled', '');
            //nascondo il messaggio sulla forza se è stato già mostrato
            if (!msgStrength.classList.contains('hidden')) {
                msgStrength.classList.add('hidden');
            }
        }
    } else {
        //nascondo il messaggio sulla forza se è stato già mostrato
        if (!msgStrength.classList.contains('hidden')) {
            msgStrength.classList.add('hidden');
        }
    }
    //dichiaro i tooltip
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function controlloUsername(username) {
    username = username.trim();
    if (username!="") {
        let controllo = false;
        fetch('http://localhost:8080/utenti')
            .then(res => res.json())
            .then(data => {
                for (let dato of data) {
                    let name = dato.username;
                    if (name==username) {
                        //lo username scelto è già presente nel DB
                        controllo = true;
                    }
                }
                if (controllo) {
                    //mostro il messaggio che lo username è già stato preso
                    document.getElementById('username-error').classList.remove('hidden');
                    //impedisco all'utente di andare avanti
                    if (!document.getElementById('primo-continua').hasAttribute('disabled')) {
                        document.getElementById('primo-continua').setAttribute('disabled', '');
                    }
                    //mi assicuro che l'altro messaggio sia nascosto
                    if (!document.getElementById('username-ok').classList.contains('hidden')) {
                        document.getElementById('username-ok').classList.add('hidden');
                    }
                } else {
                    //mostro il messaggio che lo username va bene
                    document.getElementById('username-ok').classList.remove('hidden');
                    document.getElementById('primo-continua').removeAttribute('disabled');
                    //mi assicuro che l'altro messaggio sia nascosto
                    if (!document.getElementById('username-error').classList.contains('hidden')) {
                        document.getElementById('username-error').classList.add('hidden');
                    }
                }
            });
    } else {
        //mi assicuro di nascondere enstrambi i messaggi
        if (!document.getElementById('username-error').classList.contains('hidden')) {
            document.getElementById('username-error').classList.add('hidden');
        }
        if (!document.getElementById('username-ok').classList.contains('hidden')) {
            document.getElementById('username-ok').classList.add('hidden');
        }
        document.getElementById('primo-continua').removeAttribute('disabled');
    }
}

function pwDimenticata() {
    const sezioni = document.getElementsByClassName('forms-section');
    for (let section of sezioni) {
        section.classList.toggle('hidden');
    }
}

async function redirect(token) {
    try {
        const response = await fetch(`http://localhost:8080/utenti/me`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => res.json()).then(data => {
            if(data.ruolo=='USER') {
                window.location.href="./index.html";
            } else {
                window.location.href="./admin-profile.html";
            }
        })
    } catch (error) {
        console.error("Errore nel trovare l'utente");
    } 
}