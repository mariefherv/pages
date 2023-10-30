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

      document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" class="kTDCWQ ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" style="${ attr(this.data.c.section) }">
          <div class="container" style="${ attr(this.data.c.container) }">
              ${ this.data.header.value }
              <div class="row" style="--theme-color: ${this.data.themeColor.value}; --button-text-color: ${this.data.buttonTextColor.value}">
              ${ 
                this.data.items.map(item => {

                  const features = item.features.value.split('\n')

                  return `
                    <div class="col">
                      <div class="pricing-box ${item.highlight.value == 1 ? "best-seller" : ''}">
                        ${item.highlight.value == 1 ? `<span class="ribbon">${__html(item.highlightText.value)}</span>` : ``}
                        <div class="text-area">
                          <h3>${ __html(item.heading.value) }</h3>
                          ${this.data.currencyPosition.value == 2 ?
                            `<h1>${ __html(item.price.value) }<sup><b>${  __html(this.data.currency.value) }</b></sup></h1>`
                            :
                            `<h1><sup><b>${  __html(this.data.currency.value) }</sup></b>${ __html(item.price.value) }</h1>`
                          }
                          <ul>
                            ${features.map(feature => {
                              const text = feature.split('::')
                              return `
                                <li><div class='feature-text'>${ __html(text[0]) }</div><div class='feature-indicator'>${ __html(text[1]) }</div></li>
                              `
                            }).join('')}
                          </ul>
                          <a href=${ __html(item.buttonLink.value) }><b>${ (__html(item.buttonText.value)) }</b></a>
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