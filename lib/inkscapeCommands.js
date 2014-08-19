var xml2js = require('xml2js');
var fs = require('fs');
var interpolate = require('interpolate');
var rectangles = require('./rectangles');

var SPLASHSCREEN_PATH = 'app/resources/splashscreen.svg'
var STRING_TEMPLATE = 'inkscape --export-area={x0}:{y0}:{x1}:{y1} --export-png=www/{output} --export-height={height} {raw}'; 

var parser = new xml2js.Parser();

module.exports = function (arr, callback) {
    var raw = fs.readFileSync(SPLASHSCREEN_PATH)
    parser.parseString(raw, function (err, result) {
        var width = result.svg.$.width;
        var height = result.svg.$.height;
        var container = {minimal: {x: 0, y: 0}, maximal: {x: width, y: height}};


        arr.forEach(function (item) {
            var box = rectangles.inner(container, {width: item.width, height: item.height})
            var str = interpolate(STRING_TEMPLATE, {
                x0: box.minimal.x,
                y0: box.minimal.y,
                x1: box.maximal.x,
                y1: box.maximal.y,
                height: item.height,
                output: item.src,
                raw: SPLASHSCREEN_PATH
            });
            callback(str)
        });
    });
};