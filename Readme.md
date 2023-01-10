# Banner-Alert-js

Offers methods for posting UI alerts.

<br>

**Table of contents** 
- [Installation](#installation)
- Examples
    - [Basic Usage](#basic-usage)
- [Public Methods](#public-methods) 
    - BannerAlert - Class
        - .transmit()

<br>

---

## Installation 

<br>

You can use NPM to download package into your project 
```
npm install banner-alert-js
```
OR you can import the module directly in your project with ES6 Modules

```HTML
<script type="module">
    import { BannerAlert } from './banner-alert-js/banner-alert.js';
</script>
```

<br>

---

## Basic Usage
See [*'/demo/basic-usage.html'*](https://github.com/jvuzzell/banner-alert-js/tree/main/demo) in repo for complete example

<br>

**HTML**
```HTML
<div class="banner-alerts"></div>
<button onclick="window.triggerExampleAlerts();">Trigger Alert</button>
```

**JavaScript**
```Javascript
<script type="module">
    // ES6 Module Import
    import { BannerAlert } from '/banner-alert-js/banner-alert.js'; 

    window.triggerExampleAlerts = function() {
        let messageType = 'success'; // Can be any value
        let message     = 'This is a success alert';
        let messageTtl  = 3000; // Measured in seconds
        let parentContainer = document.querySelector( '.banner-alerts' ); // This container can be anywhere in the document
        let customClassList = [ 'foo', 'bar', 'baz' ];

        BannerAlert.transmit( 
            messageType, 
            message, 
            parentContainer, 
            messageTtl, 
            customClassList
        );	
    }
</script>
```

<br>

---

## Public Methods

<br>

|Object|Method|Description|
|---|---|---|
| BannerAlert | transmit | Transmit receives five arguments: <br><br> - **Alert Type**; Expected value used to set [data-message-type] attribute on new HTML banner element. Can be used to style the alert. <br><br> - **Message**; Expected value string, used to populate innerHTML of new HTML banner element <br><br>  - **Parent Container** Denotes where to append the alert element<br><br>  - **TTL**; Expected value number, used to determine the duration of alert visibility <br><br>  - **Custom Class List**; Expected value array of class names, adds classes to banner element |
