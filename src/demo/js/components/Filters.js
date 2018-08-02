import { pack } from 'packmar';

export default function Filters ({ filters, selectFilter, currentFilter }) {
	return pack`
		<div class="filters display_flex">
			${filters.map(filter => {
				const isActive = filter.name === currentFilter.name;
				return pack`
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
