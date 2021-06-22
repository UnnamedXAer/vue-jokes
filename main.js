window.openInProd = window.location.protocol.includes('https');
var url = window.openInProd ? './vue.min.js' : './vue.js';

import(url)
	.then((res) => {
		return import('./components.js');
	})
	.catch((err) => {
		var errEl = document.createElement('article');
		errEl.classList.add('alert', 'alert-danger');
		errEl.style.margin = '4rem 1rem 1rem 1rem';
		errEl.innerText = '😲 Sorry, could not fetch some source files, please try again later.'
		document.querySelector('#root').appendChild(errEl);
	});
