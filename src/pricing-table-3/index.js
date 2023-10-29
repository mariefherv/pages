// dependencies
import { __html, html, __attr, attr } from '@kenzap/k-cloud';

class kOoZtT{

    // init class
    constructor(data){
        
      // cache data
      this.data = data;
    
      // render section
      this.render();
    }

    // render class html
    render = () => {

      // divide items array for equal distribution of items in two columns
      const array1 = this.data.items.slice(0,Math.ceil(this.data.items.length/2))
      const array2 = this.data.items.slice(Math.ceil(this.data.items.length/2))

      // for currency symbols
      const currencyList = ['','&#36;','&#8364;','&#x20B1;','&#xa3;','&#xFFE5;','&#20803;']
      const currency = currencyList[this.data.currency.value]

      document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" class="kOoZtT ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" style="${ attr(this.data.c.section) }">
            <div class="container" style="${ attr(this.data.c.container) }">
              ${ this.data.header.value }
              ${this.data.col.value == 2 ?  //if indicated in data that the number of columns is 2
                `
                <div class="row" style="${ "--"+attr(this.data.c.section) }; --text-color: ${this.data.textColor.value}">
                    <div class="col-6">
                        <ul>
                          ${
                            array1.map(item => {
                            return `
                                <li class="pricing-box">
                                  <h4>${ __html(item.title.value) }</h4>
                                  <p><span>${ __html(item.description.value) }</span><span>${this.data.currency.value !== 5 ? currency + __html(item.price.value) : __html(item.price.value) + currency}</span></p>
                                </li>
                                    `
                                }).join('')
                          }
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul>
                          ${
                            array2.map(item => {
                            return `
                                <li class="pricing-box">
                                  <h4>${ __html(item.title.value) }</h4>
                                  <p><span>${ __html(item.description.value) }</span><span>${this.data.currency.value !== 5 ? currency + __html(item.price.value) : __html(item.price.value) + currency}</span></p>
                                </li>
                                    `
                                }).join('')
                          }
                      </ul>
                    </div>
                </div>
                `
                :
                `
                <ul style="${"--"+attr(this.data.c.section)}; --text-color: ${this.data.textColor.value}">
                    ${
                    this.data.items.map(item => {
                        return `
                          <li class="pricing-box">
                            <h4>${ __html(item.title.value) }</h4>
                            <p><span>${ __html(item.description.value) }</span><span>${this.data.currency.value !== 5 ? currency + __html(item.price.value) : __html(item.price.value) + currency}</span></p>
                          </li>
                            `
                          }).join('')
                    }
                </ul>
                `
                }
            </div>
        </section>
        `
      );
    }
}

window.kOoZtT = kOoZtT;