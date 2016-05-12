var Utils = {};

Utils.extend = function (source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
};

Utils.toggleClass = function (ele, activeClass) {
    if (ele.classList) {
        ele.classList.toggle(activeClass);
    } else {
        var classes = ele.className.split(' ');
        var existingIndex = classes.indexOf(activeClass);

        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        } else {
            classes.push(activeClass);
        }

        ele.className = classes.join(' ');
    }
};

Utils.closest = function (el, clazz) {
    while (el.className !== clazz) {
        el = el.parentNode;
        if (!el) {
            return null;
        }
    }
    return el;
};

module.exports = Utils;
