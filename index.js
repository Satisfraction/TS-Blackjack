const werteMapping = {
    // Definiere ein Objekt das die Werte der Bildkarten auf 10 abgebildet
    'Bube': 10,
    'Dame': 10,
    'König': 10,
    // Das Ass wird auf 11 abgebildet 
    'Ass': 11
};

// Erstelle ein Array mit allen möglichen Werten einer Karte
var karte = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Bube', 'Dame', 'König', 'Ass'];
// Erstelle ein Array mit allen möglichen Farben einer Karte
const farben = ['♥', '♦', '♣', '♠'];
// Erstelle ein leeres Array für das Deck
let deck = [];

// Erstelle das Deck mit allen möglichen Kombinationen aus Werten und Farben
for (let i = 0; i < farben.length; i++) {    // Iteriere über alle Farben
    for (let j = 0; j < karte.length; j++) {    // Iteriere über alle Werte
        const wert = karte[j];    // Speichere den aktuellen Wert in einer Variablen
        const mappedWert = werteMapping[wert] || wert; // Verwende das werteMapping Objekt um den Wert der Bildkarten zu erhalten oder den Wert selbst wenn es keine Bildkarte ist
        deck.push(farben[i] + ' ' + mappedWert);    // Füge die Kombination aus Farbe und Wert dem Deck hinzu 
    }
}

function getRandomIndex() {
    return Math.floor(Math.random() * deck.length);   // Erzeuge eine zufällige Ganzzahl zwischen 0 und der Länge des Decks
}

// Ziehe zufällig 4 Karten aus dem Deck
function game() {
    const hand1 = [];    // Erstelle ein leeres Array für die erste Hand
    for (let i = 0; i < 2; i++) {   // Wiederhole zweimal
        const randomIndex = getRandomIndex();   // Hole einen zufälligen Index aus dem Deck
        hand1.push(deck[randomIndex]);    // Füge die Karte an diesem Index der ersten Hand hinzu
        deck.splice(randomIndex, 1);    // Entferne die Karte aus dem Deck 
    }
    const hand2 = [];   // Erstelle ein leeres Array für die zweite Hand
    for (let i = 0; i < 2; i++) {   // Wiederhole zweimal
        const randomIndex = getRandomIndex();   // Hole einen zufälligen Index aus dem Deck
        hand2.push(deck[randomIndex]);    // Füge die Karte an diesem Index der zweiten Hand hinzu
        deck.splice(randomIndex, 1);    // Entferne die Karte aus dem Deck
    }

    function sumHandValues1(hand1) {
        let sum = 0;    // Erstelle eine Variable für die Summe der Werte der ersten Hand
        for (let i = 0; i < hand1.length; i++) {     // Iteriere über alle Karten in der ersten Hand
            const card = hand1[i];    // Speichere die aktuelle Karte in einer Variablen
            const cardValue = card.split(' ')[1];   // Teile die Karte an dem Leerzeichen und nimm den zweiten Teil als den Wert
            const mappedValue = werteMapping[cardValue] || parseInt(cardValue);   // Verwende das werteMapping Objekt um den Wert der Bildkarten zu erhalten oder konvertiere den Wert in eine Zahl wenn es keine Bildkarte ist
            sum += mappedValue;    // Addiere den Wert zur Summe 
        }
        return sum;   // Gib die Summe zurück
    }
    function sumHandValues2(hand2) {    // Erstelle eine Variable für die Summe der Werte der zweiten Hand
        let sum = 0;    // Erstelle eine Variable für die Summe der Werte der zweiten Hand
        for (let i = 0; i < hand2.length; i++) {    // Iteriere über alle Karten in der zweiten Hand
            const card = hand2[i];    // Speichere die aktuelle Karte in einer Variablen
            const cardValue = card.split(' ')[1];   // Teile die Karte an dem Leerzeichen und nimm den zweiten Teil als den Wert
            const mappedValue = werteMapping[cardValue] || parseInt(cardValue);   // Verwende das werteMapping Objekt um den Wert der Bildkarten zu erhalten oder konvertiere den Wert in eine Zahl wenn es keine Bildkarte ist
            sum += mappedValue;   // Addiere den Wert zur Summe
        }
        return sum;   // Gib die Summe zurück
    }

    const hand1Sum = sumHandValues1(hand1);   // Berechne die Summe der Werte der ersten Hand
    const hand2Sum = sumHandValues2(hand2);   // Berechne die Summe der Werte der zweiten Hand


    let outcome = '';     // Variable die das Ergebnis des Spiels speichert
    if (hand2Sum > hand1Sum) {      // überprüft ob deine Summe größer ist als die des Computers ist
        outcome = "Du hast gewonnen!";     // Wenn ja wird die Variable auf diesen Text gesetzt
    } else if (hand1Sum > hand2Sum) {       // eine weitere Bedingung die überprüft ob die Summe des Computers größer ist als deine
        outcome = "Der Computer hat gewonnen";       // Wenn ja wird die Variable auf diesen Text gesetzt
    } else {      // wenn keine der beiden Bedingungen erfüllt ist also wenn die Summen gleich sind
        outcome = "Unentschieden!";   // In diesem Fall wird die Variable auf diesen Text gesetzt
    }


    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(outcome);     // fügt das aktuelle Ergebnis dem Array hinzu
    localStorage.setItem('highScores', JSON.stringify(highScores));   // speichert das aktualisierte Array wieder im lokalen Speicher


    const highScoreList = document.getElementById('highScoreList');
    highScoreList.innerHTML = '';        // löscht den Inhalt des Elements
    for (let i = 0; i < highScores.length; i++) {       // eine Schleife, die für jedes Element im Array ausgeführt wird
        const score = highScores[i];      // eine Variable, die das aktuelle Element speichert
        const li = document.createElement('li');  // eine Variable die ein neues HTML-Element vom Typ liste erstellt
        li.textContent = score;       // setzt den Text des Elements auf das aktuelle Element
        highScoreList.appendChild(li);    // fügt das Element als child des Elements mit der ID highScoreList hinzu
    }

    const ergebnisEl2 = document.getElementById("ergebnis2");   // eine Konstante die das HTML-Element mit der ID ergebnis2 auswählt
    ergebnisEl2.innerHTML = "Die Karten für Dich sind: " + hand2 + "<br><br>" +     // setzt den Inhalt des Elements auf einen Text mit den Karten für dich
        "Deine Punktzahl: " + hand2Sum + "<br><br>" +       // fügt einen Zeilenumbruch und die Punktzahl für dich hinzu
        "Die Karten des Computers sind: " + hand1 + "<br><br>" +    // fügt einen weiteren Zeilenumbruch und die Karten für den Computer hinzu
        "Punktzahl des Computers: " + hand1Sum + "<br><br>" +   // fügt einen weiteren Zeilenumbruch und die Punktzahl für den Computer hinzu
        outcome;    // fügt einen weiteren Zeilenumbruch und das Ergebnis des Spiels hinzu

    const resetBtn = document.getElementById('resetBtn');   // eine Konstante die das HTML-Element mit der ID resetBtn auswählt
    resetBtn.addEventListener('click', () => {   // fügt dem Element einen EventListener hinzu der eine Funktion ausführt wenn das Element angeklickt wird
        localStorage.removeItem('highScores');    // löscht die bisherigen Ergebnisse aus dem lokalen Speicher
        highScoreList.innerHTML = '';      // löscht den Inhalt der Liste auf der Webseite
    });
}

