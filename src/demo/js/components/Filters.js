import { html } from 'packmar';

export default function Filters ({ filters, selectFilter, currentFilter }) {
	return html`
		<div class="filters display_flex">
			${filters.map(filter => {
				const isActive = filter.name === currentFilter.name;
				return html`
					<button
						class=${`filter-button ${isActive ? 'active' : ''}`}
						click=${() => selectFilter(filter.name)}
					>
						${filter.name}
					</button>
				`;
			})}
		</div>
	`;
}
