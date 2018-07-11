import Compo from 'compo';

class Field extends Compo {
	template ({ type = 'text', value, id, labelText, oninput }) {
		return this.html`
			<div class="field-wrapper">
				<label for="${id}">${labelText}</label>
				<input type="${type}" id="${id}" value="${value}" oninput="${oninput}">
			</div>
		`;
	}
}

class LoginForm extends Compo {
	template ({ title }) {
		const username = this.data.username || '';
		return this.html`
			<form class="login-form">
				<h2 class="heading">${title}</h2>
				${username.length > 16
					? '<div class="warning"><b>Warning: </b>Username is too long</div>'
					: ''
				}
				${new Field({
					id: 'login-username',
					value: username,
					labelText: 'username',
					oninput: ({ target }) => this.update({ username: target.value }),
				})}
				${new Field({
					id: 'login-password',
					type: 'password',
					value: this.data.password,
					labelText: 'password',
					oninput: ({ target }) => this.update({ password: target.value }),
				})}
				<button
					type="button"
					onclick="${() => this.update({ username: '', password: '' })}"
					class="field-wrapper"
					disabled="${Boolean(username.length > 16)}"
				>Submit</button>
			</form>
		`;
	}
}

const loginForm = new LoginForm({ title: 'Login' });
document.body.append(loginForm.render());
