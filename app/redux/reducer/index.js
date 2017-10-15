import { combineReducers } from 'redux'
import user from './user.js'
import tabList from './tabList.js'
import menuList from './menuList.js'

export default combineReducers({
	user,
	menuList,
	tabList,
})