import { html } from 'packmar';

export default function Note ({ noteText, isCompleted, onRemove, onCheck }) {
	const textClasses = `text ${isCompleted ? 'text-decoration_line-through' : ''}`;
	const formattedText = html`
		<div class="formatted">
			${noteText.split('\n').map(part => html`<span>${part}<br /></span>`)}
		</div>
	`;
	return html`
		<div class="note overflow_hidden">
			<button class="button check-button overflow_hidden" click="${onCheck}">
				${isCompleted ? '✔️' : ''}
			</button>
			<div class=${textClasses}>
				${formattedText}
			</div>
			<button class="button remove-button overflow_hidden" click=${onRemove}>
				❌
			</button>
		</div>
	`;
}
