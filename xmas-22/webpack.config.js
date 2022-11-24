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
			{
				test: /\.(json)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				type: 'asset/source',
				generator: {
					filename: 'assets/images/[hash][ext]'
				}
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