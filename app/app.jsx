import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory,bowserHistory } from 'react-router'
import configureStore from './redux/store/configureStore.js'
import RouteMap from './router/routeMap'

import './static/css/common.css'

//创建redux 的store对象
const store = configureStore()

ReactDom.render(
	<Provider store={store}>
    	<RouteMap history={hashHistory}/>
    </Provider>,
	document.getElementById("app")
)
