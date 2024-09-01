document.getElementById('save-changes').addEventListener('click', function () {
    // Get the form values
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const peso = document.getElementById('peso').value;
    const altezza = document.getElementById('altezza').value;

    // Update the profile display
    document.getElementById('name-display').innerText = nome + ' ' + cognome;
    document.getElementById('email-display').innerText = 'Email: ' + email;
    document.getElementById('peso-display').innerText = 'Peso: ' + peso;
    document.getElementById('altezza-display').innerText = 'Altezza: ' + altezza;

    // Hide the modal
    $('#editModal').modal('hide');
});

