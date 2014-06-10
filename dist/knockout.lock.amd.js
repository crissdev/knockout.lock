/*! (c) 2014 Cristian Trifan (MIT) */
define(["knockout"],function(ko){

'use strict';


var _refreshBindings = function(element) {
    // If we have a disable binding then we request to be evaluated
    var context = ko.contextFor(element),
        bindingsAccessor = ko.bindingProvider.instance.getBindings(element, context);

    if (bindingsAccessor && bindingsAccessor.disable) {
        bindingsAccessor.disable.valueHasMutated();
    }
};

var _processTree = function(elements, lock) {
    var element, i;

    for (i = 0; i < elements.length; i++) {
        element = elements[i];

        if (element instanceof HTMLInputElement) {
            if (element.getAttribute('data-lock-exclude') !== 'true') {
                if (lock) {
                    element.setAttribute('disabled', 'disabled');
                }
                else {
                    element.removeAttribute('disabled');
                    _refreshBindings(element);
                }
            }
        }
        else if (element.getAttribute('data-lock-exclude') !== 'true') {
            _processTree(element.children, lock);
        }
    }
};


var lockBinding = {
    update: function(element, valueAccessor, allBindingsAccessor) {
        var lock = ko.utils.unwrapObservable(valueAccessor()),
            customSelector = allBindingsAccessor.get('lockSelector'),
            elements = [];

        if (element instanceof HTMLInputElement) {
            elements = [element];
        }
        else {
            elements = (customSelector ? element.querySelectorAll(customSelector) : element.children);
        }
        _processTree(elements, lock);
    }
};

ko.bindingHandlers.lock = lockBinding;

return lockBinding;

});
