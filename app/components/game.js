var Logger = require('../utils/logger');

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
        Logger.logGameStart();

        var attackPlayer = this.player1;
        var defensePlayer = this.player2;

        while (attackPlayer.hasCards() && defensePlayer.hasCards()) {
            Logger.logAttackPlayerHand(attackPlayer);
            Logger.logDefensePlayerHand(defensePlayer);

            var attackCards = attackPlayer.startAttack(defensePlayer.hand.cardsCount());
            var revertCards = defensePlayer
                .getRevertCards(attackPlayer.hand.cardsCount() - attackCards.length, attackCards);

            Logger.logAttackCards(attackCards);

            if (revertCards.length) {
                attackCards.push(...revertCards);

                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;

                Logger.logRevertCards(revertCards);
                Logger.logAttackCards(attackCards);
                Logger.warning.playersSwitchedRevertCard();
            }

            var defenseCards = defensePlayer.defense(attackCards);

            Logger.logDefenseCards(defenseCards);

            this.table.addAttackCards(attackCards);
            this.table.addDefenseCards(defenseCards);

            while(this.areAllCardsCovered() && attackCards.length) {
                attackCards = attackPlayer.attack(defensePlayer.hand.cardsCount(), defenseCards);
                defenseCards = defensePlayer.defense(attackCards);

                Logger.logAttackCards(attackCards);
                Logger.logDefenseCards(defenseCards);

                this.table.addAttackCards(attackCards);
                this.table.addDefenseCards(defenseCards);
            }

            if (this.areAllCardsCovered()) {
                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;
                Logger.warning.defenseWonTurn();
            } else {
                defensePlayer.addCards(this.table.cards.all);
                Logger.warning.defenseLooseTurn();
            }

            this.table.clear();
        }

        return this.getGameResult(attackPlayer, defensePlayer);
    }

    getGameResult(attackPlayer, defensePlayer) {
        if (!attackPlayer.hasCards() && !defensePlayer.hasCards()) {
            Logger.gameOver.deadHeat();
            return 0;
        } else if (!attackPlayer.hasCards()) {
            Logger.gameOver.attackPlayerWon(attackPlayer.nameIndex);
            return attackPlayer.nameIndex;
        } else if (!defensePlayer.hasCards()) {
            Logger.gameOver.defensePlayerWon(defensePlayer.nameIndex);
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
