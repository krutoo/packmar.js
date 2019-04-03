# 🍦 Packmar.js

**Pack** your **mar**kup.

Simplest vanilla JavaScript nano library for create components-based UI.

## 👋🏾 What?

In 2018+ you don't need an giant framework for create UI for web apps.

This **experiment** shows:

- how use modern vanilla JS in UI creating (instead of React, Vue, Angular, Backbone, JSX etc.);
- how remain simple and lightweight at the same time.

*Packmar* uses native Web API's and tagged template literals for define templates.

## 🤙🏾 Use?
Install with npm:
```bash
npm install --save packmar
```

## 💪🏾 How?

Use it almost like stateless React-components.

```javascript
import { html, render } from 'packmar';

/**
 * Return virtual DOM element of heading.
 * @param {string} options.text Heading text.
 * @param {Function} options.onClick Click callback.
 * @return {VirtualNode} Virtual element.
 */
function Heading ({ text, onClick }) {
    return html`<h1 class="heading" onclick=${onClick}>${text}</h1>`;
}

render(Heading({ text: 'Hello, world' }), document.body);
```

*Packmar* relies on values types, you passed in template:

- **Strings** and **Numbers** will be passed as normal children/attributes;
- **Functions** in attributes will be added as listeners;
- **Booleans** will add or remove attribute depending on the it truth;

#### Pass listeners

For listeners write attributes names like:

```javascript
const button = html`<button onclick=${() => alert('clicked!')}}>Click me!</button>`;
```

#### Pass arrays

lists can be represented as:

```javascript
const beatles = ['John Lennon', 'Ringo Starr', 'Paul McCartney', 'George Harrison'];

const list = html`
    <ul>
        ${beatles.map(name => html`<li>${name}</li>`)}
    </ul>
`;
```

#### Nested components
```javascript
function Form ({ onSubmit }) {
    return html`
        <form onsubmit=${onSubmit}>
            <input type="email" placeholder="Your email" />
            ${Button({ text: 'Subscribe' })}
        </form>
    `;
}

function Button ({ text }) {
    return html`<button>${text}</button>`;
}
```

#### Features

*Packmar* caches elements for reusable templates. Because parse HTML from string slower than cloning nodes.
*Packmar* prevents simple XSS vulnerabilities. HTML nodes creates without values from expressions.

## 📦 Dependencies?

None.

## 🤘🏾 Next?

Ideas:

- ~~integration with **Web Components** (for nesting templates beautiful)~~;
- ~~classes with patching DOM (for creating reactive UI with MVVM data bindings)~~.

## License

MIT
