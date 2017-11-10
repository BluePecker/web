import React from 'react';
import {Layout, Menu, Icon} from 'antd';

const {MenuBar, TopBar, Content} = Layout;

export default class Sidebar extends React.Component {
    state = {collapsed: false,};

    Home = '';

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        return this.state.collapsed;
    };

    render() {
        return (
            <Layout>
                <MenuBar>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span>nav 1</span>
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
                </MenuBar>
                <Layout>
                    <TopBar style={{background: '#fff', padding: 0}}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                    </TopBar>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}