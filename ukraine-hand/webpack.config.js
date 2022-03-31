/* eslint-disable no-undef */
const CopyPlugin = require('copy-webpack-plugin')

const config = {
	entry: {
		app: './src/index.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/index.html' },
				{ from: 'src/static' }
			],
		})
	]
}

module.exports = config