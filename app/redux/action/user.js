import { createAction } from 'redux-actions'
import { 
	USER_INFO, 
	USER_INFO_UPDATE
} from '../config/actionType.js'

export const userInfo = createAction(USER_INFO)
export const userInfoUpdate = createAction(USER_INFO_UPDATE)