// eine Funktion die das Spiel zurücksetzt indem sie das Kartendeck neu mischt die Hände leert und die Liste löscht
function reset() {

    deck = [];      // eine Variable die das Kartendeck als ein leeres Array initialisiert
    for (let i = 0; i < farben.length; i++) {   // ist eine Schleife die für jede Farbe im Array farben ausgeführt wird
        for (let j = 0; j < karte.length; j++) {    // eine weitere Schleife die für jede Karte im Array karte ausgeführt wird
            const wert = karte[j];      // eine Konstante die den Wert der aktuellen Karte speichert
            const mappedWert = werteMapping[wert] || wert;  // eine Konstante die den gemappten Wert der aktuellen Karte aus dem Objekt werteMapping holt oder den Wert selbst verwendet wenn es keinen gibt
            deck.push(farben[i] + ' ' + mappedWert);    // fügt die Kombination aus Farbe und Wert dem Kartendeck hinzu
        }
    }


    hand1 = [];     // eine Variable die die Hand des Computers als ein leeres Array initialisiert
    hand2 = [];     // eine Variable die deine Hand als ein leeres Array initialisiert


    localStorage.removeItem('highScores');      // löscht die bisherigen Ergebnisse aus dem lokalen Speicher


    const highScoreList = document.getElementById('highScoreList');     // eine Konstante die das HTML-Element mit der ID highScoreList auswählt
    highScoreList.innerHTML = '';       // löscht den Inhalt der Liste auf der Webseite
}

// Erstellt einen Knopf zum Zurücksetzen des Spiels und fügt ihn der Webseite hinzu
const resetBtn = document.createElement('button');      // eine Konstante die ein neues HTML-Element vom Typ button erstellt
resetBtn.textContent = 'Zurücksetzen';      // setzt den Text des Knopfs auf Zurücksetzen
resetBtn.addEventListener('click', reset);  // fügt dem Button einen Event-Listener hinzu der die Funktion reset ausführt wenn der Button angeklickt wird
document.body.appendChild(resetBtn);    // fügt den Button als child in das HTML-Element body hinzu