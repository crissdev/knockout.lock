describe('lock binding', function() {
    'use strict';

    var ko = window.ko;

    function createTestElement(viewModel, content) {
        var el = document.createElement('div');
        el.insertAdjacentHTML('afterbegin', content);
        ko.applyBindings(viewModel, el);
        return el;
    }

    it('should define the custom binding', function() {
        expect(ko.bindingHandlers.lock).toBeDefined();
    });

    it('should lock input', function() {
        var input = document.createElement('input');

        input.setAttribute('type', 'text');
        input.setAttribute('data-bind', 'lock: $data.lock');

        ko.applyBindings({ lock: ko.observable(true) }, input);

        expect(input.disabled).toBe(true);
    });

    it('should lock \'button\' element', function() {
        var input = document.createElement('button');

        input.setAttribute('data-bind', 'lock: $data.lock');
        ko.applyBindings({ lock: ko.observable(true) }, input);

        expect(input.disabled).toBe(true);
    });

    it('should lock \'select\' element', function() {
        var input = document.createElement('select');

        input.setAttribute('data-bind', 'lock: $data.lock');
        ko.applyBindings({ lock: ko.observable(true) }, input);

        expect(input.disabled).toBe(true);
    });

    it('should lock contained input', function() {
        var el = createTestElement({ lock: true }, '<div data-bind="lock: $data.lock"><input id="input" type="text"/></div>'),
            input = el.querySelector('#input');

        expect(input.disabled).toBe(true);
    });

    it('should lock all contained inputs', function() {
        var el = createTestElement({ lock: ko.observable(true) }, '<div data-bind="lock: $data.lock"><input id="input1" type="text"/><input id="input2" type="text"/></div>'),
            input1 = el.querySelector('#input1'),
            input2 = el.querySelector('#input2');

        expect(input1.disabled).toBe(true);
        expect(input2.disabled).toBe(true);
    });

    it('should lock all contained inputs except excluded', function() {
        var el = createTestElement({ lock: ko.observable(true) }, '<div data-bind="lock: $data.lock"><input id="input1" type="text" data-lock-exclude="true"/><input id="input2" type="text"/></div>'),
            input1 = el.querySelector('#input1'),
            input2 = el.querySelector('#input2');

        expect(input1.disabled).toBe(false);
        expect(input2.disabled).toBe(true);
    });

    it('should lock all contained inputs except excluded container', function() {
        var el = createTestElement({ lock: ko.observable(true) }, '<div data-bind="lock: $data.lock"><div><input id="input1" type="text"/></div><div data-lock-exclude="true"><input id="input2" type="text"/></div></div>'),
            input1 = el.querySelector('#input1'),
            input2 = el.querySelector('#input2');

        expect(input1.disabled).toBe(true);
        expect(input2.disabled).toBe(false);
    });

    it('should not lock any element', function() {
        var el = createTestElement({ lock: ko.observable(false) }, '<div><input id="input1" data-lock-exclude="true" type="text"/><input id="input2" data-lock-exclude="true" type="text"/></div>'),
            input1 = el.querySelector('#input1'),
            input2 = el.querySelector('#input2');

        expect(input1.disabled).toBe(false);
        expect(input2.disabled).toBe(false);
    });

    it('should not lock any contained element', function() {
        var el = createTestElement({ lock: ko.observable(false) }, '<div data-lock-exclude="true"><input id="input1" type="text"/><input id="input2" type="text"/></div>'),
            input1 = el.querySelector('#input1'),
            input2 = el.querySelector('#input2');

        expect(input1.disabled).toBe(false);
        expect(input2.disabled).toBe(false);
    });
});
