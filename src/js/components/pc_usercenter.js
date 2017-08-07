import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
	Tabs,
	message,
	Form,
	Input,
	Button,
	Checkbox,
	Card,
	notification,
	Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component {
    constructor(){
        super()
        this.state={
            usercollection:"",
            usercomments:""
        }
    }
    componentDidMount(){
        var myFetchOptions={
            method:"GET"
        };
        //获取收藏列表
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
        .then(response => response.json())
        .then(json => {
           this.setState({
               usercollection:json
           })
        
        })

        //获取评论列表
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions)
        .then(response => response.json())
        .then(json => {
           this.setState({
               usercomments:json
           })
        
        })
        
    }
    render(){
        const {usercollection} =this.state;
        const {usercomments} =this.state;
        var usercollectionList=usercollection.length?
        usercollection.map((uc,index) => (
            <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
               <p>{uc.Title}</p>
            </Card>
        ))
        :
        "你还没收藏任何新闻，快去收藏一些新闻吧";

        var usercommentsList=usercomments.length?
        usercomments.map((comment,index) => (
          
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
        
        )	
		)
        :
        "你还没有任何评论";
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                    <Tabs>
                        <TabPane tab="我的收藏列表" key="1">
                               <div className="comment">
                                   <Row>
                                       <Col span={24}>
                                      {usercollectionList}
                                       </Col>
                                   </Row>
                               </div>
                        </TabPane>
                         <TabPane tab="我的评论列表" key="2">
                            <div className="comment">
                                   <Row>
                                       <Col span={24}>
                                      {usercommentsList}
                                       </Col>
                                   </Row>
                               </div>
                        </TabPane>
                         <TabPane tab="头像设置" key="3">
                              
                        </TabPane>
                    </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                 <PCFooter />
            </div>
        )
    }
}