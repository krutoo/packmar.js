import { compo, render } from 'compo';

const field = Field({
	id: 'name-field',
	value: Greeting('John Doe'),
	labelText: 'Your name',
	onInput: ({ target }) => console.log(target.value),
});

const list = List([1,2,3,4,5,6,7,8,9,0]);

const greeting = Greeting('John Doe');

render(greeting, document.body);
render(list, document.body);
render(field, document.body);

function Greeting (name) {
	return compo`Hello, ${name}!`;
}

function Field ({ type = 'text', value, id, labelText, onInput }) {
	return compo`
		<div class="field-wrapper">
			<label for="${id}">${labelText}</label>
			<input type="${type}" id="${id}" value="${value}" input="${onInput}" />
		</div>
	`;
}

function List (items) {
	return compo`
		<ul>
			${items.map(item => compo`<li>${item}</li>`)}
		</ul>
	`;
}
