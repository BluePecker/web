/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import ClassNames from 'classnames';
import {Layout, Menu, Icon} from 'antd';
import {ContainerQuery} from 'react-container-query';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router-dom';
import {enquireScreen as EnquireScreen} from 'enquire-js';
import "antd/dist/antd.less";

import Inject from '../inject';

import Logo from '../../assets/logo.svg';
import Avatar from '../../assets/avatar.png';
import Slider from '../../component/Slider';
import Header from '../../component/Header';

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};

const {Content} = Layout;

class Admin extends React.Component {

    titleBuilder(menu) {
        const {location} = this.props;
        let unique = location.pathname.split('/').join('/');
        const traverse = (menu, father = '', map = {}) => {
            Object.keys(menu).forEach(route => {
                let unique = `${father}/${route}`;
                typeof menu[route].children !== 'object' ? (map[unique] = menu[route].name) : traverse(menu[route].children, unique, map);
            });
            return map;
        };
        return `${traverse(menu)[unique] || '管理后台'}-Bamboo`;
    }

    getNavMenuItems(menu, prefix = '') {
        const {location} = this.props;
        return Object.keys(menu).map(key => {
            const route = `${prefix}/${key}`;
            if (typeof menu[key].children !== 'object') {
                return (
                    <Menu.Item key={route}>
                        <Link
                            replace={route === location.pathname}
                            to={route}
                        >
                            {
                                menu[key].icon ? (<span>
                                    <Icon type={menu[key].icon}/>
                                    <span>{menu[key].name}</span>
                                </span>) : <span>{menu[key].name}</span>
                            }
                        </Link>
                    </Menu.Item>
                );
            } else {
                return (
                    <Menu.SubMenu
                        title={
                            menu[key].icon ? (
                                <span>
                                    <Icon type={menu[key].icon}/>
                                    <span>{menu[key].name}</span>
                                </span>
                            ) : <span>{menu[key].name}</span>
                        }
                        key={route}
                    >
                        {this.getNavMenuItems(menu[key].children, route)}
                    </Menu.SubMenu>
                );
            }
        });
    }

    routes(route) {
        let str = '';
        return route.replace(/(^\/|\/$)/, '').split('/').map(item => {
            return str = `${str}/${item}`;
        });
    }

    handleChange = keys => {
        const {dispatch} = this.props;
        dispatch('expand', {
            openKeys: keys && keys.length ? this.routes(keys[keys.length - 1]) : []
        });
    };

    handleExpand = () => {
        const {dispatch, location} = this.props;
        const {pathname} = location;
        dispatch('expand', {openKeys: this.routes(pathname)});
    };

    handleToggle = () => {
        const {dispatch, state: {collapsed}} = this.props;
        dispatch('collapsed');
        // 临时修复bug
        collapsed ? this.handleExpand() : this.handleChange();
    };

    handleCollapse = () => {
        const {dispatch} = this.props;
        dispatch('collapsed');
    };

    componentDidMount() {
        const {dispatch} = this.props;
        EnquireScreen((bool) => {
            dispatch('isMobile', {isMobile: bool});
        });
        // 初始化该展开的菜单
        this.handleExpand();
    }

    render() {
        const {state} = this.props;
        const {collapsed, menu, openKeys, isMobile} = state;

        const layout = (
            <Layout>
                <Slider
                    handleChange={this.handleChange}
                    mobile={isMobile}
                    collapsed={collapsed}
                    metadata={menu}
                    openKeys={openKeys}
                    {...this.props}
                    logo={Logo}
                    onCollapse={this.handleCollapse}
                />
                <Layout>
                    <Header
                        isMobile={isMobile}
                        logo={Logo}
                        onToggle={this.handleToggle}
                        collapsed={collapsed}
                        user={{
                            username: 'shuc324@gmail.com',
                            avatar  : Avatar
                        }}
                    >
                    </Header>
                    <Content style={{margin: '24px 24px 0', height: '100%'}}>

                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.titleBuilder(state.menu || {})}>
                <ContainerQuery query={query}>
                    {params => <div className={ClassNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default Inject({namespace: 'admin', component: Admin});
