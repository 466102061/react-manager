import { handleActions } from 'redux-actions'
import LocalStore from '../../util/localStore.js'
import{
	USER_INFO,
	USER_INFO_UPDATE
}from '../config/actionType.js'

const userInfo = JSON.parse(LocalStore.getItem('userInfo'))
const initialState = {
	userName : userInfo ? userInfo.userName : '',
	password : userInfo ? userInfo.password : ''
}
console.log(initialState)
const userInfoResult = handleActions({
	USER_INFO : function(state, action){
		const data = action.payload
		return {...state, data}
	},
	USER_INFO_UPDATE : function(state, action){
		const data = action.payload
		const userName = state.userName === data.userName ? state.userName : data.userName
		const password = state.password === data.password ? state.password : data.password
		LocalStore.setItem('userInfo',JSON.stringify({ userName : userName, password : password}))
		return { userName : userName, password : password}
	}
}, initialState)

export default userInfoResult