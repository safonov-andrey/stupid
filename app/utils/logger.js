var Logger = {
    logGameStart: function() {
        console.log('##### NEW GAME STARTED #####');
    },
    logAttackPlayerHand: function(attackPlayer) {
        console.log('----- Attack Player Hand -----');
        console.log(attackPlayer.hand.getCards());
    },
    logDefensePlayerHand: function(defensePlayer) {
        console.log('----- Defense Player Hand -----');
        console.log(defensePlayer.hand.getCards());
    },
    logAttackCards: function(attackCards) {
        console.log('----- Attack Cards -----');
        console.log(attackCards);
    },
    logDefenseCards: function(defenseCards) {
        console.log('----- Defense Cards -----');
        console.log(defenseCards);
    },
    logRevertCards: function(revertCards) {
        console.log('----- Revert Cards -----');
        console.log(revertCards);
    },
    warning: {
        playersSwitchedRevertCard: function() {
            console.log('$$$$$ SWITCH PLAYERS WITH REVERT CARD $$$$$$');
        },
        defenseWonTurn: function() {
            console.log('$$$$$ DEFENSE WON TURN $$$$$$');
        },
        defenseLooseTurn: function() {
            console.log('$$$$$ DEFENSE LOOSE TURN $$$$$$');
        }
    },
    gameOver: {
        deadHeat: function() {
            console.log('##### DEAD HEAT #####');
        },
        attackPlayerWon: function(index) {
            console.log(`##### ATTACK PLAYER ${index} WON #####`);
        },
        defensePlayerWon: function(index) {
            console.log(`##### DEFENSE PLAYER ${index} WON #####`);
        },
    }
};

module.exports = Logger;
