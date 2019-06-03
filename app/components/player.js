var Hand = require('./hand');

class Player {
    hand = null;
    trump = null;
    nameIndex = null;

    constructor(cards, trump, nameIndex) {
        this.hand = new Hand(cards, trump);
        this.nameIndex = nameIndex;
    }

    attack(maxCardsCount, availableCards) {
        var resultAttackCards = [];
        if (availableCards && availableCards.length) {
            resultAttackCards = this.continueAttack(availableCards);
        } else {
            resultAttackCards = this.startAttack();
        }

        var maxAttackCards = [];
        resultAttackCards.forEach((card, i) => {
            if (i < maxCardsCount) {
                maxAttackCards.push(card);
            } else {
                this.hand.addCards([card]);
            }
        });

        return maxAttackCards;
    }

    startAttack() {
        var smallestCard = this.hand.getSmallestCard();
        var smallestCardCompanion = this.hand.getCardCompanion(smallestCard);

        return [smallestCard, ...smallestCardCompanion];
    }

    continueAttack(availableCards) {
        var attackCards = []
        availableCards.forEach(availableCard => {
            attackCards.push(...this.hand.getCardCompanion(availableCard));
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

        return defenseCards.length === attackCards.length ? defenseCards : [];
    }

    hasCards() {
        return this.hand.cardsCount() > 0;
    }

    addCards(cards) {
        this.hand.addCards(cards);
    }
}

module.exports = Player;
