//creare l'endpoint "/logout" nell'API
async function logout() {
    const token = localStorage('authToken');
    try {
        const response = await fetch('http://localhost:8080/utenti/logout', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            }
        });
        if(response.status === 200) {
            localStorage.removeItem('authToken');
            console.log('logout ok');
            //rimando alla pagina del login
            window.location.href="./login.html";
        } else {
            console.err('Procedura di logout non valida. Riprova');
        }
    } catch (error) {
        console.err('Errore. Accesso non effettuato');
    }
}

// Event listener del bottone per la gestione del logout
document.getElementById('logoutButton').addEventListener('click', async function (event) {
    event.preventDefault();
    await logout();
});