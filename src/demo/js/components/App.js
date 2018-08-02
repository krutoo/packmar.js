import { pack } from 'packmar';
import Field from './Field';
import Note from './Note';
import Footer from './Footer';
import Filters from './Filters';

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
	return pack`
		<div class="app-wrapper display_flex width_100percent">
			<div class="main-content">
				<h1 class="main-title">${title}</h1>
				${Field({
					placeholder: 'Just start typing...',
					value: currentText,
					onInput: typeNote,
				})}
				<button class="width_100percent" click=${addNote}>To Do</button>
				${Boolean(notes.length)
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
