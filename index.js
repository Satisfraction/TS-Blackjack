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
    
  
  let outcome = '';
  if(hand2Sum > hand1Sum){
      outcome = "Du hast gewonnen!";
  } else if(hand1Sum > hand2Sum){
      outcome = "Der Computer hat gewonnen";
  } else {
      outcome = "Unentschieden!";
  }

  
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push(outcome);
  localStorage.setItem('highScores', JSON.stringify(highScores));

  
  const highScoreList = document.getElementById('highScoreList');
    highScoreList.innerHTML = '';
    for (let i = 0; i < highScores.length; i++) {
      const score = highScores[i];
      const li = document.createElement('li');
      li.textContent = score;
      highScoreList.appendChild(li);
    }
  
    const ergebnisEl2 = document.getElementById("ergebnis2");
    ergebnisEl2.innerHTML = "Die Karten für Dich sind: " + hand2 + "<br><br>" +
        "Deine Punktzahl: " + hand2Sum + "<br><br>" +
        "Die Karten des Computers sind: " + hand1 + "<br><br>" +
        "Punktzahl des Computers: " + hand1Sum + "<br><br>" +
        outcome;
  
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('highScores');
      highScoreList.innerHTML = '';
    });
  }

function reset() {
    
    deck = [];
    for (let i = 0; i < farben.length; i++) {
        for (let j = 0; j < karte.length; j++) {
            const wert = karte[j];
            const mappedWert = werteMapping[wert] || wert;
            deck.push(farben[i] + ' ' + mappedWert);
        }
    }

    
    hand1 = [];
    hand2 = [];

    
    localStorage.removeItem('highScores');

    
    const highScoreList = document.getElementById('highScoreList');
    highScoreList.innerHTML = '';
}

const resetBtn = document.createElement('button');
resetBtn.textContent = 'Zurücksetzen';
resetBtn.addEventListener('click', reset);
document.body.appendChild(resetBtn);