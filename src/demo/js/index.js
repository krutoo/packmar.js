import { render } from 'compo';
import App from './components/App';

let state = {
	currentFilterName: 'All',
	currentText: '',
	notes: [],
};

const FILTERS = [
	{ name: 'All', checkNote: note => true },
	{ name: 'Active', checkNote: note => !note.checked },
	{ name: 'Completed', checkNote: note => note.checked },
];

window.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('beforeunload', saveToLocalStorage);

function initialize () {
	const initialState = JSON.parse(localStorage.getItem('state'));
	state = { ...state, ...initialState };
	renderApp();
	window.addEventListener('keydown', windowKeyDown);
}

function windowKeyDown ({ key }) {
	const isPrintable = key.length === 1;
	if (isPrintable) {
		const field = document.querySelector('.main-field');
		if (field) {
			field.focus();
		}
	}
}

function saveToLocalStorage () {
	localStorage.setItem('state', JSON.stringify(state));
}

function typeNote ({ target }) {
	state.currentText = target.value;
}

function addNote () {
	const hasText = state.currentText.replace(/\s*/g, '').length;
	if (hasText) {
		state.notes.unshift({
			id: Math.random().toString(16).slice(2),
			text: state.currentText,
			checked: false,
		});
		state.currentText = '';
		renderApp();
	} else {
		document.querySelector('.main-field').focus();
	}
}

function checkNote (noteId) {
	const targetNote = state.notes.find(note => note.id === noteId);
	targetNote.checked = !targetNote.checked;
	renderApp();
}

function removeNote (noteId) {
	state.notes = state.notes.filter(note => note.id !== noteId);
	if (state.notes.length === 0) {
		selectFilter(FILTERS[0].name);
	} else {
		renderApp();
	}
}

function selectFilter (filterName) {
	state.currentFilterName = filterName;
	renderApp();
}

function renderApp () {
	const app = App({
		title: '📝 To Do App',
		currentText: state.currentText,
		currentFilterName: state.currentFilterName,
		notes: state.notes,
		filters: FILTERS,
		typeNote,
		addNote,
		checkNote,
		removeNote,
		selectFilter,
	});
	render(app, document.body);
}
