async function controlloAccesso() {
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
            alert('Benvenuto utente');

        } else {
            alert('Accesso non concesso. Fai prima il log-in!');
            window.location.href="./login.html";
        }
    }catch(errore) {
        alert('Problema di connessione. Riprova più tardi');
    }
}
document.addEventListener('DOMContentLoaded', controlloAccesso());