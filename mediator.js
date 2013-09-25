(function () {


var mediator = {};
var callbacks = {};
var references = {};
var slaugh = [];
var baserefs = {};

/*
 * Generates a unique id for saving callback references
 * source -> http://stackoverflow.com/a/2117523/1354092
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r&0x3 | 0x8);
        return v.toString(16);
    });
};

/*
 * Return a copy of the object without the blacklisted property.
 * Inspired by underscore.js
 */
function omit(obj, key) {
    var copy = {};

    Object.keys(obj, function (k) {
        if (k !== key) {
            copy[k] = obj[k];
        }
    });

    return copy;
};

/*
 * Returns a wrapped version of the initial callback that manages the listener deletion
 */
function callbackWrapper(name, callback, id) {
    return function (options) {
        var slaughIndex = slaugh.indexOf(slaughId(id, name));

        callback(options);
        if (slaughIndex >= 0) {
            mediator.off(name, callback);
            slaugh.splice(slaughIndex, 1);
        }
    };
}

/*
 * Returns, if exists, the associated id of the given callback reference
 */
function findIdByReference(callback) {
    var id = null;

    Object.keys(references).forEach(function (key) {
        if (baserefs.hasOwnProperty(key) && callback === baserefs[key]) {
            id = key;
        }
    });

    return id;
};


/*
 * Returns the formated slaugh id
 */
function slaughId(id, name) {
    return id + '!' + name;
}

/*
 *  Titanium.fireEvent wrapper
 */
mediator._trigger = function (name, options) {
    Titanium.App.fireEvent(name, options);
};

/*
 *  Titanium.addEventListener wrapper
 */
mediator._on = function (name, callback) {
    Titanium.App.addEventListener(name, callback);
};

/*
 *  Titanium.removeEventListener wrapper
 */
mediator._off = function (name, callback) {
    Titanium.App.removeEventListener(name, callback);
};


/*
 * Fires an event
 */
mediator.trigger = function (name, options) {
    mediator._trigger(name, options);
};

/*
 * Wrap the callback and uses the wrapper in the event listener
 */
mediator.on = function (name, callback) {
    var id = findIdByReference(callback);

    if (!callbacks.hasOwnProperty(name)) {
        callbacks[name] = {};
    }

    if (id === null) {
        id = uuid();
        references[id] = callbackWrapper(name, callback, id);
        baserefs[id] = callback;
    }

    mediator._on(name, references[id]);

    return id;
};

/*
 * Same as 'mediator.on' but listen only one time
 */
mediator.one = function (name, callback) {
    var id = mediator.on(name, callback);

    if (slaugh.indexOf(slaughId(id, name)) < 0) {
        slaugh.push(slaughId(id, name));
    }
};

/*
 * Remove a listener
 */
mediator.off = function (name, callback) {
    var id = findIdByReference(callback);

    if (id !== null) {
        mediator._off(name, references[id]);
    }
};

if (typeof module !== 'undefined') {
    module.exports = mediator;
} else if (typeof define !== 'undefined') {
    define('mediator', mediator);
} else if (typeof window !== 'undefined') {
    window.mediator = mediator;
}


})();