// dependencies
import { __html, html, __attr, attr } from '@kenzap/k-cloud';

class kTDCWQ{

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
      const currencyList = ['&#36;','&#8364;','&#x20B1;','&#xa3;','&#xFFE5;','&#20803;']
      const currency = currencyList[this.data.currency.value]

      document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" class="kTDCWQ ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" style="${ attr(this.data.c.section) }">
          <div class="container" style="${ attr(this.data.c.container) }">
              ${ this.data.header.value }
              <div class="row" style="--theme-color: ${this.data.themeColor.value}; --button-text-color: ${this.data.buttonTextColor.value}">
              ${ 
                this.data.items.map(item => {

                  const features = item.features.value.split(', ')

                  return `
                    <div class="col">
                      <div class="pricing-box ${item.highlight.value == 1 ? "best-seller" : ''}">
                        ${item.highlight.value == 1 ? `<span class="ribbon">${__html(item.highlightText.value)}</span>` : ``}
                        <div class="text-area">
                          <h3>${ __html(item.heading.value) }</h3>
                          ${this.data.currency.value == 5 ?
                            `<h1>${ __html(item.price.value) }<sup>${currency}</sup></h1>`
                            :
                            `<h1><sup>${currency}</sup>${ __html(item.price.value) }</h1>`
                          }
                          <ul>
                            ${features.map(feature => {
                              const text = feature.split('::')
                              return `
                                <li><div class='feature-text'>${ __html(text[0]) }</div><div class='feature-indicator'>${ __html(text[1]) }</div></li>
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

window.kTDCWQ = kTDCWQ;