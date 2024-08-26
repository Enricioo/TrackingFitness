document.addEventListener('DOMContentLoaded', function () {

    // Estrae il parametro dalla query string dell'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Estrae l'ID dal parametro
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
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(function (calc) {
        calc.classList.remove('active');
    });
    document.getElementById(calculator).classList.add('active');

    const buttons = document.querySelectorAll('.toggle-buttons button');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });
    document.querySelector(`.toggle-buttons button[onclick="showCalculator('${calculator}')"]`).classList.add('active');
}

function calculateRunningCalories() {
    const weight = parseInt(document.getElementById('running-weight').value);
    const distance = parseInt(document.getElementById('running-distance').value);
    const duration = parseInt(document.getElementById('running-duration').value);
    const grade = parseInt(document.getElementById('running-grade').value);

    if (isNaN(weight) || isNaN(distance) || isNaN(duration) || isNaN(grade)) {
        document.getElementById('running-result').innerText = "Inserisci valori validi.";
        return;
    }

    const speed = distance / (duration / 60); // Convert duration from minutes to hours

    // Valori MET per diverse velocità e pendenze
    let met = 0;
    if (speed <= 8) {
        met = 8;
    } else if (speed <= 9.7) {
        met = 10;
    } else if (speed <= 10.8) {
        met = 11;
    } else if (speed <= 12.1) {
        met = 12;
    } else if (speed <= 14.5) {
        met = 12;
    } else if (speed <= 16.1) {
        met = 13;
    } else if (speed <= 17.5) {
        met = 13;
    } else {
        met = 15;
    }

    // Adjust MET for grade
    if (grade > 0) {
        met = Math.round(met * (1 + grade / 100));
    } else if (grade < 0) {
        met = Math.round(met * (1 + grade / 200));
    }

    const time = Math.round(duration / 60); // Convert duration to hours
    const calories = met * weight * time;
    document.getElementById('running-result').innerText = calories;
}

function calculateBikingCalories() {
    const weight = parseInt(document.getElementById('biking-weight').value);
    const distance = parseInt(document.getElementById('biking-distance').value);
    const duration = parseInt(document.getElementById('biking-duration').value);

    if (isNaN(weight) || isNaN(distance) || isNaN(duration)) {
        document.getElementById('biking-result').innerText = "Inserisci valori validi.";
        return;
    }

    const speed = distance / (duration / 60); // Convert duration from minutes to hours

    // Valori MET per diverse velocità
    const metValues = {
        10: 4, // 10 km/h
        12: 7, // 12 km/h
        16: 8, // 16 km/h
        19: 10, // 19 km/h
        22: 12, // 22 km/h
        25: 16, // 25 km/h
        30: 19  // 30 km/h
    };

    let met = 4; // Valore MET predefinito
    for (let s in metValues) {
        if (speed <= s) {
            met = metValues[s];
            break;
        }
    }

    const time = Math.round(duration / 60); // Convert duration to hours
    const calories = met * weight * time;
    document.getElementById('biking-result').innerText = calories;
}

function calculateSwimmingCalories() {
    const weight = parseInt(document.getElementById('swimming-weight').value);
    const distance = parseInt(document.getElementById('swimming-distance').value);
    const duration = parseInt(document.getElementById('swimming-duration').value);
    const style = document.getElementById('swimming-style').value;

    if (isNaN(weight) || isNaN(distance) || isNaN(duration)) {
        document.getElementById('swimming-result').innerText = "Inserisci valori validi.";
        return;
    }

    // Valori MET per diversi stili di nuoto
    const metValues = {
        freestyle: 8,
        breaststroke: 10,
        butterfly: 14
    };

    const met = metValues[style];
    const time = Math.round(duration / 60); // Convert duration to hours
    const calories = met * weight * time;
    document.getElementById('swimming-result').innerText = calories;
}

function saveActivity(activityType) {
    const weight = parseInt(document.getElementById(`${activityType}-weight`).value);
    const distance = parseInt(document.getElementById(`${activityType}-distance`).value);
    const duration = parseInt(document.getElementById(`${activityType}-duration`).value);
    let calories = 0;
    if (activityType === 'running') {
        calories = parseInt(document.getElementById('running-result').innerText);
    } else if (activityType === 'biking') {
        calories = parseInt(document.getElementById('biking-result').innerText);
    } else if (activityType === 'swimming') {
        calories = parseInt(document.getElementById('swimming-result').innerText);
    }
    const sportDate = new Date().toISOString().split('T')[0]; // Current date
    const utente = 1; // Assuming a hardcoded user ID for demonstration; replace with actual user ID

    const activityData = {
        tipo: activityType,
        durata: duration,
        distanza: distance,
        calorie: calories,
        sportDate: sportDate,
        utente: utente
    };

    // Send the data to the server
    fetch('/saveActivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Attività salvata con successo.');
            } else {
                alert('Errore nel salvataggio dell\'attività.');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Errore nel salvataggio dell\'attività.');
        });
}