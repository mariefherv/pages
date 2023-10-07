// dependencies
import { __html, html, __attr, attr } from '@kenzap/k-cloud';
import Glide from '@glidejs/glide'

class kE4WlE{

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
        <section id="${ attr(this.data.id) } " 
        class="kE4WlE ${ this.data.c.classes ? attr(this.data.c.classes) : '' }"
        style="${ attr(this.data.c.section) }">
            <div class="container" style="${ attr(this.data.c.container) }"> 
              <ul class="categories">
                ${
                  this.data.items.map(item => {
                    return `
                      <li>
                          <h2> ${ __html(item.heading.value) } </h2>
                      </li>
                    `
                    }).join('')
                  }
              </ul>
              <div class="glide" style="--theme-color: ${this.data.themeColor.value}">
                <div class="glide__track" data-glide-el="track">
                  <ul class="glide__slides">
                  ${
                  this.data.items.map(item => {
                    return `
                      <li class="glide__slide">
                          <div class="img-area">
                            <img src="${item.img.value}" alt="">
                          </div>
                          <div class="text-area">
                            <h2> ${ __html(item.heading.value) } </h2>
                            <p> ${ __html(item.text.value) } </p>
                          </div>
                      </li>
                    `
                    }).join('')
                  }
                  </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                  <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><</button>
                  <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
                </div>
              </div>
            </div>
        </section>
        `
      );

    this.listeners()
    }

    listeners = () => {
      new Glide('.glide').mount();


    }
}

window.kE4WlE = kE4WlE;