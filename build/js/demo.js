!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.render=e.pack=void 0;var r=i(n(8)),o=i(n(7));function i(t){return t&&t.__esModule?t:{default:t}}e.pack=r.default,e.render=o.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(['\n\t\t<div class="filters display_flex">\n\t\t\t',"\n\t\t</div>\n\t"],['\n\t\t<div class="filters display_flex">\n\t\t\t',"\n\t\t</div>\n\t"]),o=a(["\n\t\t\t\t\t<button\n\t\t\t\t\t\tclass=","\n\t\t\t\t\t\tclick=","\n\t\t\t\t\t>\n\t\t\t\t\t\t","\n\t\t\t\t\t</button>\n\t\t\t\t"],["\n\t\t\t\t\t<button\n\t\t\t\t\t\tclass=","\n\t\t\t\t\t\tclick=","\n\t\t\t\t\t>\n\t\t\t\t\t\t","\n\t\t\t\t\t</button>\n\t\t\t\t"]);e.default=function(t){var e=t.filters,n=t.selectFilter,a=t.currentFilter;return(0,i.pack)(r,e.map(function(t){var e=t.name===a.name;return(0,i.pack)(o,"filter-button "+(e?"active":""),function(){return n(t.name)},t.name)}))};var i=n(0);function a(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(['\n\t\t<footer class="main-footer">\n\t\t\tThis SPA is <b>packmar</b> library work demo.\n\t\t\tCheck it on <a href="https://github.com/krutoo/packmar.js" target="_blank">GitHub</a>.\n\t\t</footer>\n\t'],['\n\t\t<footer class="main-footer">\n\t\t\tThis SPA is <b>packmar</b> library work demo.\n\t\t\tCheck it on <a href="https://github.com/krutoo/packmar.js" target="_blank">GitHub</a>.\n\t\t</footer>\n\t']);e.default=function(){return(0,o.pack)(r)};var o=n(0)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=c(['\n\t\t<div class="formatted">\n\t\t\t',"\n\t\t</div>\n\t"],['\n\t\t<div class="formatted">\n\t\t\t',"\n\t\t</div>\n\t"]),o=c(["<span>","<br /></span>"],["<span>","<br /></span>"]),i=c(['\n\t\t<div class="note overflow_hidden">\n\t\t\t<button class="button check-button overflow_hidden" click="','">\n\t\t\t\t',"\n\t\t\t</button>\n\t\t\t<div class=",">\n\t\t\t\t",'\n\t\t\t</div>\n\t\t\t<button class="button remove-button overflow_hidden" click=',">\n\t\t\t\t❌\n\t\t\t</button>\n\t\t</div>\n\t"],['\n\t\t<div class="note overflow_hidden">\n\t\t\t<button class="button check-button overflow_hidden" click="','">\n\t\t\t\t',"\n\t\t\t</button>\n\t\t\t<div class=",">\n\t\t\t\t",'\n\t\t\t</div>\n\t\t\t<button class="button remove-button overflow_hidden" click=',">\n\t\t\t\t❌\n\t\t\t</button>\n\t\t</div>\n\t"]);e.default=function(t){var e=t.noteText,n=t.isCompleted,c=t.onRemove,u=t.onCheck,l="text "+(n?"text-decoration_line-through":""),s=(0,a.pack)(r,e.split("\n").map(function(t){return(0,a.pack)(o,t)}));return(0,a.pack)(i,u,n?"✔️":"",l,s,c)};var a=n(0);function c(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(['\n\t\t<textarea\n\t\t\trows="5"\n\t\t\tclass="main-field display_block width_100percent"\n\t\t\tplaceholder=',"\n\t\t\tinput=","\n\t\t>","</textarea>\n\t"],['\n\t\t<textarea\n\t\t\trows="5"\n\t\t\tclass="main-field display_block width_100percent"\n\t\t\tplaceholder=',"\n\t\t\tinput=","\n\t\t>","</textarea>\n\t"]);e.default=function(t){var e=t.value,n=t.placeholder,i=t.onInput;return(0,o.pack)(r,n,i,e)};var o=n(0)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(['\n\t\t<div class="app-wrapper display_flex width_100percent">\n\t\t\t<div class="main-content">\n\t\t\t\t<h1 class="main-title">',"</h1>\n\t\t\t\t",'\n\t\t\t\t<button class="width_100percent" click=',">To Do</button>\n\t\t\t\t",'\n\t\t\t\t<div class="notes-list">\n\t\t\t\t\t',"\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t","\n\t\t</div>\n\t"],['\n\t\t<div class="app-wrapper display_flex width_100percent">\n\t\t\t<div class="main-content">\n\t\t\t\t<h1 class="main-title">',"</h1>\n\t\t\t\t",'\n\t\t\t\t<button class="width_100percent" click=',">To Do</button>\n\t\t\t\t",'\n\t\t\t\t<div class="notes-list">\n\t\t\t\t\t',"\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t","\n\t\t</div>\n\t"]);e.default=function(t){var e=t.title,n=t.currentText,l=t.currentFilterName,s=t.notes,f=t.filters,d=t.typeNote,v=t.addNote,p=t.checkNote,b=t.removeNote,h=t.selectFilter,m=f.find(function(t){return t.name===l})||{},k=m.check||function(){return!0};return(0,o.pack)(r,e,(0,i.default)({placeholder:"Just start typing...",value:n,onInput:d}),v,s.length?(0,u.default)({filters:f,selectFilter:h,currentFilter:m}):"",s.filter(k).map(function(t){return(0,a.default)({noteText:t.text,isCompleted:t.checked,onCheck:function(){return p(t.id)},onRemove:function(){return b(t.id)}})}),(0,c.default)())};var o=n(0),i=l(n(4)),a=l(n(3)),c=l(n(2)),u=l(n(1));function l(t){return t&&t.__esModule?t:{default:t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.classOf=function(t){return Object.prototype.toString.call(t).slice(8,-1)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=c;var r=n(6);function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var i=new Map,a=/{%\d*%}/g;function c(t,e,n){var i=t.htmlString,f=t.valuesMap;if(!s(arguments[0]))throw new TypeError("First argument must be packed element");var d=u(i);if(function t(e){if(e instanceof Element)e.hasChildNodes()&&[].concat(o(e.childNodes)).forEach(function(e){return t(e)});else if(a.test(e.nodeValue)){var n=e.nodeValue.replace(a,function(t){return"\x3c!--"+t+"--\x3e"}),r=u(n);[].concat(o(r.childNodes)).forEach(function(t){e.parentNode.insertBefore(t,e)}),e.remove()}}(d),function t(e,n){e.hasChildNodes()&&[].concat(o(e.childNodes)).forEach(function(e){return t(e,n)});e instanceof Element?function(t,e){[].concat(o(t.attributes)).forEach(function(n){var o=n.name,i=n.value;if(e.hasOwnProperty(i.trim())){t.valuesMap=t.valuesMap||{};var u=e[i.trim()];switch((0,r.classOf)(u)){case"Number":case"String":t.setAttribute(o,u);break;case"Boolean":u?t.setAttribute(o,""):t.removeAttribute(o);break;case"Function":t.removeAttribute(o),t.addEventListener(o,u);break;default:s(u)?t.setAttribute(o,c(u).innerHTML):t.removeAttribute(o)}}else if(e.hasOwnProperty(o.trim())){var l=e[o.trim()];t.removeAttribute(o),t.setAttribute(l,!0)}else if(i.match(a))throw new SyntaxError('In "'+o+'" attribute: only one string or one expression must be in value')})}(e,n):e instanceof Comment&&function(t,e){var n=t.nodeValue;if(e.hasOwnProperty(n)){var o=e[n];switch((0,r.classOf)(o)){case"Boolean":case"Number":case"String":var i=l(String(o),!0);t.replaceWith(i.firstChild);break;case"Array":o.forEach(function(e){if(!s(e))throw new TypeError("Only the packed elements can be in the arrays");t.parentNode.insertBefore(c(e),t)});break;default:s(o)&&t.parentNode.insertBefore(c(o),t)}t.remove()}}(e,n)}(d,f),1!==d.children.length)throw new RangeError("Template must contains only one element");return e instanceof Element&&(n||(e.innerHTML=""),d.children.length&&e.insertAdjacentElement("beforeEnd",d.children[0])),d.children[0]}function u(t){var e=void 0;return i.has(t)?e=i.get(t):(e=l(t),i.set(t,e)),e.cloneNode(!0)}function l(t,e){t=String(t||"").trim();var n=document.createElement("div");return e?n.insertAdjacentText("afterBegin",t):n.insertAdjacentHTML("afterBegin",t),n}function s(t){t=t||{};var e="String"===(0,r.classOf)(t.htmlString),n="Object"===(0,r.classOf)(t.valuesMap);return e&&n}},function(t,e,n){"use strict";function r(t){return"{%"+Object.keys(t).length+"%}"}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){for(var e=[],n={},o=arguments.length,i=Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];for(var c=0;c<t.length;c++)if(e.push(t[c]),i.hasOwnProperty(c)){var u=r(n);n[u]=i[c],e.push(u)}return{htmlString:e.join("").trim(),valuesMap:n}}},function(t,e,n){"use strict";var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=n(0),i=function(t){return t&&t.__esModule?t:{default:t}}(n(5));var a=[{name:"All",check:function(){return!0}},{name:"Active",check:function(t){return!t.checked}},{name:"Completed",check:function(t){return t.checked}}],c={},u={currentFilterName:a[0].name,currentText:"",notes:[]};function l(t){var e=t.key;c[e]=!0;var n=1===e.length,r=Object.keys(c).length>1;n&&!r&&p()}function s(t){var e=t.key;delete c[e]}function f(){localStorage.setItem("state",JSON.stringify(u))}function d(t){var e=t.target;u.currentText=e.value}function v(){u.currentText.replace(/\s*/g,"").length?(u.notes.unshift({id:Math.random().toString(16).slice(2),text:u.currentText.trim(),checked:!1}),u.currentText="",k()):p()}function p(){var t=document.querySelector(".main-field");t&&t.focus()}function b(t){var e=u.notes.find(function(e){return e.id===t});e.checked=!e.checked,k()}function h(t){u.notes=u.notes.filter(function(e){return e.id!==t}),0===u.notes.length?m(a[0].name):k()}function m(t){u.currentFilterName=t,k()}function k(){var t=(0,i.default)({title:"📝 To Do App",currentText:u.currentText,currentFilterName:u.currentFilterName,notes:u.notes,filters:a,typeNote:d,addNote:v,checkNote:b,removeNote:h,selectFilter:m});(0,o.render)(t,document.body)}window.addEventListener("DOMContentLoaded",function(){var t=JSON.parse(localStorage.getItem("state"));u=r({},u,t),k(),p(),window.addEventListener("beforeunload",f),window.addEventListener("keydown",l),window.addEventListener("keyup",s)})},function(t,e,n){n(9),t.exports=n(15)},,,,,function(t,e){}]);
//# sourceMappingURL=demo.js.map