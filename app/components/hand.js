var RANKS = require('../enums/rank.enum');
var SUITES = require('../enums/suite.enum');

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
        // TODO rewrite to index
        this.cards.forEach((suiteCards, suite) => {
            if (!!suiteCards[rank] && suite !== this.trump) {
                this.cards[suite][rank] = 0;
                cardsByRank.push({ suite, rank });
            }
        });
        return cardsByRank;
    }

    getHigherCard(card) {
        // TODO submethod
        for (var rank = card.rank + 1; rank <= Object.keys(RANKS).length; rank++) {
            if (!!this.cards[card.suite][rank]) {
                this.cards[card.suite][rank] = 0;
                return { suite: card.suite, rank };
            }
        }
        if (card.suite !== this.trump) {
            for (var rankKey in RANKS) {
                if (!!this.cards[this.trump][RANKS[rankKey]]) {
                    this.cards[this.trump][RANKS[rankKey]] = 0;
                    return { suite: this.trump, rank: RANKS[rankKey] };
                }
            }
        }

        return null;
    }

    cardsCount() {
        var count = 0;
        for (var i = 0; i < 4; i++) {
            for (var k = 0; k < 13; k++) {
                count += this.cards[i][k];
            }
        }

        return count;
    }
}

module.exports = Hand;