var Hand = require('./hand');
/**
 * This class represents player entity.
 *  It contains player's hand and logic for attack and defence cards selection.
 */
class Player {
    hand = null;
    trump = null;
    nameIndex = null;

    constructor(cards, trump, nameIndex) {
        this.hand = new Hand(cards, trump);
        this.nameIndex = nameIndex;
    }

    /**
     * Return cards that could be added to current attack.
     * We can add cards to current attack if we have companion cards for any of defence cards.
     * @param {Number} maxCardsCount maximum number of cards that can be added to attack. 
     * It cannot be greater than defender's card count - current attack size.
     * @param { [{suite, rank}] } availableCards 
     * @returns { [{suite, rank}] }
     */
    attack(maxCardsCount, availableCards) {
        var resultAttackCards = [];

        availableCards.forEach(availableCard => {
            resultAttackCards.push(...this.hand.getCardCompanion(availableCard));
        });

        return this.getMaxCards(resultAttackCards, maxCardsCount);
    }

    /**
     * Calculate cards for the first attack. 
     * In this method we look for smallest non-trump card and its companions.
     *  If all cards are trumps - we return smallest trump.
     * @param {Number} maxCardsCount 
     * @returns { [{suite, rank}] }
     */
    startAttack(maxCardsCount) {
        var smallestCard = this.hand.getSmallestCard();
        var smallestCardCompanion = this.hand.getCardCompanion(smallestCard);

        return this.getMaxCards([smallestCard, ...smallestCardCompanion], maxCardsCount);
    }

    /**
     * Determine cards for defense. 
     * For each card we look for same suit card with minimum higher rank. 
     * If there is no such card, we return smallest trump
     * (if we are defending from trump card, we still look for higher rank)
     * @param { [{suite, rank}] } attackCards 
     * @returns { [{suite, rank}] }
     */
    defense(attackCards) {
        var defenseCards = [];
        attackCards.forEach(attackCard => {
            var higherCard = this.hand.getHigherCard(attackCard);
            if (higherCard) {
                defenseCards.push(higherCard);
            }
        });

        if (defenseCards.length === attackCards.length) {
            return defenseCards;
        } else {
            this.hand.addCards(defenseCards);
            return [];
        }
    }

    /**
     * Return cards that could revert the attack.
     * We can revert that attack if we have cards of same rank as those in the attack. 
     * @param {Number} maxCardsCount - we cannot return more card than opponent's card count.
     * @param { [{suite, rank}] } availableCards - current attack cards
     * @returns { [{suite, rank}] }
     */
    getRevertCards(maxCardsCount, availableCards) {
        var attackCards = []
        availableCards.forEach(availableCard => {
            attackCards.push(...this.hand.getCardCompanion(availableCard));
        });
        return this.getMaxCards(attackCards, maxCardsCount);;
    }

    /**
     * Trim cards array so that it's length is not greater than maxCardsCount. 
     * Cards that are not in trimmed array, are put back to hand.
     * @param { [{suite, rank}] } cards 
     * @param {Number} maxCardsCount 
     * @returns { [{suite, rank}] }
     */
    getMaxCards(cards, maxCardsCount) {
        var maxAttackCards = [];
        cards.forEach((card, i) => {
            if (i < maxCardsCount) {
                maxAttackCards.push(card);
            } else {
                this.hand.addCards([card]);
            }
        });

        return maxAttackCards;
    }

    /**
     * Check if player has cards.
     * @returns {Boolean}
     */
    hasCards() {
        return this.hand.cardsCount() > 0;
    }

    /**
     * Add cards to the hand.
     * @param { [{suite, rank}] } cards 
     */
    addCards(cards) {
        this.hand.addCards(cards);
    }
}

module.exports = Player;
