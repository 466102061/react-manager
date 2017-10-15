import { handleActions } from 'redux-actions'
import SessionStore from '../../util/sessionStore.js'
import {
	TAB_LIST,
	UPDATE_TAB_LIST,
	DELETE_TAB_LIST_ITEM,
	UPDATE_TAB_LIST_CHECKED
}from '../config/actionType.js'

const tabList = JSON.parse(SessionStore.getItem('tabList'))
const initialState = {
	list : tabList ? tabList.list : [],
	activeKey : tabList ? tabList.activeKey : ''
}

const tabListResult = handleActions({
	TAB_LIST : function(state, action){
		const data = action.payload
		return {...state, data}
	},
	//更新tabList
	UPDATE_TAB_LIST : function (state, action){
		const data = action.payload
		console.log(data)
        const findList = state.list.find((tab) => tab.key === data.key)
        const list = findList === undefined ? [...state.list,data] : state.list
        console.log([...state.list, data])
		SessionStore.setItem('tabList',JSON.stringify({activeKey : data.key, list}))
		return { activeKey : data.key , list}
	},
	//更新选中的tab
	UPDATE_TAB_LIST_CHECKED : function (state, action){
		const activeKey = action.payload.activeKey
		SessionStore.setItem('tabList',JSON.stringify({...state, activeKey}))
		return { ...state, activeKey}
	},
	//删除tab
	DELETE_TAB_LIST_ITEM : function (state, action){
		const data = action.payload
		const targetKey = data.targetKey
		let list = []
		let deleteKey = 0
		let activeKey
		state.list.map((res, index) =>{
			res.key === targetKey ? deleteKey = index : list.push(res)
		})
		activeKey = state.activeKey
		//要删除的key是选中状态的key
		if(state.activeKey === targetKey){
			//删除的key是否是数组中最后一个
			activeKey = list[deleteKey] ? list[deleteKey].key : (list[deleteKey-1]?list[deleteKey-1].key:'')
		}
		SessionStore.setItem('tabList', JSON.stringify({activeKey : activeKey, list : list}))
		return {activeKey : activeKey, list : list}
	}
}, initialState)

export default tabListResult