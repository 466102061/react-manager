import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../redux/action/user.js'

class Home extends React.Component{
	constructor(props, context){
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		return (
			<div>
				<h4 style={{textAlign:'center',fontSize:'30px'}}>{'"'+this.props.userName+'" 欢迎您...'}</h4>
			</div>
		)
	}
}
function mapStateToProps(state){
	return {
		userName : state.user.userName,
		password : state.user.password
	}
}
function mapDispatchToProps(dispatch){
	return {
		action : bindActionCreators(userActions,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)