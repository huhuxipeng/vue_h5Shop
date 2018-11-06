// 'use strict'
const path = require('path')
const utils = require('./utils')
var webpack = require("webpack")
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}


//let time=new Date().getTime();
module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',//+'?time='+time,
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'src': resolve('src'),
			'common': resolve('src/common'),
			'components': resolve('src/components'),
			'api': resolve('src/api'),
			'base': resolve('src/base'),
			'jquery':'jquery'
		}
	},
	module: {

		// loaders: [
		//   {
		//     test: /\.vue$/,
		//     loaders: ['strip-loader?strip[]=console.log,strip[]=console.warn','vue']
		//   },
		//   {
		//     test: /\.js$/,
		//     exclude: /node_modules/,
		//     loaders:['strip-loader?strip[]=console.log,strip[]=console.warn','babel']
		//   },
		// ],
		rules: [{
				test: /\.vue$/,
				// loader: 'vue-loader?strip[]=console.log,strip[]=console.warn',
				loader: 'vue-loader',
				// options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// exclude: /node_modules/
				// loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				// loader: 'url-loader?strip[]=console.log,strip[]=console.warn',
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				// loader: 'url-loader?strip[]=console.log,strip[]=console.warn',
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				// loader: 'url-loader?strip[]=console.log,strip[]=console.warn',
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		],

	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	],
}
