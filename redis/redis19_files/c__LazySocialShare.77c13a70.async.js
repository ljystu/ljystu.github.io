(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{3819:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(2),i=n.n(o),c=n(730),l=n(289),s=n.n(l),u=s.a.mobile||s.a.tablet,f=navigator.userAgent.toLowerCase(),p=f.indexOf("iphone")>=0&&f.indexOf("safari")>=0&&f.indexOf("mobile safari")<0,m=function(e){var t=e.tipText,n=e.visible;return a.a.createElement("div",{className:"social-share"},u&&n&&a.a.createElement("div",{className:"doc-share-guide"},p?a.a.createElement("div",{className:"share-guide-safari"},a.a.createElement("div",{className:"doc-share-content"}),a.a.createElement("div",{className:"btn-close",onClick:e.onCancel},a.a.createElement(c.a,null))):a.a.createElement("div",{className:"share-guide-default"},a.a.createElement("div",{className:"doc-share-content"},t||__("点击右上角菜单分享给朋友"),a.a.createElement("button",{type:"button",className:"btn-close",onClick:e.onCancel},__("知道了"))))))};m.propTypes={tipText:i.a.string,visible:i.a.bool,onCancel:i.a.func};t.a=m},4381:function(e,t,n){"use strict";n.r(t);n(279);var r=n(136),a=(n(103),n(60)),o=n(0),i=n.n(o),c=n(2),l=n.n(c),s=n(754),u=n(755),f=n(589),p=n.n(f),m=n(289),d=n.n(m),b=n(3819);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,S(r.key),r)}}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=O(e);if(t){var a=O(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return w(this,n)}}function w(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return N(e)}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}function _(e,t,n){return(t=S(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e){var t=function(e,t){if("object"!==h(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==h(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===h(t)?t:String(t)}var j=d.a.mobile||d.a.tablet,k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(l,e);var t,n,o,c=E(l);function l(){var e;y(this,l);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return _(N(e=c.call.apply(c,[this].concat(n))),"state",{qrcode:null,shareGuideVisible:!1}),_(N(e),"getWeiboShareUrl",(function(){var t=e.props.doc,n=t.cover,r=t.description,a=encodeURIComponent(window.location.href),o=encodeURIComponent(n),i=encodeURIComponent(r?"".concat(document.title," | ").concat(r):document.title);return"https://service.weibo.com/share/share.php?url=".concat(a,"&pic=").concat(o,"&title=").concat(i)})),_(N(e),"generateQrcode",(function(){p.a.toDataURL(window.location.href,(function(t,n){e.setState({qrcode:n})}))})),_(N(e),"toggleShareGuide",(function(){e.setState((function(e){return{shareGuideVisible:!e.shareGuideVisible}}))})),e}return t=l,(n=[{key:"componentDidMount",value:function(){this.generateQrcode()}},{key:"render",value:function(){var e=this.props.book,t=window.appData,n=t.isYuque,o=t.isEnterprise,c=t.organization;return 0===e.public||!n||o||c&&c.id?null:i.a.createElement("div",{className:"social-share"},j?i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,{visible:this.state.shareGuideVisible,onCancel:this.toggleShareGuide}),i.a.createElement("span",{className:"social-share-item",onClick:this.toggleShareGuide},__("分享："),i.a.createElement("span",{className:"larkicon larkicon-share"}))):i.a.createElement("span",null,__("分享到："),i.a.createElement(a.a,{title:"分享到微博"},i.a.createElement("a",{className:"social-share-item",target:"_blank",href:this.getWeiboShareUrl()},i.a.createElement(s.a,null))),i.a.createElement("span",{className:"social-share-item"},this.state.qrcode&&i.a.createElement(r.a,{getPopupContainer:function(e){return e.parentNode},overlayStyle:{width:200},placement:"top",content:i.a.createElement("div",{className:"qrcode-block"},i.a.createElement("span",{className:"img"},i.a.createElement("img",{src:this.state.qrcode})),i.a.createElement("div",{className:"text"},i.a.createElement("p",null,__("微信扫一扫分享"))))},i.a.createElement("a",{className:"social-share-wechat"},i.a.createElement(u.a,null))))))}}])&&v(t.prototype,n),o&&v(t,o),Object.defineProperty(t,"prototype",{writable:!1}),l}(o.PureComponent);k.propTypes={book:l.a.object.isRequired,doc:l.a.object.isRequired};t.default=k}}]);