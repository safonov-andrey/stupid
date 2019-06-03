var Player = require('./player');
var Table = require('./table');

class Game {
    player1 = null;
    player2 = null;
    table = null;
    trump = null;

    constructor(data) {
        this.player1 = new Player(data.player1, data.trump, 1);
        this.player2 = new Player(data.player2, data.trump, 2);

        this.trump = data.trump;

        this.table = new Table(data.trump);
    }

    run() {
        var attackPlayer = this.player1;
        var defensePlayer = this.player2;

        while (attackPlayer.hasCards() && defensePlayer.hasCards()) {
            console.log('----- Attack Player Hand -----');
            console.log(attackPlayer.hand.getCards());
            console.log('----- Defense Player Hand -----');
            console.log(defensePlayer.hand.getCards());

            var attackCards = attackPlayer.attack(defensePlayer.hand.cardsCount());
            var revertCards = defensePlayer.attack(attackPlayer.hand.cardsCount(), attackCards);

            console.log('----- Attack Cards -----');
            console.log(attackCards);

            if (revertCards.length) {
                attackCards.push(...revertCards);

                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;

                console.log('----- Revert Card -----');
                console.log(revertCards);
                console.log('----- Attack Cards -----');
                console.log(attackCards);
                console.log('$$$$$ SWITCH PLAYERS WITH REVERT CARD $$$$$$');
            }

            var defenseCards = defensePlayer.defense(attackCards);

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

        if (!attackPlayer.hasCards() && !defensePlayer.hasCards()) {
            console.log('$$$$$ DEAD HEAT $$$$$$');
            return 0;
        } else if (!attackPlayer.hasCards()) {
            console.log(`$$$$$ ATTACK PLAYER ${attackPlayer.nameIndex} WON $$$$$$`);
            return attackPlayer.nameIndex;
        } else if (!defensePlayer.hasCards()) {
            console.log(`$$$$$ DEFENSE PLAYER ${defensePlayer.nameIndex} WON $$$$$$`);
            return defensePlayer.nameIndex;
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
        var equalSuits = attackCard.suite === defenseCard.suite;
        var isDefenseTrump = defenseCard.suite === this.trump
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
