import { render } from 'compo';
import App from './components/App';

const FILTERS = [
	{ name: 'All', check: note => true },
	{ name: 'Active', check: note => !note.checked },
	{ name: 'Completed', check: note => note.checked },
];

const pressedKeys = {};

let state = {
	currentFilterName: FILTERS[0].name,
	currentText: '',
	notes: [],
};

window.addEventListener('DOMContentLoaded', initialize);

function initialize () {
	const initialState = JSON.parse(localStorage.getItem('state'));
	state = { ...state, ...initialState };
	renderApp();
	focusOnField();
	window.addEventListener('beforeunload', saveToLocalStorage);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
}

function onKeyDown ({ key }) {
	pressedKeys[key] = true;
	const isPrintable = key.length === 1;
	const isKeysCombination = Object.keys(pressedKeys).length > 1;
	if (isPrintable && !isKeysCombination) {
		focusOnField();
	}
}

function onKeyUp ({ key }) {
	delete pressedKeys[key];
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
			text: state.currentText.trim(),
			checked: false,
		});
		state.currentText = '';
		renderApp();
	} else {
		focusOnField();
	}
}

function focusOnField () {
	const field = document.querySelector('.main-field');
	if (field) {
		field.focus();
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
