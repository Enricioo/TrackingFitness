async function controlloAdmin() {
    const token=localStorage.getItem('authToken');
    //controllo se il token è associato a un utente
    try {
        const response = await fetch(`http://localhost:8080/utenti/me`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
        if (response.status==200) {
            const utente = await response.json();
            if (utente.ruolo=='ADMIN') {
                alert('Benvenuto amministratore!');
            } else {
                alert('Accesso utente non consentito!');
                window.location.href="./profile.html";
            }

        } else {
            alert('Accesso non concesso. Fai prima il log-in!');
            window.location.href="./login.html";
        }
    }catch(errore) {
        alert('Problema di connessione. Riprova più tardi');
    }
}
document.addEventListener('DOMContentLoaded', controlloAdmin());