document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display user data
    function getUserProfile() {
        // Retrieve the token from localStorage (or sessionStorage)
        const token = localStorage.getItem("token");

        // If no token is found, redirect to login or show an error
        if (!token) {
            console.error("No token found. Please login.");
            // Optionally, redirect to login page
            // window.location.href = '/login.html';
            return;
        }

        // API endpoint to fetch user data
        const apiUrl = "http://localhost:8080/utenti/me";

        // Make the API request with the token in the Authorization header
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Send the token with Bearer
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
            // Extract the relevant data from the user object
            const { nome, email, peso, altezza } = user;

            // Display the data in the respective HTML elements
            document.getElementById("name-display").textContent = nome; // Match with 'name-display'
            document.getElementById("email-display").textContent = email;
            document.getElementById("peso-display").textContent = peso;
            document.getElementById("altezza-display").textContent = altezza;
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
        });
    }

    // Call the function to get and display the user profile
    getUserProfile();
});
