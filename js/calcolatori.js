document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('activity');

    if (id === '1') {
        document.getElementById('running').classList.add('active');
        document.getElementById('corsaBtn').classList.add('active');
    } else if (id === '2') {
        document.getElementById('running').classList.remove('active');
        document.getElementById('corsaBtn').classList.remove('active');
        document.getElementById('biking').classList.add('active');
        document.getElementById('ciclismoBtn').classList.add('active');
    } else if (id === '3') {
        document.getElementById('running').classList.remove('active');
        document.getElementById('corsaBtn').classList.remove('active');
        document.getElementById('swimming').classList.add('active');
        document.getElementById('nuotoBtn').classList.add('active');
    }
});

function showCalculator(calculator) {
    document.querySelectorAll('.calculator').forEach(calc => calc.classList.remove('active'));
    document.getElementById(calculator).classList.add('active');

    document.querySelectorAll('.toggle-buttons button').forEach(button => button.classList.remove('active'));
    document.querySelector(`.toggle-buttons button[onclick="showCalculator('${calculator}')"]`).classList.add('active');
}

function calculateRunningCalories() {
    const weight = parseFloat(document.getElementById('running-weight').value);
    const distance = parseFloat(document.getElementById('running-distance').value);
    const duration = parseFloat(document.getElementById('running-duration').value);
    const grade = parseFloat(document.getElementById('running-grade').value);

    if (isNaN(weight) || isNaN(distance) || isNaN(duration) || isNaN(grade)) {
        document.getElementById('running-result').innerText = "Inserisci valori validi.";
        return;
    }

    const speed = distance / (duration / 60);
    let met = getRunningMet(speed, grade);

    if (met === -1) {
        document.getElementById('running-result').innerText = "La velocità supera il limite massimo consentito, fornisci dati reali.";
        return;
    }

    const calories = met * weight * (duration / 60);
    document.getElementById('running-result').innerText = calories.toFixed(2);
}

function getRunningMet(speed, grade) {
    let met = 0;
    const maxSpeed = 40; // Maximum speed for MET values

    if (speed > maxSpeed) {
        return -1; // Return -1 to indicate an error
    }

    if (speed <= 8) met = 8.3; 
    else if (speed <= 9.7) met = 9.8; 
    else if (speed <= 10.8) met = 10.5; 
    else if (speed <= 12.1) met = 11.8; 
    else if (speed <= 14.5) met = 12.8; 
    else if (speed <= 16.1) met = 14.5; 
    else if (speed <= 17.5) met = 16;   
    else if (speed <= 20) met = 18;     
    else if (speed <= 25) met = 20;     
    else if (speed <= 30) met = 25;     
    else if (speed <= 40) met = 35;     
    else met = 45; // MET for running at 48 km/h (extreme sprint)

    if (grade !== 0) {
        met += (met * grade * 0.02);
    }

    return met;
}

function calculateBikingCalories() {
    const weight = parseFloat(document.getElementById('biking-weight').value);
    const distance = parseFloat(document.getElementById('biking-distance').value);
    const duration = parseFloat(document.getElementById('biking-duration').value);

    if (isNaN(weight) || isNaN(distance) || isNaN(duration)) {
        document.getElementById('biking-result').innerText = "Inserisci valori validi.";
        return;
    }

    const speed = distance / (duration / 60);
    const met = getBikingMet(speed);

    if (met === -1) {
        document.getElementById('biking-result').innerText = "La velocità supera il limite massimo consentito, fornisci dati reali.";
        return;
    }

    const calories = met * weight * (duration / 60);
    document.getElementById('biking-result').innerText = calories.toFixed(2);
}

function getBikingMet(speed) {
    let met = 0;
    const maxSpeed = 100; // Maximum speed for MET values

    if (speed > maxSpeed) {
        return -1; // Return -1 to indicate an error
    }

    if (speed <= 10) met = 4;       
    else if (speed <= 12) met = 6.8;  
    else if (speed <= 14) met = 8;  
    else if (speed <= 16) met = 10; 
    else if (speed <= 19) met = 12; 
    else if (speed <= 22) met = 15.8; 
    else if (speed <= 25) met = 19;   
    else if (speed <= 30) met = 23;   
    else if (speed <= 40) met = 30;   
    else if (speed <= 50) met = 40;   
    else if (speed <= 60) met = 50;   
    else if (speed <= 100) met = 75;  
    else if (speed <= 150) met = 100; 
    else if (speed <= 200) met = 150; 
    else met = 200;                   

    return met;
}

function calculateSwimmingCalories() {
    const weight = parseFloat(document.getElementById('swimming-weight').value);
    const duration = parseFloat(document.getElementById('swimming-duration').value);
    const style = document.getElementById('swimming-style').value;

    if (isNaN(weight) || isNaN(duration)) {
        document.getElementById('swimming-result').innerText = "Inserisci valori validi.";
        return;
    }

    const met = getSwimmingMet(style);
    const calories = met * weight * (duration / 60);
    document.getElementById('swimming-result').innerText = calories.toFixed(2);
}

function getSwimmingMet(style) {
    const metValues = {
        freestyle: 8.3,       // Moderate effort
        breaststroke: 10.3,   // Vigorous effort
        butterfly: 13.8       // Vigorous effort
    };
    return metValues[style] || 8.3;
}

function saveActivity(activityType) {
    const weight = parseFloat(document.getElementById(`${activityType}-weight`).value);
    const distance = parseFloat(document.getElementById(`${activityType}-distance`).value);
    const duration = parseFloat(document.getElementById(`${activityType}-duration`).value);
    const calories = parseFloat(document.getElementById(`${activityType}-result`).innerText);
    const sportDate = new Date().toISOString().split('T')[0];
    const utente = 1;

    const activityData = {
        tipo: activityType,
        durata: duration,
        distanza: distance,
        calorie: calories,
        sportDate: sportDate,
        utente: utente
    };

    fetch('/saveActivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.success ? 'Attività salvata con successo.' : 'Errore nel salvataggio dell\'attività.');
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Errore nel salvataggio dell\'attività.');
    });
}
