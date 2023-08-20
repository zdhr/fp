const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	mode: 'development',
	entry: {
		'app': __dirname + '/src/index.tsx',
		'style': __dirname + '/src/styles/style.sass',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'app': __dirname + '/src/app',
			'ui': __dirname + '/src/ui',
			'utils': __dirname + '/src/utils',
		},
	},
	module: {
		rules: [{
			test: /\.s(a|c)ss$/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			}, {
				loader: 'css-loader',
				options: {
					url: false,
				}
			}, {
				loader: 'sass-loader',
				options: {
					sassOptions: {
						outputStyle: 'compressed',
					},
				},
			}],
		}, {
			test: /\.(j|t)sx?$/,
			include: __dirname + '/src',
			use: [{
				loader: 'ts-loader',
				options: {
					reportFiles: [
						'src/**/*.{ts,tsx}',
					],
				},
			}],
		}],
	},
	output: {
		path: __dirname + '/www',
		filename: '[name].js',
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['ts', 'tsx'],
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
};
