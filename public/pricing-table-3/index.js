
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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

  var kOoZtT = _createClass(function kOoZtT(data) {
    var _this = this;
    _classCallCheck(this, kOoZtT);
    _defineProperty(this, "render", function () {
      var array1 = _this.data.items.slice(0, Math.ceil(_this.data.items.length / 2));
      var array2 = _this.data.items.slice(Math.ceil(_this.data.items.length / 2));
      var currencyList = ['', '&#36;', '&#8364;', '&#x20B1;', '&#xa3;', '&#xFFE5;', '&#20803;'];
      var currency = currencyList[_this.data.currency.value];
      console.log(_this.data.currency.value);
      document.querySelector('#content').insertAdjacentHTML('beforeend', "\n        <section id=\"".concat(attr(_this.data.id), "\" class=\"kOoZtT ").concat(_this.data.c.classes ? attr(_this.data.c.classes) : '', "\" style=\"").concat(attr(_this.data.c.section), "\">\n            <div class=\"container\" style=\"").concat(attr(_this.data.c.container), "\">\n              ").concat(_this.data.header.value, "\n              ").concat(_this.data.col.value == 2 ? "\n                <div class=\"row\" style=\"".concat("--" + attr(_this.data.c.section), "; --text-color: ").concat(_this.data.textColor.value, "\">\n                    <div class=\"col-6\">\n                        <ul>\n                          ").concat(array1.map(function (item) {
        return "\n                                <li class=\"pricing-box\">\n                                  <h4>".concat(__html(item.title.value), "</h4>\n                                  <p><span>").concat(__html(item.description.value), "</span><span>").concat(_this.data.currency.value != 6 ? currency + __html(item.price.value) : __html(item.price.value) + currency, "</span></p>\n                                </li>\n                                    ");
      }).join(''), "\n                        </ul>\n                    </div>\n                    <div class=\"col-6\">\n                        <ul>\n                          ").concat(array2.map(function (item) {
        return "\n                                <li class=\"pricing-box\">\n                                  <h4>".concat(__html(item.title.value), "</h4>\n                                  <p><span>").concat(__html(item.description.value), "</span><span>").concat(_this.data.currency.value != 6 ? currency + __html(item.price.value) : __html(item.price.value) + currency, "</span></p>\n                                </li>\n                                    ");
      }).join(''), "\n                      </ul>\n                    </div>\n                </div>\n                ") : "\n                <ul style=\"".concat("--" + attr(_this.data.c.section), "; --text-color: ").concat(_this.data.textColor.value, "\">\n                    ").concat(_this.data.items.map(function (item) {
        return "\n                          <li class=\"pricing-box\">\n                            <h4>".concat(__html(item.title.value), "</h4>\n                            <p><span>").concat(__html(item.description.value), "</span><span>").concat(_this.data.currency.value != 6 ? currency + __html(item.price.value) : __html(item.price.value) + currency, "</span></p>\n                          </li>\n                            ");
      }).join(''), "\n                </ul>\n                "), "\n            </div>\n        </section>\n        "));
    });
    this.data = data;
    this.render();
  });
  window.kOoZtT = kOoZtT;

})();
//# sourceMappingURL=index.js.map
