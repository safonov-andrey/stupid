/**
 * Hand class holds the state of player's hand. 
 * We store cards in two-dimensional array: rows are suits, columns are ranks.
 */
class Hand {
    cards = null;
    trump = null;

    RANK_LENGTH = 13;
    SUITE_LENGTH = 4;

    constructor(cards, trump) {
        this.createCardsMatrix(cards);
        this.trump = trump;
    }

    /**
     * Create card matrix according to cards data files.
     * @param { [{suite, rank}] } cards - cards from data file.
     */
    createCardsMatrix(cards) {
        this.cards = this.createEmptyMatrix();
        this.addCards(cards);
    }

    /**
     * Create empty card matrix.
     * @returns { [[Number]] } - matrix SUITE_LENGTH x RANK_LENGTH, with 0 and 1.
     *                           Which represent is card exist in the hand or not.
     */
    createEmptyMatrix() {
        var matrix = new Array(this.SUITE_LENGTH);
        for (var i = 0; i < this.SUITE_LENGTH; i++) {
            matrix[i] = new Array(this.RANK_LENGTH).fill(0);
        }
        return matrix;
    }

    /**
     * Return the smallest non-trump card.
     * @returns { {suite, rank} }
     */
    getSmallestCard() {
        var smallestTrumpCard = null;

        for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
            for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
                if (this.cards[suite][rank] === 1) {
                    // If suite is not trump - we have found the smallest non trump card, and can return it
                    if (suite !== this.trump) {
                        this.cards[suite][rank] = 0;
                        if (smallestTrumpCard) {
                            this.cards[smallestTrumpCard.suite][smallestTrumpCard.rank] = 1;    
                        }
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

    /**
     * Return card 'companion', same rank but different suite.
     * @param { {suite, rank} } card - card for which companion should be found.
     * @returns { [{suite, rank}] }
     */
    getCardCompanion({ rank }) {
        var cardsByRank = [];

        for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
            if (this.cards[suite][rank] === 1) {
                this.cards[suite][rank] = 0;
                cardsByRank.push({ suite, rank });
            }
        }

        return cardsByRank;
    }

    /**
     * Return the smallest card that could beat input card. 
     * This card could be either of same suit, higher rank or smallest trump.
     * @param { {suite, rank} } card - card that should be beaten.
     * @returns { {suite, rank} | null }
     */
    getHigherCard(card) {
        return this.getSameSuiteHigherCard(card) || this.getTrumpHigherCard(card);
    }

    /**
     * Returns the smallest same suite card that could beat input card.
     * @param { {suite, rank} } card - card that should be beaten.
     * @returns { {suite, rank} | null }
     */
    getSameSuiteHigherCard(card) {
        for (var rank = card.rank + 1; rank < this.RANK_LENGTH; rank++) {
            if (this.cards[card.suite][rank] === 1) {
                this.cards[card.suite][rank] = 0;
                return { suite: card.suite, rank };
            }
        }

        return null;
    }

    /**
     * Returns the smallest trump card that could beat input card.
     * @param { {suite, rank} } card - card that should be beaten.
     * @returns { {suite, rank} | null }
     */
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

    /**
     * Return count of cards in hand.
     * @returns {Number}
     */
    cardsCount() {
        var count = 0;
        for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
            for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
                count += this.cards[suite][rank];
            }
        }

        return count;
    }

    /**
     * Add card to the hand.
     * @param { {suite, rank} } cards - card that should be added.
     */
    addCards(cards) {
        cards.forEach(card => {
            this.cards[card.suite][card.rank] = 1;
        });
    }

    /**
     * Get and remove a card from the hand.
     * @returns { {suite, rank} }
     */
    getCards() {
        var objCards = [];
        for (var suite = 0; suite < this.SUITE_LENGTH; suite++) {
            for (var rank = 0; rank < this.RANK_LENGTH; rank++) {
                if (this.cards[suite][rank]) {
                    objCards.push({ suite, rank });
                }
            }
        }

        return objCards;
    }
}

module.exports = Hand;
