import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { withRouter } from 'react-router'

class Msg extends React.Component{
	constructor(props, context){
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		return (
			<div>
				<h4 style={{fontSize:'30px',textAlign:'center'}}>message...</h4>
			</div>
		)
	}
	componentDidMount() {
      this.props.router.setRouteLeaveHook(
        this.props.route, 
        this.routerWillLeave
      )
    }

    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
        return '确认要离开？'
    }
}

export default withRouter(Msg)