var fs = require('fs');
var shell = require('shelljs')

function getConfigXML () {
    if (fs.existsSync('app/config.xml')) {
        return process.cwd() + '/app/config.xml';
    }
}

module.exports = function () {
    var CONFIG_PATH = getConfigXML();

    require('./lib/readConfig')(CONFIG_PATH, function (ress) {
        var commands = require('./lib/inkscapeCommands')(ress, function (command) {
            console.log(shell.exec(command));
        });
    });
};
