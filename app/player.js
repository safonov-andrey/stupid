var RANKS = require('./rank.enum');
var SUITES = require('./suite.enum');

class Player {
    cards = null;
    trump = null;

    constructor(cards, trump) {
        this.cards = cards;
        this.trump = trump;
    }

    attack() {
        console.log(Player.getSmallestCard(this.cards, this.trump));
    }

    defense(attackCard) {

    }
}

Player.getSmallestCard = function(cards, trump) {
    var smallestTrumpCard = null;
    for (var rankKey in RANKS) {
        var rank = RANKS[rankKey];

        for (var suiteKey in SUITES) {
            var suite = SUITES[suiteKey];
            
            if (cards[suite][rank] && suite !== trump) {
                return { suiteKey, rankKey };
            } else {
                smallestTrumpCard = { suiteKey, rankKey };
            }
        }
    }
    return smallestTrumpCard;
}

module.exports = Player;
