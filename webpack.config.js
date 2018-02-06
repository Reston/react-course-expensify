// var webpack = require('webpack');
// var path = require('path');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NOVE_ENV = process.env.NOVE_ENV || 'development';

if (process.env.NOVE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test'});
} else if (process.env.NOVE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development'});
}

// process.env.NOVE_ENV

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
			path: path.join(__dirname, 'public', 'dist'),
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
			historyApiFallback: true,
			publicPath: '/dist/'
		},
		plugins: [
			CSSExtract,
			new webpack.DefinePlugin({
				'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
				'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGEING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGEING_SENDER_ID)
			})
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