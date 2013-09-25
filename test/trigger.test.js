var assert = require('assert');
var mediator = require('../mediator');
var Backbone = require('backbone');

mediator._on = Backbone.Events.on;
mediator._off = Backbone.Events.off;
mediator._trigger = Backbone.Events.trigger;

module.exports = {

    'mediator.trigger() | unique': function () {
        var data = {value : 0};

        mediator.on('test:trigger:unique', function (options) {
            options.value++;
        });

        mediator.trigger('test:trigger:unique', data);

        assert.equal(1, data.value);
    },

    'mediator.trigger() | several': function () {
        var data = {value : 0};

        mediator.on('test:trigger:several', function (options) {
            options.value++;
        });

        mediator.trigger('test:trigger:several', data);
        mediator.trigger('test:trigger:several', data);

        assert.equal(2, data.value);
    }

};