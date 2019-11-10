let palo = ['corazones', 'picas', 'rombos', 'treboles'];
let number = [['as', 14], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7] , ['8', 8], ['9', 9], ['10', 10], ['sota', 11], ['caballo', 12], ['rey', 13]];


let generateDeckCards = () => {
    let deckOfCards = [];

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
    } else if(poker(cards)) {
        return { play: 'poker', points: 8, cards: poker(cards)}
    } else if(full(cards)) {
        return { play: 'full', points: 7, cards: full(cards)}
    } else if(flush(cards)) {
        return { play: 'flush', points: 6, cards: flush(cards)}
    }  else if(straight(cards)) {
        return { play: 'straight', points: 5,  cards}
    } else if(threeKind(cards)) {
        return { play: 'threeKind', points: 4, cards: threeKind(cards)}
    } else if(twoPairs(cards)) {
        return { play: 'twoPairs', points: 3, cards: pair(cards)}
    } else if(pair(cards)) {
        return { play: 'pair', points: 2, cards: pair(cards)}
    } else {
        return { play: 'highCard', points: 1,  cards: cards.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0))}
    }
};

let straightFlush = (cards) => {
    let straightFlush = [];

    palo.forEach(palo => {
        if(cards.every(card => card.palo === palo)) {
            straightFlush = straight(cards);
        }
    });

    return straightFlush.length !== 0 ? straightFlush : false;
};

let straight = (cards) => {
    cards.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));

    return cards.every(sequence);
};

let sequence = (card, i, array) => {
    return !i || array[i - 1].valor[1] - card.valor[1] === 1;
};

let poker = (cards) => {
    let modifyCards = [...cards];

    let poker = false;
    let restos = [];
    for(let num = 0; num < cards.length; num++) {
        restos.push(modifyCards.splice(num, 1)[0]);
        poker = modifyCards.every((card, i, array) => {
            return !i || array[i - 1].valor[1] === card.valor[1];
        });
        if (poker) {
            modifyCards.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));
            return modifyCards.concat(restos);
        }
        modifyCards = [...cards];
        restos.pop();
    }

};

let flush = (cards) => {
    let flush = [];
    palo.forEach(palo => {
        let allColor = cards.every(card => card.palo === palo);
        if (allColor) {
            flush = cards.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0))
        }
    });

    return flush.length !== 0 ? flush : false;

};

let full = (cards) => {
    let modifyCards = [...cards];

    let restos = [];

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        restos.push(modifyCards.splice(i, 1)[0]);

        for(let j = 0; j < modifyCards.length; j++) {
            restos.push(modifyCards2.splice(j, 1)[0]);

            let threeKind = modifyCards2.every((card, num, array) => {
                return !num || array[num - 1].valor[1] === card.valor[1];
            });

            if (threeKind) {
                // restos buscar pareja
                let restos2 = [...restos];

                let full = restos.every((rest, num2, restosArray) => {
                    return !num2 || restosArray[num2 - 1].valor[1] === rest.valor[1];
                });

                if(full) {
                    restos.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));
                    return modifyCards2.concat(restos);
                }
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
    let restos = [];

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        restos.push(modifyCards.splice(i, 1)[0]);

        for(let j = 0; j < modifyCards.length; j++) {
            restos.push(modifyCards2.splice(j, 1)[0]);
            threeKind = modifyCards2.every((card, num, array) => {
                return !num || array[num - 1].valor[1] === card.valor[1];
            });
            if (threeKind) {
                restos.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));
                return modifyCards2.concat(restos);
            }
            restos.pop();
            modifyCards2 = [...modifyCards];
        }
        restos.pop();
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
                    let restos2 = [...restos];
                    for(let l = 0; l < restos.length; l++) {
                        let sobrante = restos.splice(l, 1)[0];

                        let doublePair = restos.every((rest, num2, restosArray) => {
                            return !num2 || restosArray[num2 - 1].valor[1] === rest.valor[1];
                        });

                        if(doublePair) {
                            let play = modifyCards3.concat(restos);
                            play.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));

                            return play.concat(sobrante);
                        }
                        restos = [...restos2];
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
    let restos = [];

    for(let i = 0; i < cards.length; i++) {
        let modifyCards2 = [...modifyCards];
        restos.push(modifyCards.splice(i, 1)[0]);

        for(let j = 0; j < modifyCards.length; j++) {
            let modifyCards3 = [...modifyCards];
            restos.push(modifyCards2.splice(j, 1)[0]);

            for(let k = 0; k < modifyCards2.length; k++) {
                restos.push(modifyCards3.splice(k, 1)[0]);

                pair = modifyCards3.every((card, num, array) => {
                    return !num || array[num - 1].valor[1] === card.valor[1];
                });
                if (pair) {
                    let play = modifyCards3;

                    restos.sort((a, b) => (a.valor[1] > b.valor[1]) ? -1 : ((b.valor[1] > a.valor[1]) ? 1 : 0));

                    return play.concat(restos);
                }
                restos.pop();
                modifyCards3 = [...modifyCards2];
            }
            restos.pop();
            modifyCards2 = [...modifyCards];
        }
        modifyCards = [...cards];
        restos.pop();
    }
};

