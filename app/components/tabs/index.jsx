import React from 'react'
import {hashHistory} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tabActions from '../../redux/action/tabList.js'
import * as menuActions from '../../redux/action/menuList.js'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

class TabNav extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.remove = this.remove.bind(this)
    this.newTabIndex = 0;
  }

  onChange (activeKey) {
  //改变路由
    hashHistory.push(activeKey)
    //改变tab-redux
    this.props.action.updateTabListChecked({activeKey : activeKey})
    //改变menu-redux
    var list = this.props.tabList.list
    let currentIndex
    list.map((res, index)=>{
      res.key === activeKey ? currentIndex = res.id : '0'
    })
    this.props.menuAction.menuListChecked({currentIndex : currentIndex})
  }
  onEdit (targetKey, action) {
  	console.log(targetKey)
  	console.log(action)
    this[action](targetKey);
  }
  remove  (targetKey) {
    let tabLists = this.props.tabList
    let delIndex
    let activeKey
    let currentIndex
    //删除的key为当前显示的key，改变路由
    if(targetKey === tabLists.activeKey){
        tabLists.list.map((res,index)=>{
          res.key === targetKey? delIndex = index : null
        })
        if(tabLists.list[delIndex+1]){
            activeKey = tabLists.list[delIndex+1].key
            currentIndex = tabLists.list[delIndex+1].id
        }else if(tabLists.list[delIndex-1]){
            activeKey = tabLists.list[delIndex-1].key
            currentIndex = tabLists.list[delIndex-1].id
        }else{
            activeKey = ''
            currentIndex = '0'
        }
        hashHistory.push(activeKey)
        //改变menu-redux
        this.props.menuAction.menuListChecked({currentIndex : currentIndex})

    }
    //改变redux-tab
    this.props.action.deleteTabListItem({targetKey:targetKey})
  }
  render() {
    return (
      <div>
        {
          this.props.tabList.list.length?
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.props.tabList.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.props.tabList.list.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
          </Tabs>
          : ''
        }
      </div>
    )
  }
  componentDidMount(){
  }
}

function mapStateToProps(state){
  return {
      tabList : state.tabList
  }
}
function mapDispatchToPros(dispatch){
  return {
      action : bindActionCreators(tabActions, dispatch),
      menuAction : bindActionCreators(menuActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToPros
)(TabNav)