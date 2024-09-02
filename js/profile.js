document.addEventListener("DOMContentLoaded", function () {
    // Funzione fetch e display
    function getUserProfile() {
        // Recupera token
        const token = localStorage.getItem("authToken");
        console.log(token);
        // Se non viene trovato un token, redireziona al login e mostra un errore
        if (!token) {
            console.error("No token found. Please login.");
            // window.location.href = '/login.html';
            return;
        }

        // API endpoint per fetch user data
        const apiUrl = "http://localhost:8080/utenti/me";

        // API request con il token
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `${token}`,
                //"Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            return response.json();
        })
        .then(user => {
            // Estrai dati rilevanti
            const { nome, email, peso, altezza } = user;

            console.log(user);
            // Display dei dati con i corrispondenti elementi lato html
            document.getElementById("name-display").textContent = nome;
            document.getElementById("email-display").textContent = email;
            document.getElementById("peso-display").textContent = 'Peso: '+peso+' kg';
            document.getElementById("altezza-display").textContent = 'Altezza: '+altezza+' cm';
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
        });
    }

    // Call funzione per mostrare i dati utente
    getUserProfile();
});
