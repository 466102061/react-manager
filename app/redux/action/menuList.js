import { createAction } from 'redux-actions'
import {
	MENU_LIST,
	MENU_LIST_UPDATE,
	MENU_LIST_CHECKED
} from '../config/actionType.js'

export const menuList = createAction(MENU_LIST)
export const menuListUpdate = createAction(MENU_LIST_UPDATE)
export const menuListChecked = createAction(MENU_LIST_CHECKED)
