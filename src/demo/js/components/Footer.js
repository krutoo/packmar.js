import compo from 'compo';

export default function Footer () {
	return compo`
		<footer class="main-footer">
			This SPA is <b>compo</b> library work demo.
			Check it on <a href="https://github.com/krutoo/compo" target="_blank">GitHub</a>.
		</footer>
	`;
}
