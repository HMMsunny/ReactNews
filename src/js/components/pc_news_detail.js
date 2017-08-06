import React from "react"
import {Row,Col,BackTop} from "antd"


import PCNewsImageBlock from "./pc_news_image_block"
import PCHeader from "./pc_header"
import PCFooter from "./pc_footer"
import CommonComments from "./common_comment"


export default class PCNewsDetails extends React.Component {
constructor(){
    super()
    this.state={
        newsItem:""
    }
}
componentWillMount(){
    var myFetchOptions={
        method:"GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
        this.setState({
            newsItem:json
        })
        document.title=this.state.newsItem.title+"- React News | React 驱动的新闻平台" ;
    })
}
createMakeup(){
    return {__html:this.state.newsItem.pagecontent};
}
render(){
    return (
        <div>
            <Row>
                <PCHeader />
                <Col span={2}></Col>
                {/*详情页主要内容*/}
                <Col span={14} className="container">
                <div className="articleContainer" dangerouslySetInnerHTML={this.createMakeup()}></div>
                <CommonComments uniquekey={this.props.params.uniquekey} />
                </Col>
                <Col span={6}>
                <PCNewsImageBlock count={40} type="top" width="100%" cartTitle="相关新闻" imageWidth="150px"/>
                </Col>
                <Col span={2}></Col>
              
                <PCFooter /> 
                <BackTop/>
            </Row>
        </div>
    )
}
}