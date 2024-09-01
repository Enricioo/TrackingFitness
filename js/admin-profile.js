document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage
    
    if (!userId || !authToken) {
        alert('User ID or auth token not found.');
        return;
    }

    // Function to fetch and display user data
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
                // Populate profile display with user data
                document.getElementById('name-display').innerText = data.nome + ' ' + data.cognome;
                document.getElementById('email-display').innerText = 'Email: ' + data.email;
                document.getElementById('peso-display').innerText = 'Peso: ' + data.peso;
                document.getElementById('altezza-display').innerText = 'Altezza: ' + data.altezza;

                // Populate edit form with current values
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

    // Fetch and display user data when the page loads
    fetchUserData();

    // Event listener for Save Changes button
    document.getElementById('save-changes').addEventListener('click', function () {
        // Get the form values
        const nome = document.getElementById('nome').value;
        const cognome = document.getElementById('cognome').value;
        const email = document.getElementById('email').value;
        const peso = document.getElementById('peso').value;
        const altezza = document.getElementById('altezza').value;

        // Make an AJAX request to update the user's credentials
        fetch(`/utenti/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken // Include the auth token
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
                // Update the profile display with the new data
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

    // Event listener for Logout button
    document.getElementById('logoutBtn').addEventListener('click', function () {
        // Clear the token from localStorage or sessionStorage
        localStorage.removeItem('authToken'); // If the token is stored in localStorage
        sessionStorage.removeItem('authToken'); // If the token is stored in sessionStorage

        // Optionally, redirect to the login page or another page
        window.location.href = 'login.html'; // Change 'login.html' to your login page path
    });
});
