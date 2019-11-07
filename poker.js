let generateDeckCards = () => {
    let deckOfCard = [];

    let number = ['as', '2', '3', '4', '5', '6', '7' , '8', '9', '10', 'sota', 'caballo', 'rey'];
    let palo = ['corazones', 'picas', 'rombos', 'treboles'];

    palo.forEach((palo) => {
        number.forEach((num) => {
           let card = {
               palo: palo,
               valor: num
           };
           deckOfCard.push(card);
        })
    });
    return deckOfCard;
};

let mixDeckCards = (deckOfCard) => {
/*  Check Correct deck of cards
    let corazones = deckOfCard.find((card) => card.palo === 'corazones');
    let treboles = deckOfCard.find((card) => card.palo === 'corazones');
    let rombos = deckOfCard.find((card) => card.palo === 'corazones');
    let picas = deckOfCard.find((card) => card.palo === 'corazones');
*/
    return deckOfCard.sort(() => Math.random() - 0.5);
};

let randomCard = (deckOfCard) => {
    let randomDeck = deckOfCard.sort(() => Math.random() - 0.5);

    return randomDeck[Math.round(Math.random() * randomDeck.length)];
};

exports.generateDeckCards = generateDeckCards;
exports.mixDeckCards = mixDeckCards;
exports.randomCard = randomCard;
