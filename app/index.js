var Game = require('./components/game');
var fileParser = require('./utils/file-parser');

fileParser.getDataFromFile('./app/data/test.data.txt', dataArray => {
    var results = [];

    var game = new Game(dataArray[6]);
    console.log(game.run());

    // dataArray.forEach(data => {
    //     var game = new Game(data);
    //     results.push(game.run());
    // });

    // console.log(results.join('') === '1211112121221102212111211012111211111111211211112112111112111111121211111111202222011111011111112111');
    //                                // 1211110121221102212111201112111211111111211011222112111112111111121211111111222222011111011011111111

    // console.log(results.join(''));
});
