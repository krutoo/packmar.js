import { html } from 'packmar';

export default function Field ({ value, placeholder, onInput }) {
	return html`
		<textarea
			rows="5"
			class="main-field display_block width_100percent"
			placeholder=${placeholder}
			input=${onInput}
		>${value}</textarea>
	`;
}
