function getConfigXML () {
    if (fs.existsSync('app/config.xml')) {
        return process.cwd() + '/app/config.xml';
    }
}

module.exports = function () {
    var CONFIG_PATH = getConfigXML();

    require('./lib/readConfig')(CONFIG_PATH, function (ress) {
        console.log(ress)
    });
};
