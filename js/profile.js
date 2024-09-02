document.getElementById('save-changes').addEventListener('click', function () {
    // Ottiene i valori dei form
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const peso = document.getElementById('peso').value;
    const altezza = document.getElementById('altezza').value;

    // Update del profilo
    document.getElementById('name-display').innerText = nome + ' ' + cognome;
    document.getElementById('email-display').innerText = 'Email: ' + email;
    document.getElementById('peso-display').innerText = 'Peso: ' + peso;
    document.getElementById('altezza-display').innerText = 'Altezza: ' + altezza;

    // Nasconde il modal
    $('#editModal').modal('hide');
});

$(document).ready(function () {
    // Funzione per il fetch dei dati utente
    function fetchUserData() {
        const token = localStorage.getItem('authToken');

        if (token) {
            $.ajax({
                url: 'http://your-api-url/utenti/me',
                type: 'GET',
                headers: {
                    'Authorization': token
                },
                success: function(response) {
                    // Riempie i campi con le informazioni necessarie
                    $('#name-display').text(response.nome + ' ' + response.cognome);
                    $('#email-display').text('Email: ' + response.email);
                    $('#peso-display').text('Peso: ' + response.peso);
                    $('#altezza-display').text('Altezza: ' + response.altezza);
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching user data:', error);
                    // Redireziona al login se l'accesso non è autorizzato
                    if (xhr.status === 401) {
                        window.location.href = 'login.html';
                    }
                }
            });
        } else {
            // Se nessun token viene trovato, redireziona alla pagina di login
            window.location.href = 'login.html';
        }
    }

    // Call fetchUserData quando la pagina viene aperta
    fetchUserData();
});
