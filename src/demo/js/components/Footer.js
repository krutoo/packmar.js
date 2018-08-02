import { pack } from 'packmar';

export default function Footer () {
	return pack`
		<footer class="main-footer">
			This SPA is <b>packmar</b> library work demo.
			Check it on <a href="https://github.com/krutoo/compo" target="_blank">GitHub</a>.
		</footer>
	`;
}
