const table = {
    1: {
        src: "ispac.png",
        disable: false
    },
    2: {
        src: "mils.png",
        disable: false
    },
    3: {
        src: "comme_prevu.png",
        disable: false,
    },
    4: {
        src: "mils2_0.png",
        disable: false,
    },
    5: {
        src: "destin.png",
        disable: false,
    },
    6: {
        src: "mils3_0noir.png",
        disable: false,
    },
    7: {
        src: "MILS3_0.png",
        disable: false,
    },
    8: {
        src: "jefe.png",
        disable: false,
    },
    9: {
        src: "ispac.png",
        disable: false,
    },
    10: {
        src: "mils.png",
        disable: false,
    },

    11: {
        src: "comme_prevu.png",
        disable: false,
    },
    12: {
        src: "mils2_0.png",
        disable: false,
    },
    13: {
        src: "destin.png",
        disable: false,
    },
    14: {
        src: "mils3_0noir.png",
        disable: false,
    },
    15: {
        src: "MILS3_0.png",
        disable: false,
    },
    16: {
        src: "jefe.png",
        disable: false,
    },
}


let numberOfCards = 0;
let firstCard = 0;
let secondCard = 0;
let points = 0;


// affiche les cartes dans un ordre aléatoire
function displayCardsRandom(){
    const cards = document.getElementById("cards");
    // affiche les cartes dans un ordre aléatoire
    const keys = Object.keys(table);
    const randomKeys = keys.sort(() => Math.random() - 0.5);
    randomKeys.forEach(key => {
        cards.innerHTML += `<img src="cover.png" class="memorycarte" data-id="${key}"  onclick="returnCard(${key})">`;
    });
}
displayCardsRandom();

function returnCard(key) {
    numberOfCards++;
    if (numberOfCards === 1) {
        const img = document.querySelector(`[data-id="${key}"]`);
        img.src = table[key].src;
        firstCard = key;
    }
    if (numberOfCards === 2) {
        const img = document.querySelector(`[data-id="${key}"]`);
        img.src = table[key].src;
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
                card.src = "cover.png";
            }
            );
            //afficher une div avec le message "vous avez gagné" en position absolute
            const div = document.createElement("div");
            div.innerHTML = "Vous avez gagné";
            div.style.position = "absolute";
            div.style.top = "50%";
            div.style.left = "50%";
            div.style.transform = "translate(-50%, -50%)";
            div.style.fontSize = "50px";
            div.style.color = "red";
            div.style.fontWeight = "bold";
            div.style.textAlign = "center";
            div.style.backgroundColor = "white";
            div.style.padding = "20px";
            div.style.borderRadius = "20px";
            div.style.boxShadow = "0 0 10px black";
            document.body.appendChild(div);


        }, 3000);
    }
}

function unflipCards() {
    setTimeout(() => {
        table[firstCard].disable = false;
        table[secondCard].disable = false;
        numberOfCards = 0;
        document.querySelector(`[data-id="${secondCard}"]`).src = "cover.png";
        document.querySelector(`[data-id="${firstCard}"]`).src = "cover.png";
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