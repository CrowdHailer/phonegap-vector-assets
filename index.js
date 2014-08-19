var fs = require('fs')

function getConfigXML () {
    if (fs.existsSync('app/config.xml')) {
        return 'app/config.xml';
    }
}

module.exports = function () {
    var CONFIG_PATH = getConfigXML();

    fs.readFileSync(CONFIG_PATH);
};
