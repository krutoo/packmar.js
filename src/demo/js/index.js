import { compo, render } from 'compo';

function Field ({ type = 'text', value, id, labelText, onInput }) {
	return compo`
		<div class="field-wrapper">
			<label for="${id}">${labelText}</label>
			<input type="${type}" id="${id}" value="${value}" oninput="${onInput}" />
		</div>
	`;
}

const field = Field({
	id: 'name-field',
	value: '',
	labelText: 'Your name',
	onInput: ({ target }) => console.log(target.value),
});

render(field, document.body);
