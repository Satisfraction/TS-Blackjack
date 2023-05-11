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
  for (let i = 0; i < 1; i++) {   // Wiederhole zweimal
    const randomIndex = getRandomIndex();   // Hole einen zufälligen Index aus dem Deck
    hand1.push(deck[randomIndex]);    // Füge die Karte an diesem Index der ersten Hand hinzu
    deck.splice(randomIndex, 1);    // Entferne die Karte aus dem Deck 
  }
  const hand2 = [];   // Erstelle ein leeres Array für die zweite Hand
  for (let i = 0; i < 1; i++) {   // Wiederhole zweimal
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
  
  const ergebnisEl2 = document.getElementById("ergebnis2");     // Hole das Element mit der ID ergebnis2 aus dem HTML-Dokument
  ergebnisEl2.innerHTML = "Die Karten für Dich sind: " + hand2 + "<br><br>" +   // Setze den Inhalt des Elements auf die Karten und die Punktzahl der zweiten Hand
      "Deine Punktzahl: " + hand2Sum + "<br><br>" +   // Zeigt Deine Punkte anhand der Summe von had2Sum an
      "Die Karten des Computers sind: " + hand1 + "<br><br>" +      // Füge die Karten und die Punktzahl der ersten Hand hinzu
      "Punktzahl des Computers: " + hand1Sum + "<br><br>";    // Zeigt die Punkte von Computer anhand von had1Sum an
  if(hand2Sum > hand1Sum){    // Überprüfe, ob die Punktzahl der zweiten Hand größer ist als die der ersten Hand
      ergebnisEl2.innerHTML += "Du hast gewonnen!";   // Füge eine Nachricht hinzu, dass du gewonnen hast
  } else if(hand1Sum > hand2Sum){   // Überprüfe, ob die Punktzahl der ersten Hand größer ist als die der zweiten Hand
      ergebnisEl2.innerHTML += "Der Computer hat gewonnen";   // Füge eine Nachricht hinzu, dass der Computer gewonnen hat
  } else {
      ergebnisEl2.innerHTML += "Unentschieden!"   // Füge eine Nachricht hinzu, dass es ein Unentschieden ist
  }
}
