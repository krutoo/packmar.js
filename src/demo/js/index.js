import { html, render } from 'packmar';
import './components/app.js';

document.addEventListener('DOMContentLoaded', () => {
	render(
		html`<todo-list title='Todo App'></todo-list>`,
		document.getElementById('main-container'),
	);
});
