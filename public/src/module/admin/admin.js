import React from 'react';
import ClassNames from 'classnames';
import {Layout, Menu, Icon} from 'antd';
import {ContainerQuery} from 'react-container-query';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router-dom';

import Inject from '../inject';

import style from './admin.less';

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

const {Sider, Header, Content} = Layout;

class Admin extends React.Component {

    titleBuilder(menu) {
        const {location} = this.props;
        let unique = location.pathname.split('/').slice(0, 3).join('/');
        const traverse = (menu, father = '', map = {}) => {
            Object.keys(menu).forEach(route => {
                let unique = `${father}/${route}`;
                typeof menu[route].children !== 'object' ? (map[unique] = menu[route].name) : traverse(menu[route].children, unique, map);
            });
            return map;
        };
        return traverse(menu)[unique] || '管理后台';
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

    selectedMenuKeys(menu) {
        const {location} = this.props;
        const {pathname} = location;
        const route = pathname.replace(/\/$/, '');
        const defaultItem = `/${Object.keys(menu)[0] || ''}`;
        route.replace(/^\//, '').split('/').map(item => {
            menu = menu[item] ? (menu[item].children || menu[item]) : {};
        });
        return Object.keys(menu).length ? [route] : [defaultItem];
    }

    handleOpenChange = keys => {
        const {dispatch} = this.props;
        dispatch('menu_change', {keys: keys.length ? [keys[keys.length - 1]] : []});
    };

    handleMenuToggle = () => {
        const {dispatch} = this.props;
        dispatch('collapsed');
    };

    render() {
        const {dispatch, state} = this.props;

        const layout = (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={state.collapsed}
                    breakpoint="md"
                    width={256}
                    style={style.sider}
                >
                    <Menu
                        selectedKeys={this.selectedMenuKeys(state.menu || {})}
                        theme="dark"
                        mode="inline"
                        onOpenChange={this.handleOpenChange}
                        {...state.menu_open_keys}
                        openKeys={state.menu_open_keys}
                    >
                        {this.getNavMenuItems(state.menu || {})}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={ClassNames(style.header)} style={{background: '#fff'}}>
                        <Icon
                            className={ClassNames(style.trigger)}
                            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleMenuToggle}
                        />
                    </Header>
                    <Content style={{margin: '24px 24px 0', height: '100%'}}>
                        <div>
                            <span>{state.username}</span>
                            <button onClick={() => dispatch('change', {username: 'Shuc324@gmail.com'})}>改变名字</button>
                        </div>
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
