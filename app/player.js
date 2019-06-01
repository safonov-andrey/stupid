var Hand = require('./hand');

class Player {
    hand = null;
    trump = null;

    constructor(cards, trump) {
        this.hand = new Hand(cards, trump);
    }

    attack() {
        var smallestCard = this.hand.getSmallestCard();
        var smallestCardCompanion = this.hand.getCardCompanion(smallestCard);

        return [smallestCard, ...smallestCardCompanion];
    }

    defense(attackCard) {

    }   
}

module.exports = Player;
