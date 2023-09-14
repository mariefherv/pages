// dependencies
import { __html, html, __attr, attr } from '@kenzap/k-cloud';

class kMBh0N{

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
		<section id="${ attr(this.data.id) }" 
		class="kMBh0N ${ this.data.c.classes ? attr(this.data.c.classes) : '' }" 
		style="${ attr(this.data.c.section) }">
			<div class="container" style="${ attr(this.data.c.container) }">
				<ul class="services">
					${
					this.data.items.map(item => {
						return `
							<li>
								<a href="${ html(item.link.value) }">
									<span class="ico-holder">
										<img src=${item.icon.value} alt="" style="width:${item.iconSize.value}px"/>
									</span>
									<strong class='h3'> ${ __html(item.heading.value) } </strong>
									<p> ${ __html(item.text.value) } </p>
								</a>
							</li>
						`
						}).join('')
					}
				</ul>
			</div>
		</section>
		`
	);
	}
}

window.kMBh0N = kMBh0N;