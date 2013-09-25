var assert = require('assert');
var mediator = require('../mediator');
var Backbone = require('backbone');

mediator._on = Backbone.Events.on;
mediator._off = Backbone.Events.off;
mediator._trigger = Backbone.Events.trigger;

module.exports = {

    'mediator.on() | unique': function () {
        var data = {value : 0};

        mediator.on('test:on:unique', function (options) {
            options.value++;
        });

        mediator.trigger('test:on:unique', data);

        assert.equal(1, data.value);
    },

    'mediator.on() | several': function () {
        var data = {value : 0};

        mediator.on('test:on:several', function (options) {
            options.value++;
        });

        mediator.on('test:on:several', function (options) {
            options.value += 2;
        });

        mediator.trigger('test:on:several', data);

        assert.equal(3, data.value);
    }

};