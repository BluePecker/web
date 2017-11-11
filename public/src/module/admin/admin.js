import 'antd/dist/antd.less';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, Link} from 'react-router-dom';

import './admin.less';

import Test1 from './test1';

const {Header, Sider, Content} = Layout;

// 引入垫片兼容IE
export default class Admin extends React.Component {

    state = {
        collapsed: false,
        menuId   : '',
    };

    selectMenu = (e) => {
        this.setState({
            menuId: e.key
        });
        // console.log(this.state.menuId);
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        return this.state.collapsed;
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <Menu theme="dark" onClick={this.selectMenu} mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="login">
                            <Link to={'test'}>
                                <Icon type="user"/>
                                <span>nav 1</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <div>
                            <Route path="test" component={Test1}/>
                        </div>
                        {this.props.children}
                        <div>sdfasfsdf</div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
