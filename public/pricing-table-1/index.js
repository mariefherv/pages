!function(){"use strict";function e(e,n){for(var a=0;a<n.length;a++){var o=n[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,t(o.key),o)}}function t(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}const n=e=>0===(e=String(e)).length?"":e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[e]))),a=(e,...t)=>{if(0===(e=String(e)).length)return"";return((e,t,...n)=>{let a=(e,t)=>(t.forEach(((t,n)=>{e=e.replace("%"+(n+1)+"$",t)})),e);return void 0===window.i18n||void 0===window.i18n.state.locale.values[e]?a(e,n):a(t(window.i18n.state.locale.values[e]),n)})(e,(e=>e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[e])))),...t)},o=()=>{let e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},c=e=>{let t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let a=n[e];for(;" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""};c("kenzap_api_key"),c("locale")&&c("locale"),(()=>{let e=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,t=window.location.hostname+"/"+o()+"/"+c("locale");t!=c("check")&&(e=0,console.log("refresh")),((e,t,n)=>{let a="";if(n){let e=new Date;e.setTime(e.getTime()+24*n*60*60*1e3),a=";expires="+e.toUTCString()}document.cookie=e+"="+(escape(t)||"")+a+";path=/;domain=.kenzap.cloud"})("check",t,5)})(),c("kenzap_token"),o();var r,i,l,u=(r=function e(o){var c,r,i,l=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c=this,i=function(){var e=["&#36;","&#8364;","&#x20B1;","&#xa3;","&#xFFE5;","&#20803;"][l.data.currency.value],t=["/hr","/day","/mo","/yr"];document.querySelector("#content").insertAdjacentHTML("beforeend",'\n        <section id="'.concat(n(l.data.id),'" class="kMp5sM ').concat(l.data.c.classes?n(l.data.c.classes):"",'" style="').concat(n(l.data.c.section),'">\n            <div class="container" style="').concat(n(l.data.c.container),'">\n              ').concat(l.data.header.value,'\n              <div class="row" style="--theme-color: ').concat(l.data.textColor.value,"; --button-color: ").concat(l.data.buttonColor.value,"; --button-text-color: ").concat(l.data.buttonTextColor.value,'">\n              ').concat(l.data.items.map((function(n){var o=n.features.value.split(", ");return'\n                    <div class="col">\n                      <div class="pricing-box '.concat(1==n.highlight.value?"highlight":"",'">\n                        <div class="img-area">\n                          <img src=').concat(n.icon.value," alt=").concat(n.heading.value+" image",'>\n                        </div>\n                        <div class="text-area">\n                          <h3>').concat(a(n.heading.value),"</h3>\n                          <p>").concat(a(n.text.value),"</p>\n                          ").concat(5==l.data.currency.value?"<h1>".concat(a(n.price.value),"<sup>").concat(e,"</sup><sub>").concat(a(t[n.rate.value]),"</sub></h1>"):"<h1><sup>".concat(e,"</sup>").concat(a(n.price.value),"<sub>").concat(a(t[n.rate.value]),"</sub></h1>"),"\n                          <ul>\n                            ").concat(o.map((function(e){return"\n                                <li>".concat(a(e),"</li>\n                              ")})).join(""),"\n                          </ul>\n                          <a href=").concat(a(n.buttonLink.value),">").concat(a(n.buttonText.value),"</a>\n                        </div>\n                      </div>\n                    </div>\n                  ")})).join(""),"\n            </div>\n          </div>\n        </section>\n        "))},(r=t(r="render"))in c?Object.defineProperty(c,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):c[r]=i,this.data=o,this.render()},i&&e(r.prototype,i),l&&e(r,l),Object.defineProperty(r,"prototype",{writable:!1}),r);window.kMp5sM=u}();
