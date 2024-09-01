//definisco le variabili che mi serviranno

let arrayAct1 = [];
let arrayAct2 = [];
let arrayAct3 = [];
async function creazioneGrafici() {
    //faccio il fetch delle attività
    async function fetchAttivita(periodo, tipo) {
        try {
            const response = await fetch('http://localhost:8080/act');
            const data = await response.json();
            let arrayAct = [];
            const oggi = new Date();
            data.forEach((act) => {
                const date = new Date(act.sportDate);
                if (periodo == 'Totale') {
                    //aggiungo tutte le attività del tipo selezionato
                    if (act.tipo == tipo) {
                        arrayAct.push(act);
                    }
                } else if (periodo == 'Anno') {
                    //le attività dell'anno attuale
                    if ((date.getFullYear() == oggi.getFullYear()) && (act.tipo == tipo)) {
                        //aggiungo solo le attività fatte entro un anno
                        arrayAct.push(act);
                    }
                } else if (periodo == 'Mese') {
                    //il mese attuale
                    if ((date.getFullYear() == oggi.getFullYear()) && (date.getMonth() == oggi.getMonth()) && (act.tipo == tipo)) {
                        //aggiungo solo le attività fatte entro un mese
                        arrayAct.push(act);
                    }
                }
            });
            return arrayAct;
        } catch (error) {
            alert('Problemi di comunicazione con il server. Riprova più tardi.');
        }
    }
    //organizzo i dati richiesti dal grafico
    function organiseData(periodo, array, dato, contatore) {
        let totale = parseInt(0);
        //console.log(periodo);
        //console.log(dato);
        //controllo il periodo su cui dividere i dati
        if (periodo == 'Anno') {
            //controllo il tipo di dato da prendere
            if (dato == 'calorie') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getMonth() == contatore) {
                        totale += attivita.calorie;
                    }
                })
            } else if (dato == 'durata') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getMonth() == contatore) {
                        totale += attivita.durata;
                    }
                })
            } else if (dato == 'distanza') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getMonth() == contatore) {
                        totale += attivita.distanza;
                    }
                })
            }
        } else if (periodo == 'Totale') {
            if (dato == 'calorie') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è dell'anno giusto
                    if (date.getFullYear() == (parseInt(contatore) + parseInt(2020))) {
                        totale += attivita.calorie;
                    }
                })
            } else if (dato == 'durata') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è dell'anno giusto
                    if (date.getFullYear() == (parseInt(contatore) + parseInt(2020))) {
                        totale += attivita.durata;
                    }
                })
            } else if (dato == 'distanza') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è dell'anno giusto
                    if (date.getFullYear() == (parseInt(contatore) + parseInt(2020))) {
                        totale += attivita.distanza;
                    }
                })
            }
        } else if (periodo == 'Mese') {
            if (dato == 'calorie') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getDate() == (contatore + 1)) {
                        totale += attivita.calorie;
                    }
                })
            } else if (dato == 'durata') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getDate() == (contatore + 1)) {
                        totale += attivita.durata;
                    }
                })
            } else if (dato == 'distanza') {
                array.forEach((attivita) => {
                    const date = new Date(attivita.sportDate);
                    //controllo se la data dell'attività è del mese giusto
                    if (date.getDate() == (contatore + 1)) {
                        totale += attivita.distanza;
                    }
                })
            }
        }
        return totale;
    }

    //creo il PRIMO dei tre grafici
    async function createChart1(dato, periodo) {
        //definisco il periodo
        const titleChart = "Confronto delle attività per la media di: " + dato;
        let xValues = [];
        const oggi = new Date();
        if (periodo == 'Totale') {
            const anno = oggi.getFullYear();
            //faccio aggiungere gli anni dal 2020 all'anno attuale
            for (j = 2020; j <= anno; j++) {
                xValues.push(j);
            }
        } else if (periodo == 'Anno') {

            xValues = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        } else {
            //costruisco l'array dei giorni del mese considerando che mese è e se l'anno è bisestile
            const anno = parseInt(oggi.getFullYear());
            const mese = parseInt(oggi.getMonth());
            if ((mese == 0) || (mese == 2) || (mese == 4) || (mese == 6) || (mese == 7) || (mese == 9) || (mese == 11)) {
                //mese da 31 giorni
                xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
            } else if (mese == 1) {
                //febbraio
                if (anno % 4 == 0) {
                    //anno bisestile
                    xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
                } else {
                    //anno normale
                    xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
                }
            } else {
                //mese da 30 giorni
                xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
            }
        }
        let arrayCiclismo = [];
        arrayCiclismo = await fetchAttivita(periodo, 'cycling');
        let arrayCorsa = [];
        arrayCorsa = await fetchAttivita(periodo, 'running');
        let arrayNuoto = [];
        arrayNuoto = await fetchAttivita(periodo, 'swimming');
        let sumCiclismo;
        let sumCorsa;
        let sumNuoto;
        let valueCiclismo = [];
        let valueCorsa = [];
        let valueNuoto = [];
        //prendo tutti i dati per le varie attività da mostrare
        //li inserisco in un array lungo quanto i valori di X (anni, mesi o settimane)
        for (let i = 0; i < xValues.length; i++) {
            sumCiclismo = parseInt(0);
            sumCorsa = parseInt(0);
            sumNuoto = parseInt(0);
            //organizzo i dati a seconda del periodo e del dato richiesto per ogni attività
            //richiamando un'altra funzione
            sumCiclismo = organiseData(periodo, arrayCiclismo, dato, i);
            sumCorsa = organiseData(periodo, arrayCorsa, dato, i);
            sumNuoto = organiseData(periodo, arrayNuoto, dato, i);
            //media
            valueCiclismo[i] = (sumCiclismo / arrayCiclismo.length).toFixed(2);
            valueCorsa[i] = (sumCorsa / arrayCorsa.length).toFixed(2);
            valueNuoto[i] = (sumNuoto / arrayNuoto.length).toFixed(2);
        }
        //creo il diagramma
        new Chart("attivita-tempo", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: 'Ciclismo',
                    data: valueCiclismo,
                    borderColor: "red",
                    fill: false
                }, {
                    label: 'Corsa',
                    data: valueCorsa,
                    borderColor: "blue",
                    fill: false
                }, {
                    label: 'Nuoto',
                    data: valueNuoto,
                    borderColor: "green",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: titleChart
                }
            }
        });
    }
    //aggiungo un evento alla selezione delle opzioni al diagramma uno
    const selettoreUno = document.getElementById('selectChartUno');
    selettoreUno.addEventListener('change', function () {
        const buttonChartUno = document.getElementsByClassName('periodoUno');
        let periodo;
        for (let pulsante of buttonChartUno) {
            if (pulsante.classList.contains('selected')) {
                //trovo il periodo selezionato
                periodo = pulsante.innerText;
            }
        }
        createChart1(this.value, periodo);
    })
    //aggiungo un evento ai pulsanti del periodo per il diagramma uno
    const periodoUno = document.getElementsByClassName('periodoUno');
    for (let button of periodoUno) {
        button.addEventListener('click', function () {
            for (let pulsante of periodoUno) {
                //rimuovo la classe selected da tutti i pulsanti
                pulsante.classList.remove('selected');
            }
            //la riaggiungo solo per questo elemento
            this.classList.add('selected');
            //adesso cerco il dato da mostrare
            const dato = document.getElementById('selectChartUno').value;
            const periodo = this.innerText;
            createChart1(dato, periodo);
        })
    }

    //creo il SECONDO dei tre grafici
    async function createChart2(dato, periodo) {
        const labelChart = dato;
        const titleChart = "Totalità delle attività svolte";
        //definisco il periodo
        let xValues = [];
        const oggi = new Date();
        if (periodo == 'Totale') {
            const anno = oggi.getFullYear();
            //faccio aggiungere gli anni dal 2020 all'anno attuale
            for (j = 2020; j <= anno; j++) {
                xValues.push(j);
            }
        } else if (periodo == 'Anno') {

            xValues = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        } else {
            //costruisco l'array dei giorni del mese considerando che mese è e se l'anno è bisestile
            const anno = parseInt(oggi.getFullYear());
            const mese = parseInt(oggi.getMonth());
            if ((mese == 0) || (mese == 2) || (mese == 4) || (mese == 6) || (mese == 7) || (mese == 9) || (mese == 11)) {
                //mese da 31 giorni
                xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
            } else if (mese == 1) {
                //febbraio
                if (anno % 4 == 0) {
                    //anno bisestile
                    xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
                } else {
                    //anno normale
                    xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
                }
            } else {
                //mese da 30 giorni
                xValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
            }
        }
        //prendo le attività per ogni singola attività
        let arrayCiclismo = [];
        arrayCiclismo = await fetchAttivita(periodo, 'cycling');
        let arrayCorsa = [];
        arrayCorsa = await fetchAttivita(periodo, 'running');
        let arrayNuoto = [];
        arrayNuoto = await fetchAttivita(periodo, 'swimming');
        let sumCiclismo;
        let sumCorsa;
        let sumNuoto;
        let valueTot = [];
        //prendo tutti i dati per le varie attività da mostrare
        //li inserisco in un array lungo quanto i valori di X (anni, mesi o settimane) 
        //fondo i dati in un unico array
        for (let i = 0; i < xValues.length; i++) {
            sumCiclismo = parseInt(0);
            sumCorsa = parseInt(0);
            sumNuoto = parseInt(0);
            //organizzo i dati a seconda del periodo e del dato richiesto per ogni attività
            //richiamando un'altra funzione
            sumCiclismo = organiseData(periodo, arrayCiclismo, dato, i);
            sumCorsa = organiseData(periodo, arrayCorsa, dato, i);
            sumNuoto = organiseData(periodo, arrayNuoto, dato, i);
            //somma totale
            valueTot[i] = sumCiclismo + sumCorsa + sumNuoto;
        }
        //creo il secondo diagramma
        new Chart('tot-attivita', {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: labelChart,
                    borderColor: "white",
                    data: valueTot
                }]
            },
            options: {
                title: {
                    display: true,
                    text: titleChart
                }
            }
        })
    }
    //aggiungo un evento alla selezione delle opzioni al diagramma due
    const selettoreDue = document.getElementById('selectChartDue');
    selettoreDue.addEventListener('change', function () {
        const buttonChartDue = document.getElementsByClassName('periodoDue');
        let periodo;
        for (let pulsante of buttonChartDue) {
            if (pulsante.classList.contains('selected')) {
                //trovo il periodo selezionato
                periodo = pulsante.innerText;
            }
        }
        createChart2(this.value, periodo);
    })
    //aggiungo un evento ai pulsanti del periodo per il diagramma due
    const periodoDue = document.getElementsByClassName('periodoDue');
    for (let button of periodoDue) {
        button.addEventListener('click', function () {
            for (let pulsante of periodoDue) {
                //rimuovo la classe selected da tutti i pulsanti
                pulsante.classList.remove('selected');
            }
            //la riaggiungo solo per questo elemento
            this.classList.add('selected');
            //adesso cerco il dato da mostrare
            const dato = document.getElementById('selectChartDue').value;
            const periodo = this.innerText;
            createChart2(dato, periodo);
        })
    }

    //creo il TERZO dei tre grafici
    async function createChart3(periodo) {
        const titleChart = "Numero di utenti per attività";
        //definisco le tre attività in esame
        let xValues = ["Ciclismo", "Corsa", "Nuoto"];

        //prendo le attività per ogni singola attività
        let arrayCiclismo = [];
        arrayCiclismo = await fetchAttivita(periodo, 'cycling');
        let arrayCorsa = [];
        arrayCorsa = await fetchAttivita(periodo, 'running');
        let arrayNuoto = [];
        arrayNuoto = await fetchAttivita(periodo, 'swimming');
        let yValues = [arrayCiclismo.length, arrayCorsa.length, arrayNuoto.length];
        //adesso creo il terzo grafico
        new Chart('attivita-numero', {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: ["red", "blue", "green"],
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Numero di attività"
                }
            }
        });
    }
    //creo un evento per i tre pulsanti
    const periodoTre = document.getElementsByClassName('periodoTre');
    for (let button of periodoTre) {
        button.addEventListener('click', function () {
            const periodo = this.innerText;
            createChart3(periodo);
        })
    }
    createChart1('calorie', 'Anno');
    createChart2('calorie', 'Anno');
    createChart3('Anno');
}

document.addEventListener('DOMContentLoaded', function () {
    creazioneGrafici();
});
window.addEventListener('resize', function () {
    creazioneGrafici();
})
