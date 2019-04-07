import { html, define } from 'packmar';

export default define('todo-filters', function Filters ({ filters, selectFilter, currentFilter }) {
	return html`
		<div class="filters display--flex">
			${filters.map(filter => {
				const isActive = filter.name === currentFilter.name;
				return html`
					<button
						class=${`filter-button ${isActive ? 'active' : ''}`}
						onclick=${() => selectFilter(filter.name)}
					>
						${filter.name}
					</button>
				`;
			})}
		</div>
	`;
});
