let palo = ['corazones', 'picas', 'rombos', 'treboles'];
let number = [['as', 14], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7] , ['8', 8], ['9', 9], ['10', 10], ['sota', 11], ['caballo', 12], ['rey', 13]];


let generateDeckCards = () => {
    let deckOfCards = [];

    // let number = [['as', 14], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7] , ['8', 8], ['9', 9], ['10', 10], ['sota', 11], ['caballo', 12], ['rey', 13]];
    // let palo = ['corazones', 'picas', 'rombos', 'treboles'];

    palo.forEach((palo) => {
        number.forEach((num) => {
           let card = {
               palo: palo,
               valor: num
           };
           deckOfCards.push(card);
        })
    });
    return deckOfCards;
};

let mixDeckCards = (deckOfCards) => {
/*  Check Correct deck of cards
    let corazones = deckOfCard.find((card) => card.palo === 'corazones');
    let treboles = deckOfCard.find((card) => card.palo === 'corazones');
    let rombos = deckOfCard.find((card) => card.palo === 'corazones');
    let picas = deckOfCard.find((card) => card.palo === 'corazones');
*/
    return deckOfCards.sort(() => Math.random() - 0.5);
    // return generateDeckCards().sort(() => Math.random() - 0.5); // Generado directamente

};

let randomCard = (deckOfCards) => {
    let randomDeck = deckOfCards.sort(() => Math.random() - 0.5);

    let random = Math.floor(Math.random() * randomDeck.length);
    let randomCard = randomDeck[random];

    randomDeck.splice(random, 1);

    return {randomCard, randomDeck};
};

// user : { name: 'AAA' , cards: []}
let distributeCards = (users, deckOfCards) => {
    let randomDeck = deckOfCards.sort(() => Math.random() - 0.5);

    users.forEach(user => {
        for(let i = 0; i < 5; i++) {
            let obj = randomCard(randomDeck);
            user.cards.push(obj.randomCard);
            randomDeck = obj.randomDeck;
        }
    });

    return {users, randomDeck};
};

let checkUsersCard = (cards) => {

    cards.sort((a, b) => (a.palo > b.palo) ? 1 : ((b.palo > a.palo) ? -1 : (a.valor[1] - b.valor[1])));

    if(straightFlush(cards)) {
        return { play: 'straightFlush', points: 9,  cards}
    } /*else if(straight(cards)) {
        return { play: 'straight', points: 8,  cards}
    }*/ else if(poker(cards)) {
        return { play: 'poker', points: 7,  cards}
    } else if(flush(cards)) {
        return { play: 'flush', points: 6,  cards}
    } else if(full(cards)) {
        return { play: 'full', points: 5,  cards}
    } else if(threeKind(cards)) {
        return { play: 'threeKind', points: 4,  cards}
    } else if(twoPairs(cards)) {
        return { play: 'twoPairs', points: 3,  cards}
    } else if(pair(cards)) {
        return { play: 'pair', points: 2,  cards}
    } else if(highCard(cards)) {
        return { play: 'highCard', points: 1,  cards}
    }
};

let straightFlush = (cards) => {
    let straightFlush = false;

    palo.forEach(palo => {
        if(cards.every(card => card.palo === palo)) {
            return straight(cards);
        } else {
            return false;
        }
    });

    return straightFlush;
};

let straight = (cards) => {
    return cards.every(sequence);
};

let sequence = (card, i, array) => {
    return !i || array[i - 1].valor[1] < card.valor[1];
};

let poker = (cards) => {
    let modifyCards = [...cards];

    let poker = false;

    for(let num = 0; num < cards.length; num++) {
        modifyCards.splice(num, 1);
        poker = modifyCards.every((card, i, array) => {
            return !i || array[i - 1].valor[1] === card.valor[1];
        });
        if (poker) return poker;
        modifyCards = [...cards];
    }

};

let flush = (cards) => {
    let color = false;
    palo.forEach(palo => {
        let allColor = cards.every(card => card.palo === palo);
        if (allColor) color = allColor;
    });
    return color;
};

let full = (cards) => {
    let modifyCards = [...cards];

    let restos = [];

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        restos.push(modifyCards.splice(i, 1)[0]);

        for(let j = 0; j < modifyCards.length; j++) {
            modifyCards2.splice(j, 1);

            let threeKind = modifyCards2.every((card, num, array) => {
                return !num || array[num - 1].valor[1] === card.valor[1];
            });

            if (threeKind) {
                // restos buscar pareja
                let restos2 = [...restos];

                let doublePair = restos.every((rest, num2, restosArray) => {
                    return !num2 || restosArray[num2 - 1].valor[1] === rest.valor[1];
                });

                if(doublePair) return doublePair;
                restos2 = [...restos];
            }

            restos.pop();
            modifyCards2 = [...modifyCards];
        }
        restos.pop();
        modifyCards = [...cards];
    }
};

let threeKind = (cards) => {
    let modifyCards = [...cards];

    let threeKind = false;

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        modifyCards.splice(i, 1);

        for(let j = 0; j < modifyCards.length; j++) {
            modifyCards2.splice(j, 1);
            threeKind = modifyCards2.every((card, num, array) => {
                return !num || array[num - 1].valor[1] === card.valor[1];
            });
            if (threeKind) return threeKind;
            modifyCards2 = [...modifyCards];
        }
        modifyCards = [...cards];
    }
};

let twoPairs = (cards) => {
    let modifyCards = [...cards];

    let restos = [];

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        restos.push(modifyCards.splice(i, 1)[0]);

        for(let j = 0; j < modifyCards.length; j++) {
            let modifyCards3 = [...modifyCards];
            restos.push(modifyCards2.splice(j, 1)[0]);

            for(let k = 0; k < modifyCards2.length; k++) {
                restos.push(modifyCards3.splice(k, 1)[0]);

                let pair = modifyCards3.every((card, num, array) => {
                    return !num || array[num - 1].valor[1] === card.valor[1];
                });

                if (pair) {
                    // restos buscar pareja
                    let restos2 = [...restos];
                    for(let l = 0; l < restos.length; l++) {
                        restos.splice(l, 1);

                        let doublePair = restos.every((rest, num2, restosArray) => {
                            return !num2 || restosArray[num2 - 1].valor[1] === rest.valor[1];
                        });

                        if(doublePair) return doublePair;
                        restos2 = [...restos];
                    }
                }
                restos.pop();
                modifyCards3 = [...modifyCards2];
            }
            restos.pop();
            modifyCards2 = [...modifyCards];
        }
        restos.pop();
        modifyCards = [...cards];
    }
};

let pair = (cards) => {
    let modifyCards = [...cards];

    let pair = false;

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        modifyCards.splice(i, 1);

        for(let j = 0; j < modifyCards.length; j++) {
            let modifyCards3 = [...modifyCards];
            modifyCards2.splice(j, 1);

            for(let k = 0; k < modifyCards2.length; k++) {
                modifyCards3.splice(k, 1);

                pair = modifyCards3.every((card, num, array) => {
                    return !num || array[num - 1].valor[1] === card.valor[1];
                });
                if (pair) return pair;
                modifyCards3 = [...modifyCards2];
            }

            modifyCards2 = [...modifyCards];
        }
        modifyCards = [...cards];
    }
};

let highCard = (cards) => {

};


let checkWinner = (users) => {

};

exports.generateDeckCards = generateDeckCards;
exports.mixDeckCards = mixDeckCards;
exports.randomCard = randomCard;
exports.distributeCards = distributeCards;
exports.checkUsersCard = checkUsersCard;
exports.checkWinner = checkWinner;
