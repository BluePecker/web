/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Layout, Icon, Divider, Dropdown, Avatar, Spin, Menu} from 'antd';
import {Link} from 'react-router-dom';
import ClassNames from 'classnames';

import header from './header.less';

export default class Header extends React.Component {

    handleToggle = () => {
        const {onToggle} = this.props;
        onToggle();
    };

    render() {
        /**
         * @typedef {{username:string,avatar:string}} user
         */
        const {isMobile, collapsed, logo, user} = this.props;

        const menu = (
            <Menu className={header.menu} selectedKeys={[]}>
                <Menu.Item disabled><Icon type="user"/>个人中心</Menu.Item>
                <Menu.Item disabled><Icon type="setting"/>设置</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout" style={{color: 'red'}}><Icon type="logout"/>退出登录</Menu.Item>
            </Menu>
        );

        return (
            <Layout.Header className={ClassNames(header.header)}>
                {isMobile && (
                    [
                        (
                            <Link to="/" className={ClassNames(header.singleLogo)} key="logo">
                                <img src={logo} alt="logo" width="32"/>
                            </Link>
                        ),
                        <Divider type="vertical" key="line"/>,
                    ]
                )}
                <Icon
                    className={ClassNames(header.trigger)}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.handleToggle}
                />
                <div className={ClassNames(header.right)}>
                    {user && user.username ? (
                        <Dropdown overlay={menu}>
                            <span className={`${header.action} ${header.account}`}>
                                <Avatar size="small" className={header.avatar} src={user.avatar}/>
                                <span>{user.username}</span>
                            </span>
                        </Dropdown>
                    ) : <Spin size="small" style={{marginLeft: 8}}/>}
                </div>
            </Layout.Header>
        );
    }
}