/*! (c) 2014 Cristian Trifan (MIT) */
/*jshint quotmark:false*/
define(["knockout"],function(ko){

'use strict';


var _processElements = function(elements, lock) {
    var element, i;

    for (i = 0; i < elements.length; i++) {
        element = elements[i];

        if (element.getAttribute('data-lock-exclude') !== 'true') {
            if ('disabled' in element) {
                element.disabled = lock;
            }
            if (element.childElementCount > 0) {
                _processElements(element.children, lock);
            }
        }
    }
};


var lockBinding = {
    update: function(element, valueAccessor, allBindingsAccessor) {
        var lock = ko.utils.unwrapObservable(valueAccessor()),
            customSelector = allBindingsAccessor.get('lockSelector'),
            elements = [element];

        if (customSelector) {
            elements = element.querySelectorAll(customSelector);
        }
        _processElements(elements, !!lock);
    }
};

ko.bindingHandlers.lock = lockBinding;

return lockBinding;

});
