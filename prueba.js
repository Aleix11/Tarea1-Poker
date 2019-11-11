const poker = require('./poker.js');

let users = [{
    name: 'AAA',
    cards: []
},{
    name: 'BBB',
    cards: []
},{
    name: 'CCC',
    cards: []
},{
    name: 'DDD',
    cards: []
},{
    name: 'EEE',
    cards: []
},{
    name: 'FFF',
    cards: []
}];
let usersWithCards = poker.distributeCards(users, poker.generateDeckCards());
console.log(poker.checkWinner(usersWithCards.users));


//github profe pauek