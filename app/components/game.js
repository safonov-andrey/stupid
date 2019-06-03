var Logger = require('../utils/logger');

var Player = require('./player');
var Table = require('./table');
/**
 * This class runs the Stupid game. 
 * It implements game rules.
 */
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

    /**
     * Run game
     */
    run() {
        Logger.logGameStart();

        var attackPlayer = this.player1;
        var defensePlayer = this.player2;
 
        // repeat rounds as long as both players have cards in hands
        while (attackPlayer.hasCards() && defensePlayer.hasCards()) {
            Logger.logAttackPlayerHand(attackPlayer);
            Logger.logDefensePlayerHand(defensePlayer);

            // attacker calculates cards for attack
            var attackCards = attackPlayer.startAttack(defensePlayer.hand.cardsCount());
            // defender tries to revert the attack
            var revertCards = defensePlayer
                .getRevertCards(attackPlayer.hand.cardsCount() - attackCards.length, attackCards);

            Logger.logAttackCards(attackCards);
            // if defender has cards of same rank, he reverts the attack:
            // we add all revert cards to attack cards and swap player roles.
            if (revertCards.length) {
                attackCards.push(...revertCards);

                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;

                Logger.logRevertCards(revertCards);
                Logger.logAttackCards(attackCards);
                Logger.warning.playersSwitchedRevertCard();
            }

            // defence player calculates cards that would cover attack cards.
            // if at least one attack card cannot be covered - defence player 
            // returns an empty array - because he doesn't want to show the cards.
            var defenseCards = defensePlayer.defense(attackCards);

            Logger.logDefenseCards(defenseCards);

            this.table.addAttackCards(attackCards);
            this.table.addDefenseCards(defenseCards);

            // in this cycle we repeat the attack as long as all cards from
            // previous attack have been covered and attacker have more cards to add to attack
            while(this.areAllCardsCovered() && attackCards.length) {
                attackCards = attackPlayer.attack(defensePlayer.hand.cardsCount(), defenseCards);
                defenseCards = defensePlayer.defense(attackCards);

                Logger.logAttackCards(attackCards);
                Logger.logDefenseCards(defenseCards);

                this.table.addAttackCards(attackCards);
                this.table.addDefenseCards(defenseCards);
            }
            // if all  cards have been covered - defender has won the round and we swap player roles
            if (this.areAllCardsCovered()) {
                var tmpPlayer = attackPlayer;
                attackPlayer = defensePlayer;
                defensePlayer = tmpPlayer;
                Logger.warning.defenseWonTurn();
            } else { // if cards haven't been covered, defence player collects all the cards from current turn.
                defensePlayer.addCards(this.table.cards.all);
                Logger.warning.defenseLooseTurn();
            }

            this.table.clear();
        }

        return this.getGameResult(attackPlayer, defensePlayer);
    }

    /**
     * Calculate and show game results.
     * @param {Player} attackPlayer
     * @param {Player} defensePlayer
     * @returns {Number} - 0 dead heat|1 player1 won|2 player2 won.
     */
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

    /**
     * Check if all cards on the table covered: for each attack card 
     * there is defence card that has higher rank or trump.
     * @returns {Boolean}
     */
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

    /**
     * Check if attack card can be beaten with defense card: 
     * defence card should have higher rank or be trump.
     * If attack card is trump - defence card should have higher rank.
     * @param { {suite, rank} } attackCard 
     * @param { {suite, rank} } defenseCard 
     * @returns {Boolean}
     */
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
