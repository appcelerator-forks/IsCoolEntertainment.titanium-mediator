var assert = require('assert');
var mediator = require('../mediator');
var Backbone = require('backbone');

mediator._on = Backbone.Events.on;
mediator._off = Backbone.Events.off;
mediator._trigger = Backbone.Events.trigger;

module.exports = {

    'mediator.one()': function () {
        var data = {value : 0};

        mediator.one('test:one', function (options) {
            options.value++;
        });

        mediator.trigger('test:one', data);
        mediator.trigger('test:one', data);

        assert.equal(1, data.value);
    }

};