exports.inner = function (container, ratio) {
    var heightRatio = ratio.height / container.maximal.y;
    var widthRatio = ratio.width / container.maximal.x;
    var overratio = heightRatio > widthRatio ? heightRatio : widthRatio;

    ratio.width /= overratio;
    ratio.height /= overratio;

    if (ratio.width < ratio.height) {
        var diff = ratio.height - ratio.width;
        return {minimal: {x: diff/2, y: 0}, maximal: {x: 100 - diff/2, y: 100}};
    }
    var diff = ratio.width - ratio.height;
    return {minimal: {x: 0, y: diff/2}, maximal: {x: 100, y: 100 - diff/2}};
};