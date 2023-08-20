var webpack = require('webpack')
var config = require('./webpack.config.js')


config.mode = 'production'

config.optimization = {
	minimize: true,
}

config.plugins.push(new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production'),
	},
}))

module.exports = config
