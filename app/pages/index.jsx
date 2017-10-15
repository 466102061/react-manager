import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LocalStore from '../util/localStore.js'
import SessionStore from '../util/sessionStore.js'
import * as menuListActions from '../redux/action/menuList.js'
import * as userActions from '../redux/action/user.js'
import MenuNav from '../components/menu'
import TabNav from '../components/tabs'
import { hashHistory } from 'react-router'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content, Footer } = Layout

class App extends React.Component{
	constructor(props, context){
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.toggle = this.toggle.bind(this)
		this.logout = this.logout.bind(this)
		this.state = {
			collapsed : false
		}
	}
	toggle (){
	    this.setState({
	      collapsed: !this.state.collapsed,
	    })
	}
	logout(){
		//清除本地存储
		LocalStore.removeItem('userInfo')
		SessionStore.removeItem('menuList')
		SessionStore.removeItem('tabList')
		//清除user-redux
		this.props.userInfoAction.userInfoUpdate({userName : '', password : ''})
		//改变路由
		hashHistory.push('/login')
	}
	render(){
		return (
		      <Layout id="App" style={{height:'100%'}}>
		          <Header style={{ position:'relative' }}>
		          		<span style={{fontSize:'24px',position:'absolute',left:'30px',top:'0px',color:'#fff'}}>引流后台系统</span>
		          		<span style={{fontSize:'14px',color:'#fff',position:'absolute',right:'20px',top:'0px',cursor:'pointer'}} onClick={this.logout}>
		          			<Icon type="logout" style={{ fontSize: 14, color: '#fff' }} />
		          			<span style={{textDecoration:'underline',marginLeft:'2px'}}>登出</span>
		          		</span>
		          </Header>
		        <Layout style={{height:'100%'}}>
		        <Sider
		          trigger={null}
		          collapsible
		          collapsed={this.state.collapsed}
		        >
		          <div className="logo" />
		          <MenuNav inlineCollapsed={this.state.collapsed} />
		          <div className="btnTrigger">
		            <Icon
		              type={this.state.collapsed ? 'anticon anticon-menu-unfold' : 'anticon anticon-menu-fold'}
		              onClick={this.toggle}
		            />
	            </div>
		        </Sider>
		          <Content>
		          	<div className="cbody">
		          		<div className="contents">
		          		  <TabNav />
		          		  <div>{this.props.children}</div>
		          		 </div>
		           		 <div className="copyRight">©2017 Created by 小小咖 </div>
		            </div>
		          </Content>
		          <layout>
		          </layout>
		        </Layout>
		      </Layout>
		)
	}
}

function mapStateToProps(state){
	return {
		userInfo : state.userInfo
	}
}
function mapDispatchToProps(dispatch){
	return {
		userInfoAction : bindActionCreators(userActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)