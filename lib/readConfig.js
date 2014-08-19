var fs = require('fs');
var xml2js = require('xml2js');
var ANDROID = require('./android-sizes');
var extend = require('xtend');

var parser = new xml2js.Parser();

module.exports = function (path, callback) {
    var data = fs.readFileSync(path);

    var normalizeOptions = [];
    parser.parseString(data, function (err, result) {
        var normalizeOptions = []
        result.widget['gap:splash'].forEach(function(item){
            var src = item.$['src'];
            var platform = item.$['gap:platform'];
            var width = item.$.width;
            var height = item.$.height;
            if (platform === 'blackberry') {
                normalizeOptions.push({src: src, width: 225, height: 225});
                return;
            }
            if (platform === 'winphone') {
                normalizeOptions.push({src: src, width: 480, height: 800});
                return;
            }
            if (platform === 'android') {
                var dim = ANDROID[item.$['gap:qualifier']];
                normalizeOptions.push(extend(dim, {src: src}));
                return;
            }
            if (platform === 'ios') {
                normalizeOptions.push({src: src, width: width, height: height});
                return;
            }
        });
        callback(normalizeOptions);
    });
};

