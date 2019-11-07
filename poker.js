let generateDeckCards = () => {
    let deckOfCards = [];

    let number = ['as', '2', '3', '4', '5', '6', '7' , '8', '9', '10', 'sota', 'caballo', 'rey'];
    let palo = ['corazones', 'picas', 'rombos', 'treboles'];

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

    console.log(randomDeck.length);
    return {users, randomDeck};
};

exports.generateDeckCards = generateDeckCards;
exports.mixDeckCards = mixDeckCards;
exports.randomCard = randomCard;
exports.distributeCards = distributeCards;
