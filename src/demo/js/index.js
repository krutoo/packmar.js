import { render } from 'packmar';
import App from './components/App.js';

const FILTERS = Object.freeze([
	{ name: 'All', check: () => true },
	{ name: 'Active', check: note => !note.checked },
	{ name: 'Completed', check: note => note.checked },
]);

const DEFAULT_STATE = Object.freeze({
	currentFilterName: FILTERS[0].name,
	currentText: '',
	notes: [
		{ id: 1, text: 'Check the packmar.js demo', checked: true },
		{ id: 2, text: 'Create new note', checked: false },
		{ id: 3, text: 'mark any note as done ', checked: false },
		{ id: 4, text: 'Delete any note', checked: false },
	],
});

const pressedKeys = {};

let state;
let renderApp;

window.addEventListener('DOMContentLoaded', initialize);

function initialize () {
	const initialState = JSON.parse(localStorage.getItem('state'));
	const container = document.createElement('div');
	document.body.appendChild(container);
	state = { ...DEFAULT_STATE, ...initialState };
	renderApp = bind(App, container);
	window.addEventListener('beforeunload', saveToLocalStorage);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	renderApp(createProps(state));
	focusOnField();
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
	renderApp(createProps(state));
}

function addNote () {
	const hasText = state.currentText.replace(/\s*/g, '').length;
	if (hasText) {
		state.notes.unshift({
			id: Date.now(),
			text: state.currentText.trim(),
			checked: false,
		});
		state.currentText = '';
		renderApp(createProps(state));
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
	renderApp(createProps(state));
}

function removeNote (noteId) {
	state.notes = state.notes.filter(note => note.id !== noteId);
	if (state.notes.length === 0) {
		selectFilter(FILTERS[0].name);
	} else {
		renderApp(createProps(state));
	}
}

function selectFilter (filterName) {
	state.currentFilterName = filterName;
	renderApp(createProps(state));
}

function createProps (state = {}) {
	return {
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
	};
}

function bind (creator, container) {
	let component;
	return (...args) => {
		const oldComponent = component;
		component = creator(...args);
		render(container, component, oldComponent);
	};
}
