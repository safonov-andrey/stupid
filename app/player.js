var Hand = require('./hand');

class Player {
    hand = null;
    trump = null;

    constructor(cards, trump) {
        this.hand = new Hand(cards, trump);
    }

    attack(availableCards) {
        if (availableCards) {
            var attackCards = []
            availableCards.forEach(availableCard => {
                attackCards.push(...this.hand.getCardCompanion(availableCard));
            });
            return attackCards;
        } else {
            var smallestCard = this.hand.getSmallestCard();
            var smallestCardCompanion = this.hand.getCardCompanion(smallestCard);
    
            return [smallestCard, ...smallestCardCompanion];
        }
    }

    defense(attackCards) {
        var defenseCards = [];
        attackCards.forEach(attackCard => {
            defenseCards.push(this.hand.getHigherCard(attackCard));
        });

        console.log(attackCards);
        console.log(defenseCards);
        return defenseCards;
    }   
}

module.exports = Player;
