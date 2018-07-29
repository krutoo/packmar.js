import compo from 'compo';

export default function Filters ({ filters, selectFilter, currentFilter }) {
	return compo`
		<div class="filters display_flex">
			${filters.map(filter => {
				const isActive = filter.name === currentFilter.name;
				return compo`
					<button
						class="${`filter-button ${isActive ? 'active' : ''}`}"
						click="${() => selectFilter(filter.name)}"
					>
						${filter.name}
					</button>
				`;
			})}
		</div>
	`;
}
