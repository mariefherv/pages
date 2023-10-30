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

      // for rates
      const rates = ['', '/hr', '/day', '/mo', '/yr']

      document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" class="kMp5sM ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" style="${ attr(this.data.c.section) }">
            <div class="container" style="${ attr(this.data.c.container) }">
              ${ this.data.header.value }
              <div class="row" style="--theme-color: ${this.data.textColor.value}; --button-color: ${this.data.buttonColor.value}; --button-text-color: ${this.data.buttonTextColor.value}">
              ${ 
                this.data.items.map(item => {

                  const features = item.features.value.split('\n')

                  return `
                    <div class="col">
                      <div class="pricing-box ${item.highlight.value == 1 ? 'highlight' : ''}">
                        <div class="img-area">
                          <img src=${ __html(item.icon.value) } alt=${ __html(item.heading.value) + ' image'}>
                        </div>
                        <div class="text-area">
                          <h3>${ __html(item.heading.value) }</h3>
                          <p>${ __html(item.text.value) }</p>
                          ${this.data.currencyPosition.value == 2 ?
                            `<h1>${ __html(item.price.value) }<sup><b>${ __html(this.data.currency.value) }</b></sup><sub><b>${ __html(rates[item.rate.value]) }</b></sub></h1>`
                            :
                            `<h1><sup><b>${ __html(this.data.currency.value) }</b></sup>${ __html(item.price.value) }<sub><b>${ __html(rates[item.rate.value]) }</b></sub></h1>`
                          }
                          <ul>
                            ${features.map(feature => {
                              return `
                                <li>${ __html(feature) }</li>
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

window.kMp5sM = kMp5sM;