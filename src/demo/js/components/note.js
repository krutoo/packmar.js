import { html, define } from 'packmar';

export default define('todo-note', function Note ({ noteText, isCompleted, onRemove, onCheck }) {
  const textClasses = `text ${isCompleted ? 'text-decoration--line-through' : ''}`;
  const formattedText = html`
    <div class="formatted">
      ${noteText.split('\n').map(part => html`<span>${part}<br /></span>`)}
    </div>
  `;
  return html`
    <div class="note overflow--hidden">
      <button class="button check-button overflow--hidden" onclick="${onCheck}">
        ${isCompleted ? '✔️' : ''}
      </button>
      <div class=${textClasses}>
        ${formattedText}
      </div>
      <button class="button remove-button overflow--hidden" onclick=${onRemove}>
        ❌
      </button>
    </div>
  `;
});
