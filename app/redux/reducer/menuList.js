import { handleActions } from 'redux-actions'
import SessionStore from '../../util/sessionStore.js'
import {
	MENU_LIST,
	MENU_LIST_UPDATE,
	MENU_LIST_CHECKED
}from '../config/actionType.js'

const menuList = JSON.parse(SessionStore.getItem('menuList'))
const initialState = {
	currentIndex : menuList ? menuList.currentIndex : '0',
	items : menuList ? menuList.items : [
		{id : '0', icoName : 'home', title : '首页', key : '/'},
		{id : '1', icoName : 'download', title : '文档下载', key : 'download'},
		{id : '2', icoName : 'message', title : '短信日志', key : 'message'},
		{id : '3', icoName : 'setting', title : '设置', key : 'setting'}
	]
}

const menuResult = handleActions({
	MENU_LIST : function (state, action){
		const data = action.payload
		return {...state,data}
	},
	MENU_LIST_UPDATE : function (state, action){
		const data = action.payload
		const currentIndex = data.currentIndex ? data.currentIndex : state.currentIndex
		const items = data.items.length ? data.items : state.items
		SessionStore.setItem('menuList',JSON.stringify({currentIndex:currentIndex,items:items}))
		return {currentIndex:currentIndex,items:items}
	},
	MENU_LIST_CHECKED : function(state, action){
		const currentIndex = action.payload.currentIndex
		SessionStore.setItem('menuList',JSON.stringify({...state, currentIndex}))
		return {...state, currentIndex}

	}
}, initialState)

export default menuResult