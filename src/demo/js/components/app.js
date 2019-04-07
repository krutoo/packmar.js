import { html, Component, define } from 'packmar';
import Field from './field.js';
import Note from './note.js';
import Filters from './filters.js';

const FILTERS = Object.freeze([
	{ name: 'All', check: () => true },
	{ name: 'Active', check: note => !note.checked },
	{ name: 'Completed', check: note => note.checked },
]);

const DEFAULT_NOTES = [
	{ id: 1, text: 'Check the packmar.js demo', checked: true },
	{ id: 2, text: 'Create new note', checked: false },
	{ id: 3, text: 'mark any note as done ', checked: false },
	{ id: 4, text: 'Delete any note', checked: false },
];

export default define('todo-list', class TodoList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			notes: Array.from(props.notes || DEFAULT_NOTES),
			title: props.title || '',
			currentText: '',
			currentFilterName: FILTERS[0].name,
		};
		this.addNote = this.addNote.bind(this);
		this.typeNote = this.typeNote.bind(this);
		this.checkNote = this.checkNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.selectFilter = this.selectFilter.bind(this);
	}

	typeNote ({ target }) {
		this.setState({ currentText: target.value });
	}

	checkNote (noteId) {
		const targetNote = this.state.notes.find(note => note.id === noteId);
		targetNote.checked = !targetNote.checked;
		this.setState({});
	}

	removeNote (noteId) {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId),
		});
		if (this.state.notes.length === 0) {
			this.selectFilter(FILTERS[0].name);
		}
	}

	selectFilter (filterName) {
		this.setState({ currentFilterName: filterName });
	}

	addNote () {
		const { notes = [], currentText = '' } = this.state;
		const hasText = currentText.replace(/\s*/g, '').length;
		if (hasText) {
			const newNote = {
				id: Date.now(),
				checked: false,
				text: currentText.trim(),
			};
			this.setState({
				notes: [newNote, ...notes],
				currentText: '',
				currentFilterName: FILTERS[0].name,
			});
		}
	}

	render () {
		const {
			addNote,
			typeNote,
			checkNote,
			removeNote,
			selectFilter,
		} = this;
		const {
			title = '',
			notes = [],
			currentText = '',
			currentFilterName,
		} = this.state;
		const defaultCheck = () => true;
		const currentFilter = FILTERS.find(filter => filter.name === currentFilterName) || {};
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
					${notes.length > 0 && Filters({
						filters: FILTERS,
						selectFilter,
						currentFilter,
					})}
					<div class="notes-list">
						${notes.filter(needShowNote).map(note => Note({
							noteText: note.text,
							isCompleted: note.checked,
							onCheck: () => checkNote(note.id),
							onRemove: () => removeNote(note.id),
						}))}
					</div>
				</div>
			</div>
		`;
	}
});
