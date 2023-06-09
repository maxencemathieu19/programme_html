const table = {
    1: {
        src: "img/ispac.png",
        disable: false
    },
    2: {
        src: "img/mils.png",
        disable: false
    },
    3: {
        src: "img/comme_prevu.png",
        disable: false,
    },
    4: {
        src: "img/mils2_0.png",
        disable: false,
    },
    5: {
        src: "img/destin.png",
        disable: false,
    },
    6: {
        src: "img/mils3_0noir.png",
        disable: false,
    },
    7: {
        src: "img/MILS3_0.png",
        disable: false,
    },
    8: {
        src: "img/jefe.png",
        disable: false,
    },
    9: {
        src: "img/ispac.png",
        disable: false,
    },
    10: {
        src: "img/mils.png",
        disable: false,
    },

    11: {
        src: "img/comme_prevu.png",
        disable: false,
    },
    12: {
        src: "img/mils2_0.png",
        disable: false,
    },
    13: {
        src: "img/destin.png",
        disable: false,
    },
    14: {
        src: "img/mils3_0noir.png",
        disable: false,
    },
    15: {
        src: "img/MILS3_0.png",
        disable: false,
    },
    16: {
        src: "img/jefe.png",
        disable: false,
    },
}


let numberOfCards = 0;
let firstCard = 0;
let secondCard = 0;
let points = 0;
let isStarted = false;
let finalTime = 0;
var chronoInterval


// affiche les cartes dans un ordre aléatoire
function displayCardsRandom(){
    const cards = document.getElementById("cards");
    // affiche les cartes dans un ordre aléatoire
    const keys = Object.keys(table);
    const randomKeys = keys.sort(() => Math.random() - 0.5);
    randomKeys.forEach(key => {
        cards.innerHTML += `
        <div class="scene scene--card">
            <div class="cardDiv">
                <div class="card__face card__face--front">
                    <img src="img/cover.png" class="memorycarte" data-id="${key}"  onclick="returnCard(${key})">
                </div>
                <div class="card__face card__face--back">
                    <img src="${table[key].src}" class="memorycarte" data-id="${key}"  onclick="returnCard(${key})">
                </div>
            </div>
        </div>
        
        `;
    });
}
displayCardsRandom();

function returnCard(key) {
    if (isStarted === false) {
        startChrono();
    }
    numberOfCards++;
    if (numberOfCards === 1) {
        // const img = document.querySelector(`[data-id="${key}"]`);
        // img.src = table[key].src;
        // toogle class is-flipped to the card
        const card = document.querySelector(`[data-id="${key}"]`).parentNode.parentNode;
        card.classList.toggle("is-flipped");

        firstCard = key;
    }
    if (numberOfCards === 2) {
        // const img = document.querySelector(`[data-id="${key}"]`);
        // img.src = table[key].src;
        const card = document.querySelector(`[data-id="${key}"]`).parentNode.parentNode;
        card.classList.toggle("is-flipped");

        secondCard = key;
        checkForMatch();
    }
    if (numberOfCards > 2) {
        return
    }
    
}

function checkForMatch(){

    let match = (table[secondCard].src === table[firstCard].src);

    match ? disableCards() : unflipCards();
}

function disableCards() {
    table[firstCard].disable = true;
    table[secondCard].disable = true;
    numberOfCards = 0;
    points++;
    if (points === 8) {
        start();
        stop();
        setTimeout(() => {
            numberOfCards = 0;
            const cards = document.querySelectorAll(".memorycarte");
            cards.forEach(card => {
                card.src = "img/cover.png";
            }
            );
            stopChrono();
            let seconds = Math.floor(finalTime / 1000);
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            document.getElementById("finalTimeShow").innerHTML = "en" + minutes + "m " + seconds + "s";
            document.getElementById("win").style.display = "block";

        }, 3000);
    }
}

function unflipCards() {
    setTimeout(() => {
        table[firstCard].disable = false;
        table[secondCard].disable = false;
        numberOfCards = 0;
        // document.querySelector(`[data-id="${secondCard}"]`).src = "img/cover.png";
        // document.querySelector(`[data-id="${firstCard}"]`).src = "img/cover.png";
        // toogle class is-flipped to the first card and the second card
        const card1 = document.querySelector(`[data-id="${firstCard}"]`).parentNode.parentNode;
        const card2 = document.querySelector(`[data-id="${secondCard}"]`).parentNode.parentNode;
        card1.classList.toggle("is-flipped");
        card2.classList.toggle("is-flipped");
    }, 1000);
    
}




const start = () => {
    setTimeout(function () {
        confetti.start()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti

const stop = () => {
    setTimeout(function () {
        confetti.stop()
    }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

function closeWin(){
    document.getElementById("win").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("win") && event.target !== document.getElementsByClassName("contentWin")) {
        document.getElementById("win").style.display = "none";
        restartChrono();
    }
}

function startChrono() {
    isStarted = true;
    chronoStart = new Date();
    chronoInterval = setInterval(function () {
        let now = new Date();
        let elapsed = now - chronoStart;
        finalTime = elapsed;
        let seconds = Math.floor(elapsed / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        document.getElementById("chrono").innerHTML = "Votre temps : " + minutes + "m " + seconds + "s";
    }, 1000);
}

function stopChrono() {
    isStarted = false;
    console.log(chronoInterval)
    console.log(clearInterval(chronoInterval))
    document.getElementById("chrono").innerHTML = "";
}

function restartChrono() {
    clearInterval(chronoInterval);
    chronoInterval = null;
    chronoStart = null;
    isStarted = false;
    document.getElementById("chrono").innerHTML = "0m 0s";
}

