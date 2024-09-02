document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId'); 
    const authToken = localStorage.getItem('authToken');
    
    if (!userId || !authToken) {
        alert('User ID or auth token not found.');
        return;
    }

    // Fetch per l'user data
    function fetchUserData() {
        fetch(`/utenti/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken // Include the auth token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('name-display').innerText = data.nome + ' ' + data.cognome;
                document.getElementById('email-display').innerText = 'Email: ' + data.email;
                document.getElementById('peso-display').innerText = 'Peso: ' + data.peso;
                document.getElementById('altezza-display').innerText = 'Altezza: ' + data.altezza;

                document.getElementById('nome').value = data.nome;
                document.getElementById('cognome').value = data.cognome;
                document.getElementById('email').value = data.email;
                document.getElementById('peso').value = data.peso;
                document.getElementById('altezza').value = data.altezza;
            } else {
                alert('Failed to fetch user data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching user data.');
        });
    }

    // Fetch e display di user data
    fetchUserData();

    // Event listener per tasto di salvataggio
    document.getElementById('save-changes').addEventListener('click', function () {
        // Ottieni valori dei form
        const nome = document.getElementById('nome').value;
        const cognome = document.getElementById('cognome').value;
        const email = document.getElementById('email').value;
        const peso = document.getElementById('peso').value;
        const altezza = document.getElementById('altezza').value;

        // AJAX request per update credenziali utenti
        fetch(`/utenti/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify({
                nome: nome,
                cognome: cognome,
                email: email,
                peso: peso,
                altezza: altezza
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.id) {
                // Update con nuovi dati
                document.getElementById('name-display').innerText = nome + ' ' + cognome;
                document.getElementById('email-display').innerText = 'Email: ' + email;
                document.getElementById('peso-display').innerText = 'Peso: ' + peso;
                document.getElementById('altezza-display').innerText = 'Altezza: ' + altezza;

                // Hide the modal
                $('#editModal').modal('hide');
            } else {
                alert('Failed to update user credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating user credentials.');
        });
    });

    // Event listener per il Logout
    document.getElementById('logoutBtn').addEventListener('click', function () {
        // Flush token
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        // Redireziona a login
        window.location.href = 'login.html';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Funzione di fetch user data
    function getUserProfile() {
        // Recupero token
        const token = localStorage.getItem("token");

        // se non viene trovato un token, redireziona a login/mostra errore
        if (!token) {
            console.error("No token found. Please login.");
            // Optionally, redirect to login page
            // window.location.href = '/login.html';
            return;
        }

        // API endpoint per fetch user data
        const apiUrl = "http://localhost:8080/utenti/me";

        // API request con il token
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            return response.json();
        })
        .then(user => {
            // Estrae i dati rilevanti
            const { nome, email, peso, altezza } = user;

            // Display the data in the respective HTML elements
            document.getElementById("name-display").textContent = nome; // Match con 'name-display'
            document.getElementById("email-display").textContent = email;
            document.getElementById("peso-display").textContent = peso;
            document.getElementById("altezza-display").textContent = altezza;
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
        });
    }

    // Call funzione per mostrare i dati user
    getUserProfile();
});
