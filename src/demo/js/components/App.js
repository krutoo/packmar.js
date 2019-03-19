import { html } from 'packmar';
import Field from './Field.js';
import Note from './Note.js';
import Footer from './Footer.js';
import Filters from './Filters.js';

export default function App (options) {
	const {
		title,
		currentText,
		currentFilterName,
		notes,
		filters,
		typeNote,
		addNote,
		checkNote,
		removeNote,
		selectFilter,
	} = options;
	const defaultCheck = () => true;
	const currentFilter = filters.find(filter => filter.name === currentFilterName) || {};
	const needShowNote = currentFilter.check || defaultCheck;
	return html`
		<div class="app-wrapper display--flex width--100percent">
			<div class="main-content">
				<h1 class="main-title">${title}</h1>
				${Field({
					placeholder: 'Just start typing...',
					value: currentText,
					onInput: typeNote,
				})}
				<button class="width--100percent create-note-button" onclick=${addNote}>To Do</button>
				${notes.length
					? Filters({
						filters,
						selectFilter,
						currentFilter,
					})
					: ''
				}
				<div class="notes-list">
					${notes.filter(needShowNote).map(note => Note({
						noteText: note.text,
						isCompleted: note.checked,
						onCheck: () => checkNote(note.id),
						onRemove: () => removeNote(note.id),
					}))}
				</div>
			</div>
			${Footer()}
		</div>
	`;
}
