var Hand = require('./hand');

class Player {
    hand = null;
    trump = null;
    nameIndex = null;

    constructor(cards, trump, nameIndex) {
        this.hand = new Hand(cards, trump);
        this.nameIndex = nameIndex;
    }

    attack(maxCardsCount, availableCards, isTrumpIncluded = false) {
        var resultAttackCards = [];
        if (availableCards && availableCards.length) {
            resultAttackCards = this.continueAttack(availableCards, isTrumpIncluded);
        } else {
            resultAttackCards = this.startAttack();
        }

        return this.getMaxCards(resultAttackCards, maxCardsCount);
    }

    startAttack() {
        var smallestCard = this.hand.getSmallestCard();
        var smallestCardCompanion = this.hand.getCardCompanion(smallestCard, true);

        return [smallestCard, ...smallestCardCompanion];
    }

    continueAttack(availableCards, isTrumpIncluded = false) {
        var attackCards = []
        availableCards.forEach(availableCard => {
            attackCards.push(...this.hand.getCardCompanion(availableCard, isTrumpIncluded));
        });
        return attackCards;
    }

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

    getRevertCards(maxCardsCount, availableCards) {
        var attackCards = []
        availableCards.forEach(availableCard => {
            attackCards.push(...this.hand.getCardCompanion(availableCard, true));
        });
        return this.getMaxCards(attackCards, maxCardsCount);;
    }

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

    hasCards() {
        return this.hand.cardsCount() > 0;
    }

    addCards(cards) {
        this.hand.addCards(cards);
    }
}

module.exports = Player;
