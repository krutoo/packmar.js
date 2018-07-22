import Compo, { html } from 'compo';

function renderField ({ type = 'text', value, id, labelText, input }) {
	return html`
		<div class="field-wrapper">
			<label for="${id}">${labelText}</label>
			<input type="${type}" id="${id}" value="${value}" input="${input}">
		</div>
	`;
}

class LoginForm extends Compo {
	render ({ title }) {
		const username = this.data.username || '';
		return html`
			<form class="login-form">
				<h2 class="heading">${title}</h2>
				${username.length > 16
					? html`<div class="warning"><b>Warning: </b>Username is too long</div>`
					: ''
				}
				${renderField({
					id: 'login-username',
					value: username,
					labelText: 'username',
					input: ({ target }) => this.update({ username: target.value }),
				})}
				${renderField({
					id: 'login-password',
					type: 'password',
					value: this.data.password,
					labelText: 'password',
					input: ({ target }) => this.update({ password: target.value }),
				})}
				<button
					type="button"
					click="${() => this.update({ username: '', password: '' })}"
					class="field-wrapper"
					disabled="${Boolean(username.length > 16)}"
				>Submit</button>
			</form>
		`;
	}
}

const loginForm = new LoginForm({ title: 'Login' });
document.body.append(loginForm.compile());
