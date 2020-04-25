/*
* Project: @gamedistribution.com/tubia
* Description: Tubia.com HTML5 video player
* Development By: Tubia.com
* Copyright(c): 2020
* Version: 2.0.32 (16-04-2020 09:28)
*/
!function r(a,s,d){function l(o,t){if(!s[o]){if(!a[o]){var e="function"==typeof require&&require;if(!t&&e)return e(o,!0);if(u)return u(o,!0);var n=new Error("Cannot find module '"+o+"'");throw n.code="MODULE_NOT_FOUND",n}var i=s[o]={exports:{}};a[o][0].call(i.exports,function(t){return l(a[o][1][t]||t)},i,i.exports,r,a,s,d)}return s[o].exports}for(var u="function"==typeof require&&require,t=0;t<d.length;t++)l(d[t]);return l}({1:[function(t,o,e){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=window.Tubia||{};i.Player=t("tubia"),window.Tubia=i;var r="object"===n(window.TUBIA_OPTIONS)&&window.TUBIA_OPTIONS?window.TUBIA_OPTIONS:window.gdPlayer&&window.gdPlayer.q&&0<window.gdPlayer.q.length&&0<window.gdPlayer.q[0].length&&"object"===n(window.gdPlayer.q[0][0])&&window.gdPlayer.q[0][0]?window.gdPlayer.q[0][0]:{};0!==Object.keys(r).length&&new i.Player.default(r)},{"tubia":2}],2:[function(t,o,e){"use strict";function n(t,o){for(var e=0;e<o.length;e++){var n=o[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){function e(t){var o=this;!function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=t,"interactive"===document.readyState||"complete"===document.readyState?this.start():document.addEventListener("DOMContentLoaded",function(){o.start()})}return function(t,o,e){o&&n(t.prototype,o),e&&n(t,e)}(e,[{key:"start",value:function(){var o=this,t=[{publisherid:this.options.publisherId,title:this.options.title,gameid:this.options.gameId,colormain:this.options.colorMain,coloraccent:this.options.colorAccent,gdprtracking:this.options.gdprTracking,gdprtargeting:this.options.gdprTargeting,langcode:this.options.langCode,debug:this.options.debug,testing:this.options.testing,videointerval:this.options.videoInterval,category:this.options.category,keys:this.options.keys,url:document.location.origin+document.location.pathname,href:document.location.href,magicvideo:this.options.magicvideo}],e=t[0].url.toLowerCase().replace(/^(?:https?:\/\/)?/i,"").split("/")[0],n="https://player.tubia.com/index.html?";"localhost:8081"===e?n="/test/index.html?":this.options.debug&&(n="https://player.tubia.com/test/index.html?"),t.forEach(function(e){n+=Object.keys(e).filter(function(t){return void 0!==e[t]}).map(function(t){var o=e[t];return"category"!==t&&"keys"!==t||(o=JSON.stringify(e[t])),"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(o))}).join("&")});var i=document.createElement("iframe");i.src=n,i.setAttribute("id","tubiaFrame"),i.setAttribute("frameBorder","0"),i.setAttribute("scrolling","no"),i.setAttribute("allowfullscreen","true"),i.setAttribute("muted","muted"),i.setAttribute("allow","autoplay"),i.style.top="0",i.style.right="0",i.style.bottom="0",i.style.left="0",i.width=this.options.width||"100%",i.height=this.options.height||"100%";var r=document.getElementById(this.options.container);if(r)if(void 0===this.options.height){i.style.height="0",i.style.width="0",i.style.minWidth="100%",i.style.minHeight="100%",i.style.maxWidth="100%",i.style.maxHeight="100%";var a=document.createElement("div");a.style.position="relative",a.style.padding="56.25% 0 0 0",i.style.position="absolute",r.appendChild(a),a.appendChild(i)}else r.appendChild(i);else console.error("There is no container element for Tubia set.");window.addEventListener("message",function(t){"../../../localhost_3A8081"!==t.origin&&"../../../https@player.tubia.com"!==t.origin||t.data&&("onStart"===t.data.name&&"function"==typeof o.options.onStart&&o.options.onStart(t.data.payload),"onFound"===t.data.name&&"function"==typeof o.options.onFound&&o.options.onFound(t.data.payload),"onNotFound"===t.data.name&&"function"==typeof o.options.onNotFound&&o.options.onNotFound(t.data.payload),"onError"===t.data.name&&"function"==typeof o.options.onError&&o.options.onError(t.data.payload),"onReady"===t.data.name&&"function"==typeof o.options.onReady&&o.options.onReady(t.data.payload))},!1)}}]),e}();e.default=i},{}]},{},[1]);
//# sourceMappingURL=gd.js.map