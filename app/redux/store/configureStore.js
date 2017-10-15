import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducer'
import thunk from 'redux-thunk'//异步
import promiseMiddleware from 'redux-promise'//接受promise对象(fetch请求)作为参数
import logger from 'redux-logger'//console.log日志

export default function configureStore(initialState){
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(promiseMiddleware, thunk, logger),
		//触发redux-devtolls,可在已安装该插件的chrom下调试
		//window.devToolsExtension ? window.devToolsExtension() : undefined
	)
	return store
}