const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);//根路径
const BUILD_PATH = path.resolve(ROOT_PATH,'build');//打包路径
const APP_PATH = path.resolve(ROOT_PATH,'app');//app路径

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;//js压缩
const HtmlwebpackPlugin = require('html-webpack-plugin');//生成html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩

module.exports = {
	entry: {
		app: path.resolve(APP_PATH,'app.jsx'),
		//将 第三方依赖 单独打包
	    vendor: [
	      'react', 
	      'react-dom', 
	      'react-redux', 
	      'react-router', 
	      'redux', 
	      'es6-promise', 
	      'whatwg-fetch', 
	      'immutable'
	    ]
	},
	output: {
		path: BUILD_PATH,
		publicPath:'/build/',//文件js、css打包后,路径相对于output中的path
		filename:'js/[name].[chunkhash:8].js',
		chunkFilename:'js/[name].[chunkhash:8].min.js'
	},
	//dev source map
	devtool:'cheap-module-eval-source-map',
	resolve: {
		extensions: ['','.js','.jsx']
	},
	module: {
		loaders : [
			{
				test:/\.json$/,
				//exclude: /node_modules/,
				loader: 'json-loader'
			},
			{
				test:/\.(js|jsx)$/,
			//	exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test:/\.css$/,
			//	exclude: /node_modules/,
				//loader: 'style-loader!css-loader!postcss'
				loader:ExtractTextPlugin.extract(["css-loader", "postcss-loader"])
			},
			{
				test:/\.less$/,
			//	exclude: /node_modules/,
				//loader: 'style-loader!css-loader!postcss'
				loader:ExtractTextPlugin.extract(["css-loader", "postcss-loader"])
			},
			 // url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。
			 // url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。
			 // 通过上面的介绍，我们可以看到，url-loader工作分两种情况：
			 // 1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
			 // 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
			 // 因此我们只需要安装url-loader即可
			{
				test:/\.(png|gif|jpg|jpeg|bmp)$/i,
			//	exclude: /node_modules/,
				loader: 'url-loader?limit=8192&name=img/[name].[ext]'
				//loader: 'url-loader?limit=8192&name=img/[name].[chunkhash:4].[ext]'//path variable
			},
			//这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求
			{
				test:/\.(woff|woff2|svg|ttf|eot)$/i,
			//	exclude: /node_modules/,
				loader: 'url-loader?limit=8192'
			},//限制大小8kb
		]
	},
	postcss: [
		require('autoprefixer')//调用autoprefixer插件
	],
	plugins: [
		//html模板插件
		new HtmlwebpackPlugin({
			//filename:'../index.html',//生成的html存放路径,相对于output中的pubilcPath
			template: path.resolve(APP_PATH,'index.tmpl.html'),//有模板文件，则引入
		}),

		// //webpack 内置的 banner-plugin
		// new webpack.BannerPlugin('copyRight by c-h-y'),

	    
		//可在其他模块中的业务js中，使用__DEV__判断是否是Dev模式还是production模式（如：dev模式下，提示错误、测试报告等，production模式下则不提示）
		// /这里的NODE_ENV 需要在package.json中(启动的时候)设置
		new webpack.DefinePlugin({
			// __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV) || 'false'),
			__DEV__: false
		}),
	     // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
         new webpack.optimize.OccurenceOrderPlugin(),
    	
    	//提供公共代码
    	new webpack.optimize.CommonsChunkPlugin({
    		name : 'vendor',//entry 中的 vendor
    		filename : 'js/[name].[chunkhash:8].js'
    	}),

		//css单独打包
		new ExtractTextPlugin("style/[name].[contenthash:6].css",{
			allChunks: true
		}),///css单独打包

		//css 压缩
		new OptimizeCssAssetsPlugin({}),

		//js 压缩
		new UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		//jqurey
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery: 'jquery',
			'window.jQuery':'jquery'
		})
	]
}