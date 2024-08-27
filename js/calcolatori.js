document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('activity');

    if (id === '1') {
        document.getElementById('running').classList.add('active');
        document.getElementById('corsaBtn').classList.add('active');
    } else if (id === '2') {
        document.getElementById('biking').classList.add('active');
        document.getElementById('ciclismoBtn').classList.add('active');
    } else if (id === '3') {
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

    const calories = met * weight * (duration / 60);
    document.getElementById('running-result').innerText = calories.toFixed(2);
}

function getRunningMet(speed, grade) {
    let met = 0;

    if (speed <= 8) met = 8.3; // MET for running at 8 km/h
    else if (speed <= 9.7) met = 9.8; // MET for running at 9.7 km/h
    else if (speed <= 10.8) met = 10.5; // MET for running at 10.8 km/h
    else if (speed <= 12.1) met = 11.8; // MET for running at 12.1 km/h
    else if (speed <= 14.5) met = 12.8; // MET for running at 14.5 km/h
    else if (speed <= 16.1) met = 14.5; // MET for running at 16.1 km/h
    else if (speed <= 17.5) met = 16;   // MET for running at 17.5 km/h
    else if (speed <= 20) met = 18;     // MET for running at 20 km/h
    else if (speed <= 25) met = 20;     // MET for running at 25 km/h
    else if (speed <= 30) met = 25;     // MET for running at 30 km/h
    else if (speed <= 40) met = 35;     // MET for running at 40 km/h
    else met = 45;                      // MET for running at 48 km/h (extreme sprint)

    // Adjust MET for grade
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

    const calories = met * weight * (duration / 60);
    document.getElementById('biking-result').innerText = calories.toFixed(2);
}

function getBikingMet(speed) {
    let met = 0;

    if (speed <= 10) met = 4;       // Leisurely biking
    else if (speed <= 12) met = 6.8;  // Biking at 12 km/h
    else if (speed <= 14) met = 8;  // Biking at 14 km/h
    else if (speed <= 16) met = 10; // Biking at 16 km/h
    else if (speed <= 19) met = 12; // Biking at 19 km/h
    else if (speed <= 22) met = 15.8; // Biking at 22 km/h
    else if (speed <= 25) met = 19;   // Biking at 25 km/h
    else if (speed <= 30) met = 23;   // Biking at 30 km/h
    else if (speed <= 40) met = 30;   // Biking at 40 km/h
    else if (speed <= 50) met = 40;   // Biking at 50 km/h
    else if (speed <= 60) met = 50;   // Biking at 60 km/h
    else if (speed <= 100) met = 75;  // Biking at 100 km/h
    else if (speed <= 150) met = 100; // Biking at 150 km/h
    else if (speed <= 200) met = 150; // Biking at 200 km/h
    else met = 200;                   // Biking at 296 km/h (extreme speed)

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
