import { render, compo } from 'compo';

export default function Note ({ noteText, isCompleted, onRemove, onCheck }) {
	const textClasses = `text ${isCompleted ? 'text-decoration_line-through' : ''}`;
	const formattedText = compo`
		<div class="formatted">
			${noteText.split('\n').map(part => compo`<span>${part}<br /></span>`)}
		</div>
	`;
	// console.log(render(formattedText));
	return compo`
		<div class="note overflow_hidden">
			<button class="button check-button overflow_hidden" click="${onCheck}">
				${isCompleted ? '✔️' : ''}
			</button>
			<div class="${textClasses}">
				${formattedText}
			</div>
			<button class="button remove-button overflow_hidden" click="${onRemove}">
				❌
			</button>
		</div>
	`;
}
