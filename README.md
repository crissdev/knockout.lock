# knockout.lock


A simple knockout binding to enable / disable input elements.

[![Build Status](https://travis-ci.org/CrissDev/knockout.lock.svg?branch=master)](https://travis-ci.org/CrissDev/knockout.lock)
[![devDependency Status](https://david-dm.org/CrissDev/knockout.lock/dev-status.svg)](https://david-dm.org/CrissDev/knockout.lock#info=devDependencies)


## Installation

Install with ```bower```:

    bower install knockout.lock

## Usage

```html
<div data-bind="lock: true">
    <!-- These inputs will be locked -->
    <input type="text"/>
    <input type="button" value="Update">
    
    <!-- Don't disable this input -->
    <input text="true" data-lock-exclude="true"/>
    
    <!-- Don't disable any inputs within this container -->
    <div data-lock-exclude="true">
        <input type="text"/>
    </div>
</div>
```

## License

Available via the MIT license.

