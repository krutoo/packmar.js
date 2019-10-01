import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';

/**
 * Returns a webpack configuration of project.
 * @param {Object} env Environment.
 * @param {Object} options Options.
 * @return {Object} Configuration.
 */
export default function getConfiguration (env, options = {}) {
  const isProduction = Boolean(options.mode === 'production');
  const configuration = {
    entry: {
      packmar: './src/library/js/index.js',
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
    devtool: isProduction ? false : 'eval-source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: !isProduction,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          packmar: {
            test: /src\/library/,
            name: 'packmar',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new ExtractTextPlugin('css/[name].css', {
        allChunks: true,
      }),
      new HTMLPlugin({
        template: './src/demo/index.html',
        minify: isProduction,
        filename: 'todo.html',
      }),
    ],
  };
  if (isProduction) {
    configuration.plugins.push(
      new OptimizeCssAssetsPlugin(),
    );
  }
  return configuration;
}
