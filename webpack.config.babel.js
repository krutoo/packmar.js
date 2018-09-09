import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const getConfiguration = (env, options) => {
	const isProduction = Boolean(options.mode === 'production');
	const configuration = {
		entry: {
			demo: [
				'./src/demo/js/index.js',
				'./src/demo/scss/index.scss',
			],
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'js/[name].js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader',
					}),
				},
			],
		},
		resolve: {
			alias: {
				packmar: path.join(__dirname, '/src/library/js/index.js'),
			},
		},
		devtool: 'source-map',
		optimization: {
			minimize: isProduction,
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
				}),
			],
		},
		plugins: [
			new ExtractTextPlugin('css/[name].css', {
				allChunks: true,
			}),
		],
	};
	if (isProduction) {
		configuration.plugins.push(
			new OptimizeCssAssetsPlugin(),
		);
	}
	return configuration;
};

export default getConfiguration;
