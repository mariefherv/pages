// dependencies
import { __html, html, __attr, attr } from '@kenzap/k-cloud';

class kMp5sM{

    // init class
    constructor(data){
        
      // cache data
      this.data = data;
    
      // render section
      this.render();
    }

    // render class html
    render = () => {

      // for currency symbols
      const currencyList = ['&#36;','&#8364;','&#x20B1;','&#xa3;','&#xFFE5','&#xFFE5;']
      const currency = currencyList[this.data.currency.value]

      // for rates
      const rates = ['/hr', '/day', '/mo', '/yr']

      document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" class="kMp5sM ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" style="${ attr(this.data.c.section) }">
            <div class="container" style="${ attr(this.data.c.container) }">
              ${ this.data.header.value }
              <div class="row" style="--theme-color: ${this.data.textColor.value}; --button-color: ${this.data.buttonColor.value}">
              ${ 
                this.data.items.map(item => {
                  return `
                    <div class="col">
                      <div class="pricing-box">
                        <div class="img-area">
                          <img src=${item.icon.value} alt=${item.heading.value + ' image'}>
                        </div>
                        <div class="text-area">
                          <h3>${ __html(item.heading.value) }</h3>
                          <p>${ __html(item.text.value) }</p>
                          <h1><sup>${currency}</sup>${ __html(item.price.value) }<sub>${ __html(rates[item.rate.value]) }</sub></h1>
                          <ul>
                            ${item.features.map(feature => {
                              return `
                                <li>${ __html(feature.value) }</li>
                              `
                            }).join('')}
                          </ul>
                          <a href=${ __html(item.buttonLink.value) }>${ (__html(item.buttonText.value)) }</a>
                        </div>
                      </div>
                    </div>
                  `
                }).join('')           
              }
              </div>
          </div>
        </section>
        `
      );
    }
}

window.kMp5sM = kMp5sM;