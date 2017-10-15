import React from 'react'
import { Route, Router, IndexRoute, hashHistory } from 'react-router'
import LocalStore from '../util/localStore.js'

const App = (location, cb) =>{
	require.ensure([], require =>{
		cb(null, require('../pages').default)
	}, 'App')
}

const Home = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/home').default)
	}, 'Home')
}
const Msg = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/msg').default)
	}, 'Msg')
}
const Other = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/other').default)
	}, 'Other')
}
const NotFound = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/404').default)
	}, 'NotFound')
}
const Download = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/download').default)
	}, 'Download')
}
const Login = (location, cb) =>{
	require.ensure([], require=>{
		cb(null, require('../pages/login').default)
	}, 'Login')
}
/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const userInfo = JSON.parse(LocalStore.getItem('userInfo'))
  if (!userInfo) {
    hashHistory.push('/login')
  }
}

class RouteMap extends React.Component{
	render(){
		return (
			<Router history ={this.props.history}>
				<Route path='/' getComponent={App} onEnter={isLogin}>
					<IndexRoute getComponent={Home} />
					<Route path='message' getComponent={Msg} />
					<Route path='setting' getComponent={Other} />
					<Route path='download' getComponent={Download} />
				</Route>
				<Route path='/login' getComponent={Login}></Route>
				<Route path='*' getComponent={NotFound}></Route>
			</Router>
		)
	}
}

export default RouteMap