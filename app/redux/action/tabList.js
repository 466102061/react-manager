import { createAction } from 'redux-actions'
import {
	TAB_LIST,
	UPDATE_TAB_LIST,
	DELETE_TAB_LIST_ITEM,
	UPDATE_TAB_LIST_CHECKED
}from '../config/actionType.js'

export const tabList = createAction(TAB_LIST)
export const updateTabList = createAction(UPDATE_TAB_LIST)
//更新tab选中
export const updateTabListChecked = createAction(UPDATE_TAB_LIST_CHECKED)
//删除tab
export const deleteTabListItem = createAction(DELETE_TAB_LIST_ITEM)