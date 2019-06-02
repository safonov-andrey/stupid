class Hand {
    cards = null;
    trump = null;

    RANK_LENGTH = 13;
    SUITE_LENGTH = 4;

    constructor(cards, trump) {
        this.createCardsMatrix(cards);
        this.trump = trump;
    }

    createCardsMatrix(cards) {
        this.cards = this.createEmptyMatrix();
        this.addCards(cards);
    }

    createEmptyMatrix() {
        var matrix = new Array(this.SUITE_LENGTH);
        for (var i = 0; i < this.SUITE_LENGTH; i++) {
            matrix[i] = new Array(this.RANK_LENGTH).fill(0);
        }
        return matrix;
    }

    getSmallestCard() {
        var smallestTrumpCard = null;

        for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
            for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
                if (this.cards[suite][rank] === 1) {
                    // If suite is not trump - we have found the smallest non trump card, and can return it
                    if (suite !== this.trump) {
                        this.cards[suite][rank] = 0;
                        return { suite, rank };
                    // If suite is trump - we should keep looking for the smallest non trump card,
                    // but we should remember the samllest trump card
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

        for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
            if (this.cards[suite][rank] === 1 && suite !== this.trump) {
                this.cards[suite][rank] = 0;
                cardsByRank.push({ suite, rank });
            }
        }

        return cardsByRank;
    }

    getHigherCard(card) {
        return this.getSameSuiteHigherCard(card) || this.getTrumpHigherCard(card);
    }

    getSameSuiteHigherCard(card) {
        for (var rank = card.rank + 1; rank < this.RANK_LENGTH; rank++) {
            if (this.cards[card.suite][rank] === 1) {
                this.cards[card.suite][rank] = 0;
                return { suite: card.suite, rank };
            }
        }

        return null;
    }

    getTrumpHigherCard(card) {
        if (card.suite !== this.trump) {
            for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
                if (this.cards[this.trump][rank] === 1) {
                    this.cards[this.trump][rank] = 0;
                    return { suite: this.trump, rank };
                }
            }
        }

        return null;
    }

    cardsCount() {
        var count = 0;
        for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
            for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
                count += this.cards[suite][rank];
            }
        }

        return count;
    }

    addCards(cards) {
        cards.forEach(card => {
            this.cards[card.suite][card.rank] = 1;
        });
    }
}

module.exports = Hand;
