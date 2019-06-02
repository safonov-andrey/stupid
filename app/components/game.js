var Player = require('./player');
var Table = require('./table');

class Game {
    player1 = null;
    player2 = null;
    table = null;

    constructor(data) {
        // TODO: move from game class
        this.player1 = new Player(data.player1, data.trump);
        this.player2 = new Player(data.player2, data.trump);

        this.table = new Table(data.trump);
    }

    run() {
        var attackPlayer = this.player1;
        var defensePlayer = this.player2;

        while (attackPlayer.hasCards() && defensePlayer.hasCards()) {
            var attackCards = attackPlayer.attack(defensePlayer.hand.cardsCount());
            var defenseCards = defensePlayer.defense(attackCards);

            console.log('----- Attack Cards -----');
            console.log(attackCards);
            console.log('----- Defense Cards -----');
            console.log(defenseCards);

            this.table.addAttackCards(attackCards);
            this.table.addDefenseCards(defenseCards);

            while(this.areAllCardsCovered() && attackCards.length) {
                attackCards = attackPlayer.attack(defensePlayer.hand.cardsCount(), defenseCards);
                defenseCards = defensePlayer.defense(attackCards);

                console.log('----- Attack Cards -----');
                console.log(attackCards);
                console.log('----- Defense Cards -----');
                console.log(defenseCards);

                this.table.addAttackCards(attackCards);
                this.table.addDefenseCards(defenseCards);
            }

            if (this.areAllCardsCovered()) {
                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;
                console.log('$$$$$ SWITCH PLAYERS $$$$$$');
            } else {
                defensePlayer.addCards(this.table.cards.all);
                console.log('$$$$$ LOOSE TURN $$$$$$');
            }

            this.table.clear();
        }

        if (!this.player1.hasCards()) {
            console.log('$$$$$ PLAYER1 WON $$$$$$');
            return 1;
        } else if (!this.player2.hasCards()) {
            console.log('$$$$$ PLAYER2 WON $$$$$$');
            return 2;
        } else {
            console.log('$$$$$ DEAD HEAT $$$$$$');
            return 0;
        }
    }

    areAllCardsCovered() {
        var attackCards = this.table.getAttackCards();
        var defenseCards = this.table.getDefenseCards();

        if (attackCards.length !== defenseCards.length) {
            return false;
        }

        for (var i = 0; i < attackCards.length; i++) {
            if (!this.isCardCovered(attackCards[i], defenseCards[i])) {
                return false;
            }
        }

        return true;
    }

    isCardCovered(attackCard, defenseCard) {
        var equalSuits = attackCard.suit === defenseCard.suit;
        var isDefenseTrump = defenseCard.suit === this.trump
        var heigherRank = attackCard.rank < defenseCard.rank;

        if (!equalSuits && !isDefenseTrump) {
            return false;
        }
        if (equalSuits && !heigherRank) {
            return false;
        }

        return true;
    }
}

module.exports = Game;
