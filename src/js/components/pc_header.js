import React from 'react';
import {Row, Col} from 'antd';
import {Menu,
	    Icon,
	    Tabs,
		message,
		Form,
		Input,
		Button,
		Checkbox,
		Modal
		} from 'antd';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
 class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible:false,
			action:"login",
			hasLogined:false,
			userNickName:"",
			userId:0

		};
	}
	componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	};
	setModalVisible(value){
		this.setState({
			modalVisible:value
		})
	}
	//处理用户点击事件
	handleClick(e){

   if(e.key=="register"){
	   this.setState({
		   current:"register"})
		   this.setModalVisible(true);
   }else {
	   this.setState({
		   current:e.key
	   })
   }
	}
	//处理表单提交事件
	handleSubmit(e){
  
      e.preventDefault();
	  //获取表单提交数据
	var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	}
	//切换面板的回调函数
	callback(key){
		if(key==1){
			//登陆
			this.setState({
				action:"login"
			})

		}else if(key==2){
            //注册
			this.setState({
				action:"register"
			})
		}
	}
	logout(){
		this.setState({
			hasLogined:false
		})
	}
	render() {
		let { getFieldDecorator } = this.props.form;
		//判断用户是否注册
		const userShow=this.state.hasLogined ?
		//已经登陆返回的样式
		<Menu.Item key="logout" class="register">
             <Button type="primary" htmlType="button" style={{height:20}}>{this.state.userNickName} </Button>
			 &nbsp;&nbsp;
			 <Link target="_blank">
			 <Button type="dashed" htmlType="button" style={{marginRight:10}}>个人中心 </Button>
			 </Link>
			 <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出 </Button>
        </Menu.Item>
		//未登陆返回的样式
		:<Menu.Item key="register" class="register">
          <Icon type="appstore" />注册/登陆
		</Menu.Item>;
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>时尚
							</Menu.Item>
							{userShow}
						</Menu>

              {/*模态框-注册功能*/}
			  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
                <Tabs type="card" onChange={this.callback.bind(this)}>
					<TabPane tab="登陆" key='1'>
						<Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('userName', {})(
                                            <Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('password', {})(
                                            <Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit" >登陆</Button>
									</Form>
						</TabPane>
					<TabPane tab="注册" key='2'>
						<Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('r_userName', {})(
                                            <Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('r_password', {})(
                                            <Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<FormItem label="确认密码">
											{getFieldDecorator('r_confirmPassword', {})(
                                            <Input type="password" placeholder="请再次输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit" >注册</Button>
									</Form>
						</TabPane>
				</Tabs>
			  </Modal>

					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}

export default PCHeader=Form.create({})(PCHeader);
