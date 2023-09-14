// dependencies
import { __html, attr, onClick } from '@kenzap/k-cloud';

class kH5Qx2{

    // init class
    constructor(data){
        
      // cache data
        this.data = data;
    
      // render section
        this.render();

      // listeners
        this.listeners();
    }

    // render class html
    render = () => {
        // divide items array for equal distribution of items in two columns
        const array1 = this.data.items.slice(0,Math.ceil(this.data.items.length/2))
        const array2 = this.data.items.slice(Math.ceil(this.data.items.length/2))

        document.querySelector('#content').insertAdjacentHTML('beforeend', 
        `
        <section id="${ attr(this.data.id) }" 
            class="kH5Qx2 ${ this.data.c.classes ? attr(this.data.c.classes) : '' }"
            style="
            ${ attr(this.data.c.section) }">
            <div class="container" style="${ attr(this.data.c.container) }">
            
            ${this.data.col.value == 2 ?  //if indicated in data that the number of columns is 2
                `
                <div class="kH5Qx2-row">
                    <div class="col-6">
                        <ul class="accordion">
                        ${
                            array1.map(item => {
                            return `
                                <li>
                                    <a class="toggle" href="#"><span class="plus"></span><b> ${ __html(item.heading.value) } </b></a>
                                    <div class="inner">
                                    <p>${ __html(item.text.value) }</p>
                                    </div>
                                </li>
                                    `
                                }).join('')
                        }
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="accordion">
                        ${
                            array2.map(item => {
                            return `
                                <li>
                                    <a class="toggle" href="#"><span class="plus"></span><b> ${ __html(item.heading.value) } </b></a>
                                    <div class="inner hide">
                                    <p>${ __html(item.text.value) }</p>
                                    </div>
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
                <ul class="accordion">
                    ${
                    this.data.items.map(item => {
                        return `
                            <li>
                                <a class="toggle" href="#"><span class="plus"></span><b> ${ __html(item.heading.value) } </b></a>
                                <div class="inner">
                                <p>${ __html(item.text.value) }</p>
                                </div>
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

    listeners = () => {

        onClick('.kH5Qx2 .toggle', e => {

            e.preventDefault();

            let el= e.currentTarget;
            
            if(el.classList.contains('active')){
    
                el.classList.remove('active')
                el.nextElementSibling.classList.remove('show')
            } else {
    
                let parent = el.parentElement.parentElement
                let inner = parent.querySelectorAll('li .inner');
                inner.forEach(innerElement => {
                    innerElement.classList.remove('show')
                })
    
                el.nextElementSibling.classList.add('show')
    
                let tog = parent.querySelectorAll('li .toggle');
    
                tog.forEach(innerElement => {
                    innerElement.classList.remove('active')
                })
                el.classList.add('active')
            }
        });
    }
}

window.kH5Qx2 = kH5Qx2;