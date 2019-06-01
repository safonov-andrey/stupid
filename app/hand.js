var RANKS = require('./rank.enum');
var SUITES = require('./suite.enum');

class Hand {
    cards = null;
    trump = null;

    constructor(cards, trump) {
        this.cards = cards;
        this.trump = trump;
    }

    getSmallestCard() {
        var smallestTrumpCard = null;
    
        for (var rankKey in RANKS) {
            var rank = RANKS[rankKey];
    
            for (var suiteKey in SUITES) {
                var suite = SUITES[suiteKey];
    
                if (!!this.cards[suite][rank]) {
                    if (suite !== this.trump) {
                        this.cards[suite][rank] = 0;
                        return { suite, rank };
                    } else if (!smallestTrumpCard) {
                        this.cards[suite][rank] = 0;
                        smallestTrumpCard = { suite, rank };
                    }
                }
            }
        }
        return smallestTrumpCard;
    }

    getCardCompanion({ rank }) {
        var cardsByRank = [];
        this.cards.forEach((suiteCards, suite) => {
            if (!!suiteCards[rank] && suite !== this.trump) {
                this.cards[suite][rank] = 0;
                cardsByRank.push({ suite, rank });
            }
        });
        return cardsByRank;
    }
}

module.exports = Hand;
