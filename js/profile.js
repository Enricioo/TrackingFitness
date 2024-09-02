document.getElementById('save-changes').addEventListener('click', function () {
    // Ottiene valori form
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const peso = document.getElementById('peso').value;
    const altezza = document.getElementById('altezza').value;

    const token = localStorage.getItem('authToken');

    if (token) {
        $.ajax({
            url: 'http://localhost:8080/utenti/me',
            type: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                nome: nome,
                cognome: cognome,
                email: email,
                peso: peso,
                altezza: altezza
            }),
            success: function(response) {
                // Aggiorna dati profilo
                document.getElementById('name-display').innerText = nome + ' ' + cognome;
                document.getElementById('email-display').innerText = 'Email: ' + email;
                document.getElementById('peso-display').innerText = 'Peso: ' + peso;
                document.getElementById('altezza-display').innerText = 'Altezza: ' + altezza;

                // Nasconde il modal
                $('#editModal').modal('hide');
            },
            error: function(xhr, status, error) {
                console.error('Errore inserimento dati utente:', error);
            }
        });
    } else {
        // Se non viene trovato un token, redireziona al login
        window.location.href = 'login.html';
    }
});
