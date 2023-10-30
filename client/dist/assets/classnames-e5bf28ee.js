var p=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function u(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var f={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var r={}.hasOwnProperty;function n(){for(var o=[],s=0;s<arguments.length;s++){var e=arguments[s];if(e){var l=typeof e;if(l==="string"||l==="number")o.push(e);else if(Array.isArray(e)){if(e.length){var a=n.apply(null,e);a&&o.push(a)}}else if(l==="object"){if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]")){o.push(e.toString());continue}for(var i in e)r.call(e,i)&&e[i]&&o.push(i)}}}return o.join(" ")}t.exports?(n.default=n,t.exports=n):window.classNames=n})()})(f);var c=f.exports;const d=u(c);export{d as a,p as c,u as g};
