// var webpack = require('webpack');
// var path = require('path');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
	const isProduction = env === 'production';
	const CSSExtract = new ExtractTextPlugin('styles.css');

	return {
		entry: [
			//'webpack-dev-server/client?http://127.0.0.1:8080/',
			//'webpack/hot/only-dev-server',
			'./src/app.js'
		],
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js?$/,
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			}]
		},
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true
		},
		plugins: [
			CSSExtract
			// new webpack.HotModuleReplacementPlugin(),
			// new webpack.NoEmitOnErrorsPlugin()
		]
	}
};

// module.exports = {
// 	devtool: 'inline-source-map',
	
// 	output: {
// 		path: path.join(__dirname, 'public'),
// 		filename: 'bundle.js'
// 	},
// 	resolve: {
// 		modules: ['node_modules', 'src'],
// 		extensions: ['*', '.js']
// 	},
// 	module: {
// 		loaders: [
// 			{
// 				test: /\.jsx?$/,
// 				exclude: /node_modules/,
// 				loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=env']
// 			}
// 		]
// 	},
// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),
// 		new webpack.NoEmitOnErrorsPlugin()
// 	]
// };