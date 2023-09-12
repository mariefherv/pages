
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */

  /*
   * Translates string based on preloaded i18n locale values.
   * 
   * @param text {String} text to translate
   * @param cb {Function} callback function to escape text variable
   * @param p {String} list of parameters, to be replaced with %1$, %2$..
   * @returns {String} - text
   */
  const __esc = (text, cb, ...p) => {

      let match = (input, pa) => {

          pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
          
          return input;
      };

      if(typeof window.i18n === 'undefined') return match(text, p);
      if(window.i18n.state.locale.values[text] === undefined) return match(text, p);

      return match(cb(window.i18n.state.locale.values[text]), p);
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities.
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const attr = (text) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&apos;',
              '"': '&quot;'
          } [tag]));
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translations
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __html = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[&<>'"]/g, tag => (
              {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  "'": '&apos;',
                  '"': '&quot;'
              } [tag]));
      };

      return __esc(text, cb, ...p);
  };

  /**
   * @name spaceID
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
   const spaceID = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.cloud subdomains
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {string} days - Number of days when cookie expires.
   */
   const setCookie = (name, value, days) => {

      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.cloud"; 
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name checkHeader
   * @description This function tracks UI updates, creates header version checksum and compares it after every page reload
   * @param {object} object - API response.
   */
   const checkHeader = () => {

      let version = (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0;
      let check = window.location.hostname + '/' + spaceID() + '/' + getCookie('locale');
      if(check != getCookie('check')){ version = 0; console.log('refresh'); }
      
      setCookie('check', check, 5);

      return version
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   * @deprecated
   */
   ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  });

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  var kH5Qx2 = _createClass(function kH5Qx2(data) {
    var _this = this;
    _classCallCheck(this, kH5Qx2);
    _defineProperty(this, "render", function () {
      var array1 = _this.data.items.slice(0, Math.floor(_this.data.items.length / 2));
      var array2 = _this.data.items.slice(Math.floor(_this.data.items.length / 2));
      document.querySelector('#content').insertAdjacentHTML('beforeend', "\n        <section id=\"".concat(attr(_this.data.id), "\" \n            class=\"kH5Qx2 ").concat(_this.data.c.classes ? attr(_this.data.c.classes) : '', "\"\n            style=\"\n            ").concat(attr(_this.data.c.section), "\">\n            <div class=\"container\" style=\"").concat(attr(_this.data.c.container), "\">\n            \n            ").concat(_this.data.col.value == 2 ? "\n                <div class=\"kH5Qx2-row\">\n                    <div class=\"col-6\">\n                        <ul class=\"accordion\">\n                        ".concat(array1.map(function (item) {
        return "\n                                <li>\n                                    <a class=\"toggle\" href=\"#\"><span class=\"plus\"></span><b> ".concat(__html(item.heading.value), " </b></a>\n                                    <div class=\"inner\">\n                                    <p>").concat(__html(item.text.value), "</p>\n                                    </div>\n                                </li>\n                                    ");
      }).join(''), "\n                        </ul>\n                    </div>\n                    <div class=\"col-6\">\n                        <ul class=\"accordion\">\n                        ").concat(array2.map(function (item) {
        return "\n                                <li>\n                                    <a class=\"toggle\" href=\"#\"><span class=\"plus\"></span><b> ".concat(__html(item.heading.value), " </b></a>\n                                    <div class=\"inner hide\">\n                                    <p>").concat(__html(item.text.value), "</p>\n                                    </div>\n                                </li>\n                                    ");
      }).join(''), "\n                        </ul>\n                    </div>\n                </div>\n                ") : "\n                <ul class=\"accordion\">\n                    ".concat(_this.data.items.map(function (item) {
        return "\n                            <li>\n                                <a class=\"toggle\" href=\"#\"><span class=\"plus\"></span><b> ".concat(__html(item.heading.value), " </b></a>\n                                <div class=\"inner\">\n                                <p>").concat(__html(item.text.value), "</p>\n                                </div>\n                            </li>\n                            ");
      }).join(''), "\n                </ul>\n                "), "\n            </div>\n        </section>\n        "));
    });
    _defineProperty(this, "listeners", function () {
      onClick('.kH5Qx2 .toggle', function (e) {
        e.preventDefault();
        var el = e.currentTarget;
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          el.nextElementSibling.classList.remove('show');
        } else {
          var parent = el.parentElement.parentElement;
          var inner = parent.querySelectorAll('li .inner');
          inner.forEach(function (innerElement) {
            innerElement.classList.remove('show');
          });
          el.nextElementSibling.classList.add('show');
          var tog = parent.querySelectorAll('li .toggle');
          tog.forEach(function (innerElement) {
            innerElement.classList.remove('active');
          });
          el.classList.add('active');
        }
      });
    });
    this.data = data;
    this.render();
    this.listeners();
  });
  window.kH5Qx2 = kH5Qx2;

})();
//# sourceMappingURL=index.js.map
