const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);//根路径
const BUILD_PATH = path.resolve(ROOT_PATH,'build');//打包路径
const APP_PATH = path.resolve(ROOT_PATH,'app');//app路径

const HtmlwebpackPlugin = require('html-webpack-plugin');//生成html模板
const OpenBrowserPlugin = require('open-browser-webpack-plugin');//webpack-dev-server启动后，自动打开浏览器

//https://ant.design/docs/react/introduce-cn
module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'app.jsx')
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].bundle.js',
	//	chunkFilename: '[name].[chunkhash:8].min.js',
	},
	//dev source map
	devtool:'cheap-module-eval-source-map',
	resolve: {
		extensions: ['','.js','.jsx']
	},
	//dev server
	devServer: {
		proxy: {
			//由koa提供的以'/api'开头的http请求的mock数据，都会被代理到localhost:3000上
			//koa 代码在 ./mock 目录中, 启动 npm run mock (node ./mock/server.js)
			'/api': {
				target: 'http://localhost:3000',
				secure: false
			}
		},
		//host:'192.168.1.86',//绑定电脑ip，可用于其他设备访问（手机/其他电脑）调试
		port: 9090,//设置端口
		colors: true,//终端输出结果为彩色
		inline: true,//实时更新
		hot: true,//使用热加载插件 HotModuleReplacementPlugin
		//contentBase:'/',
		contentBase:APP_PATH,//本地服务器所加载的页面所在的目录,即app为根目录
		historyApiFallback: true//不调转
	},
	module: {
		loaders : [
			{
				test:/\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			},
			{
				test:/\.(js|jsx)$/,
				//exclude: /node_modules/,//这个要注释掉，否则对安装在node_modules的antd就不生效了
				loader: 'babel-loader',
                // query: {
                //     presets: ['es2015', 'react'],
                //     plugins: [                                             
                //         ["import", {libraryName: "antd", style: 'css'}]   
                //     ]                                                   
                // }
			},
			{
				test:/\.(css|less)$/,
			//	exclude: /node_modules/,
				loader: 'style-loader!css-loader!postcss'
			},
			{
				test:/\.(png|gif|jpg|jpeg|bmp)$/i,
				loader: 'url-loader'
			//	exclude: /node_modules/,
				//loader: 'url-loader?limit=5000'
			},//限制大小5kb
			{
				test:/\.(woff|woff2|svg|ttf|eot)$/i,
			//	exclude: /node_modules/,
				loader: 'url-loader?limit=5000'
			},//限制大小5kb
		]
	},
	eslint: {
		configFile: '.eslintrc'//rules for eslint
	},
	postcss: [
		require('autoprefixer')//调用autoprefixer插件
	],
	plugins: [
		//html模板插件
		new HtmlwebpackPlugin({
		//	title : '应急钱包',
			// filename:'../index.html',//生成的html存放路径,相对于output中的pubilcPath
			template: path.resolve(APP_PATH,'index.tmpl.html'),//有模板文件，则引入
		}),
		//热加载插件
		new webpack.HotModuleReplacementPlugin(),
		//打开浏览器
		new OpenBrowserPlugin({
			url : 'http://localhost:9090'
		}),
		//可在其他模块中的业务js中，使用__DEV__判断是否是Dev模式还是production模式（如：dev模式下，提示错误、测试报告等，production模式下则不提示）
		//这里的NODE_ENV 需要在package.json中(启动的时候)设置
		 new webpack.DefinePlugin({
		 	//需安装npm install cross-env --dev-save
		 	//package.json中设置 cross-env NODE_ENV=dev
          //__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
           __DEV__ : true
        }),
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery: 'jquery',
			'window.jQuery':'jquery'
		})
	]
}