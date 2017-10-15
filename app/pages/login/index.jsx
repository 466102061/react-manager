import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoAction from '../../redux/action/user.js'
import { Layout, Menu, Icon, Form, Input, Button, Checkbox } from 'antd'
const { Header, Sider, Content, Footer } = Layout
const FormItem = Form.Item
import './style.css'

class loginForm extends React.Component{
	constructor(props, context){
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	this.props.action.userInfoUpdate({userName : values.userName, password : values.password})
	        console.log('Received values of form: ', values);
	      	hashHistory.push('/')
	      }
	    })
	}
	render(){
		if(this.props.userName){
			//已登录
	     	hashHistory.push('/')
		}
	    const { getFieldDecorator } = this.props.form
		return (
			<Layout style={{height:'100%'}}>
				<Header className="loginTop">引流后台管理系统</Header>
				<Content style={{backgroundColor:'#e7ebee'}}>
				    <div className="loginForm">
				      <Form onSubmit={this.handleSubmit} className="login-form">
				        <FormItem>
				          {getFieldDecorator('userName', {
				            rules: [{ required: true, message: '请输入用户名!' }],
				          })(
				            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: '请输入密码!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
				          )}
				        </FormItem>
				        <FormItem>
				          {getFieldDecorator('remember', {
				            valuePropName: 'checked',
				            initialValue: true,
				          })(
				            <Checkbox>记住我的</Checkbox>
				          )}
				          <Button type="primary" htmlType="submit" className="login-form-button">
				             登录
				          </Button>
				        </FormItem>
				      </Form>	
				      </div>	
				      <div className="copyRight" style={{backgroundColor:'#e7ebee',bottom:'10px'}}>©2017 Created by 小小咖</div>
				</Content>
			</Layout>
		)
	}
	componentDidMount() {
    }
}
const Login = Form.create()(loginForm)

function mapStateToProps(state){
	return {
		userName : state.user.userName
	}
}
function mapDispatchToProps(dispatch){
	return {
		action : bindActionCreators(userInfoAction, dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)