let checkWinner = (users) => {
    let plays = [];
    users.forEach(user => {
        let play = checkUsersCard(user.cards);
        play.user = user.name;
        plays.push(play);
    });

    plays.sort((a, b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));

    if(plays[0].points > plays[1].points) {
        return {winner: plays[0], plays};
    } else{
        return checkSameResult(plays);
    }
};

let checkSameResult = (plays) => {
    let bests = plays.filter((play, i, plays) => play.points === plays[0].points);

    bests.sort((a, b) => (a.cards[0].valor[1] > b.cards[0].valor[1]) ? -1 : ((b.cards[0].valor[1] > a.cards[0].valor[1]) ? 1 : 0));

    if(bests[0].play === 'straight' || bests[0].play === 'straightFlush'||
        bests[0].play === 'flush' || bests[0].play === 'highCard') {

        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);

        if (veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            veryBest.sort((a, b) => (a.cards[1].valor[1] > b.cards[1].valor[1]) ? -1 : ((b.cards[1].valor[1] > a.cards[1].valor[1]) ? 1 : 0));
            let vBest = veryBest.filter((best, i, bests) => best.cards[1].valor[1] === bests[0].cards[1].valor[1]);
            if (vBest.length === 1) {
                return {winner: vBest[0], plays};
            } else {
                vBest.sort((a, b) => (a.cards[2].valor[1] > b.cards[2].valor[1]) ? -1 : ((b.cards[2].valor[1] > a.cards[2].valor[1]) ? 1 : 0));
                let vvBest = vBest.filter((best, i, bests) => best.cards[2].valor[1] === bests[0].cards[2].valor[1]);
                if (vvBest.length === 1) {
                    return {winner: vvBest[0], plays};
                } else {
                    vvBest.sort((a, b) => (a.cards[3].valor[1] > b.cards[3].valor[1]) ? -1 : ((b.cards[3].valor[1] > a.cards[3].valor[1]) ? 1 : 0));
                    let vvvBest = vvBest.filter((best, i, bests) => best.cards[3].valor[1] === bests[0].cards[3].valor[1]);
                    if (vvvBest.length === 1) {
                        return {winner: vvvBest[0], plays};
                    } else {
                        vvvBest.sort((a, b) => (a.cards[4].valor[1] > b.cards[4].valor[1]) ? -1 : ((b.cards[4].valor[1] > a.cards[4].valor[1]) ? 1 : 0));
                        let vvvvBest = vvvBest.filter((best, i, bests) => best.cards[4].valor[1] === bests[0].cards[4].valor[1]);
                        if (vvvvBest.length === 1) {
                            return {winner: vvvvBest[0], plays};
                        } else {
                            return {winner: 'DRAW', plays};
                        }
                    }
                }
            }
        }
    } else if(bests[0].play === 'poker') {
        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);

        if(veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            veryBest.sort((a, b) => (a.cards[4].valor[1] > b.cards[4].valor[1]) ? -1 : ((b.cards[4].valor[1] > a.cards[4].valor[1]) ? 1 : 0));
            let vBest = veryBest.filter((best, i, bests) => best.cards[4].valor[1] === bests[0].cards[4].valor[1]);
            if(vBest.length === 1) {
                return {winner: vBest[0], plays};
            } else {
                return {winner: 'DRAW', plays};
            }
        }
    } else if(bests[0].play === 'full') {
        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);

        if(veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            veryBest.sort((a, b) => (a.cards[3].valor[1] > b.cards[3].valor[1]) ? -1 : ((b.cards[3].valor[1] > a.cards[3].valor[1]) ? 1 : 0));
            let vBest = veryBest.filter((best, i, bests) => best.cards[3].valor[1] === bests[0].cards[3].valor[1]);

            if(vBest.length === 1) {
                return {winner: vBest[0], plays};
            } else {
                return {winner: 'DRAW', plays};
            }
        }
    } else if(bests[0].play === 'threeKind') {
        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);

        if(veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            veryBest.sort((a, b) => (a.cards[3].valor[1] > b.cards[3].valor[1]) ? -1 : ((b.cards[3].valor[1] > a.cards[3].valor[1]) ? 1 : 0));
            let vBest = veryBest.filter((best, i, bests) => best.cards[3].valor[1] === bests[0].cards[3].valor[1]);

            if(vBest.length === 1) {
                return {winner: vBest[0], plays};
            } else {
                vBest.sort((a, b) => (a.cards[4].valor[1] > b.cards[4].valor[1]) ? -1 : ((b.cards[4].valor[1] > a.cards[4].valor[1]) ? 1 : 0));
                let vvBest = vBest.filter((best, i, bests) => best.cards[4].valor[1] === bests[0].cards[4].valor[1]);
                if(vvBest.length === 1) {
                    return {winner: vvBest[0], plays};
                } else {
                    return {winner: 'DRAW', plays};
                }
            }
        }
    } else if(bests[0].play === 'twoPairs') {
        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);
        if(veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            let vbest = veryBest.filter((best, i, bests) => best.cards[2].valor[1] === bests[0].cards[2].valor[1]);
            if(vbest.length === 1) {
                return {winner: vbest[0], plays};
            } else {
                let vvbest = vbest.filter((best, i, bests) => best.cards[4].valor[1] === bests[0].cards[4].valor[1]);
                if(vvbest.length === 1) {
                    return {winner: vvbest[0], plays};
                } else {
                    return {winner: 'DRAW', plays};
                }
            }
        }
    } else if(bests[0].play === 'pair') {
        let veryBest = bests.filter((best, i, bests) => best.cards[0].valor[1] === bests[0].cards[0].valor[1]);
        if(veryBest.length === 1) {
            return {winner: veryBest[0], plays};
        } else {
            let vbest = veryBest.filter((best, i, bests) => best.cards[2].valor[1] === bests[0].cards[2].valor[1]);
            if(vbest.length === 1) {
                return {winner: vbest[0], plays};
            } else {
                let vvbest = vbest.filter((best, i, bests) => best.cards[3].valor[1] === bests[0].cards[3].valor[1]);
                if(vvbest.length === 1) {
                    return {winner: vvbest[0], plays};
                } else {
                    let vvvbest = vvbest.filter((best, i, bests) => best.cards[4].valor[1] === bests[0].cards[4].valor[1]);
                    if(vvvbest.length === 1) {
                        return {winner: vvvbest[0], plays};
                    } else {
                        return {winner: 'DRAW', plays};
                    }
                }
            }
        }
    }
};

exports.generateDeckCards = generateDeckCards;
exports.mixDeckCards = mixDeckCards;
exports.randomCard = randomCard;
exports.distributeCards = distributeCards;
exports.checkUsersCard = checkUsersCard;
exports.checkWinner = checkWinner;
