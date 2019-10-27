import { html, define } from 'packmar';

export default define('todo-field', function Field ({ value, placeholder, onInput }) {
  return html`
    <textarea
      rows="5"
      class="main-field display--block width--100percent"
      placeholder=${placeholder}
      oninput=${onInput}
    >${value}</textarea>
  `;
});
