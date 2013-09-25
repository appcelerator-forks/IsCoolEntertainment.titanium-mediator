[![Build Status](https://travis-ci.org/dawicorti/titanium-mediator.png?branch=master)](https://travis-ci.org/dawicorti/titanium-mediator)

# Titanium Mediator

  An advanced event manager for [Titanium](http://www.appcelerator.com/titanium/) inspired by [jQuery](http://api.jquery.com/one/) and [Backbone](http://backbonejs.org/#Events).
  Its major purpose: add a "one" listener for Titanium.

  Works in Titanium or [Webview](http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.WebView) environment. With or without [Alloy](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Framework).
  
## Functions

### mediator.trigger(name, options)

  Fires an event using Titanium.App

### mediator.on(name, callback)

  Binds a callback function using Titanium.App

### mediator.off(name, callback)

  Remove the callback binding for this event name.

### mediator.one(name, callback)

  Same as mediator.on, but bind only one time.

## Todo

* Allow calling `mediator.off` without giving a callback parameter (remove all listeners).
* Clean references when they're no more needed.
