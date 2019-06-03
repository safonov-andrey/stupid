var fs = require('fs');

var SUITE = { 'H': 0, 'D': 1, 'C': 2, 'S': 3 };
var RANK = { '2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5,
    '8': 6, '9': 7, 'T': 8, 'J': 9, 'Q': 10, 'K': 11, 'A': 12 };

var fileParser = {
    getDataFromFile: function(path, callback) {
        fs.readFile(path, 'utf8', function(err, data) {  
            if (err) {
                throw err;
            }

            var lines = data.split('\n');
            var mainTrump = SUITE[lines[0].trim()];

            var dataArray = [];

            for (var i = 1; i < lines.length; i++) {
                var objData = getEmptyData();
                objData.trump = mainTrump;

                var [ player1, player2 ] = lines[i].split('|');

                objData.player1 = getPlayerCards(player1);
                objData.player2 = getPlayerCards(player2);

                dataArray.push(objData);
            }

            callback(dataArray);
        });
    }
};

function getEmptyData() {
    return {
        trump: null,
        player1: [],
        player2: []
    };
}

function getPlayerCards(stringCards) {
    var playerCards = [];
    stringCards.trim();

    var stringCardsArr = stringCards.trim().split(' ');
    stringCardsArr.forEach(stringCard => {
        var suiteString = stringCard.substring(0, 1);
        var rankString = stringCard.substring(1);

        playerCards.push({ suite: SUITE[suiteString], rank: RANK[rankString] });
    });

    return playerCards;
}

module.exports = fileParser;
