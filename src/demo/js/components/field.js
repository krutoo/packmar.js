import { html } from 'packmar';

export default function Field ({ value, placeholder, onInput }) {
	return html`
		<textarea
			rows="5"
			class="main-field display--block width--100percent"
			placeholder=${placeholder}
			oninput=${onInput}
		>${value}</textarea>
	`;
}
