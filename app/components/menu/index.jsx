import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as menuListActions from '../../redux/action/menuList.js'
import * as tabActions from '../../redux/action/tabList.js'
import SessionStore from '../../util/sessionStore.js'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'

class MenuNav extends React.Component{
	constructor(props, context){
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		const currentIndex = this.props.menuItems.currentIndex
		const menuTabs = this.props.menuItems.items.map((res,index)=>{
			return <Menu.Item key={index}>
		              <Icon type={res.icoName} />
		              <span>{res.title}</span>
		            </Menu.Item>
		})
		return (
			<div>
	          <Menu theme="dark" mode="inline" inlineCollapsed={this.props.inlineCollapsed} selectedKeys={[currentIndex]} onSelect={this.menuOnSelected}>
	            {menuTabs}
	          </Menu>
	        </div>
		)
	}
	menuOnSelected =(e) =>{
		//console.log(e.item.props.children[0].props)
		//console.log(e.item.props.children[1].props)

		const item = this.props.menuItems.items[e.key]
		this.props.tabAction.updateTabList({id : item.id, key : item.key, title : item.title, content : ''})
		this.props.tabAction.updateTabListChecked({activeKey:item.key})
		this.props.action.menuListChecked({currentIndex : item.id})
		hashHistory.push(item.key)
	}
	componentDidMount(){
		//this.props.action.menuListUpdate(MenuList)
	}
}


function mapStateToProps(state){
	return {
		menuItems : state.menuList,
		tabItems : state.tabList
	}
}

function mapDispatchToProps(dispatch){
	return {
		action : bindActionCreators(menuListActions, dispatch),
		tabAction : bindActionCreators(tabActions,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuNav)