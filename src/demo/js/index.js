import { html, render } from 'packmar';
import './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
	render(
		html`<todo-list title='Todo App'></todo-list>`,
		document.getElementById('main-container'),
	);
});
