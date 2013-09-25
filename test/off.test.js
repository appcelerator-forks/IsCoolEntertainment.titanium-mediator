var assert = require('assert');
var mediator = require('../mediator');
var Backbone = require('backbone');

mediator._on = Backbone.Events.on;
mediator._off = Backbone.Events.off;
mediator._trigger = Backbone.Events.trigger;

module.exports = {

    'mediator.off() | specified': function () {
        var data = {value : 0};

        var callback = function (options) {
            options.value++;
        };

        mediator.on('test:off:specified', callback);

        mediator.trigger('test:off:specified', data);

        mediator.off('test:off:specified', callback)

        mediator.trigger('test:off:specified', data);

        assert.equal(1, data.value);
    }

};