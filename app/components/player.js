var Hand = require('./hand');

class Player {
    hand = null;
    trump = null;

    constructor(cards, trump) {
        this.hand = new Hand(cards, trump);
    }

    startAttack() {
        var smallestCard = this.hand.getSmallestCard();
        var smallestCardCompanion = this.hand.getCardCompanion(smallestCard);

        return [smallestCard, ...smallestCardCompanion];
    }

    attack(availableCards) {
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
}

module.exports = Player;
