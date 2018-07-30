# 🍦 Compo (draft)

Simplest vanilla JavaScript nano library for create components-based UI.

## ✋🏾 What?

In 2018+ you don't need an framework for create UI for web apps.

This **experiment** shows:

- how use modern vanilla JS in UI creating (instead of React, Vue, Backbone, JSX, VDOM...);
- how remain simple and lightweight at the same time.

*Compo* uses native Web API's and tagged template literals for define templates.

## 💪🏾 How?

Use it almost like stateless React-components.

```javascript
import compo, { render } from 'compo';

function Heading ({ text, onClick }) {
    return compo`<h1 class="heading" click=${onClick}>${text}</h1>`;
}

render(Heading('Hello, world'), document.body);
```

*Compo* relies on values types, you passed in template:

- **Strings** and **Numbers** will be passed as normal text;
- **Functions** in attributes will be added by `addEventListener`;
- **Booleans** will add or remove attribute depending on the it truth;

#### Pass listeners

For listeners write attributes names like event names:

```javascript
const button = compo`<button click=${() => alert('clicked!')}}>Click me!</button>`;
```

#### Pass arrays

Arrays in templates must contains only compo-elements:

```javascript
const beatles = ['John Lennon', 'Ringo Starr', 'Paul McCartney', 'George Harrison'];

const list = compo`
    <ul>
        ${beatles.map(name => compo`<li>${name}</li>`)}
    </ul>
`;
```

#### Nested templates
```javascript
function Button ({ text }) {
    return compo`<button>${text}</button>`;
}

function Form ({ onSubmit }) {
    return compo`
        <form submit=${onSubmit}
            <input type="email" placeholder="Your email" />
            ${Button({ text: 'Subscribe' })}
        </form>
    `;
}
```

#### Features

*Compo* caches elements for reusable templates.
Because parse HTML from string slower than cloning nodes.

## 🤘🏾 Next?

Ideas:

- integration with **Web Components** (for nesting templates beautiful);
- classes with patching DOM (for creating ractive UI with MVVM data bindings).
