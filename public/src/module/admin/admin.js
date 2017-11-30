import 'antd/dist/antd.less';
import React from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import {Route, Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {ContainerQuery} from 'react-container-query';
import ClassNames from 'classnames';

import './admin.less';
import NavConfig from './menu';

const {Header, Sider} = Layout;
const {SubMenu} = Menu;

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

// 引入垫片兼容IE
export default class Admin extends React.Component {
    state = {
        collapsed: false,
    };

    constructor(props) {
        super();
        this.menus = NavConfig;
        this.state = {
            openKeys: this.getCurrentMenuSelectedKeys(props),
        };
        this.breadcrumbs = this.getBreadcrumbs(this.menus);
    }

    getBreadcrumbs(menus) {
        let fn = (data, parent = '') => {
            let breadcrumb = [];
            (data || []).filter(item => item.component || item.children).forEach(item => {
                item.path = `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
                breadcrumb.push(item, ...fn(item.children, item.path));
            });
            return breadcrumb;
        };
        let map = {};
        fn(menus).forEach(item => {
            map[item.path] = item.name;
        });
        return map;
    }

    getRouteItems(menus) {
        let fn = (data, parent = '') => {
            let routes = [];
            (data || []).filter(item => item.children).forEach(item => {
                item.exact = true;
                item.path = `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
                if (item.children && !item.component) {
                    routes.push(...fn(item.children, item.path));
                } else {
                    item.exact = item.children && item.component ? false : item.exact;
                    routes.push(item);
                }
            });
            return routes;
        };

        return fn(menus).map(item => (
            <Route key={item.key} path={item.path} exact={item.exact} component={item.component}/>
        ));
    }

    getMenuItems(menus, parent = '') {
        return !menus ? [] : menus.filter(item => item.name).map(item => {
            let path = item.path.indexOf('http') === 0 ? item.path : `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
            if (item.children && item.children.some(item => item.name)) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    <Icon type={item.icon}/>
                                    <span>{item.name}</span>
                                </span>
                            ) : item.name
                        }
                        key={item.key || item.path}
                    >
                        {this.getMenuItems(item.children, path)}
                    </SubMenu>
                );
            }

            const icon = item.icon && <Icon type={item.icon}/>;
            return (
                <Menu.Item key={item.key || item.path}>
                    {
                        /^https?:\/\//.test(path) ? (
                            <a href={path} target={item.target}>
                                {icon}<span>{item.name}</span>
                            </a>
                        ) : (
                            <Link
                                to={path}
                                target={item.target}
                                replace={path === this.props.location.pathname}
                            >
                                {icon}<span>{item.name}</span>
                            </Link>
                        )
                    }
                </Menu.Item>
            );
        });
    }

    getPageTitle(menus) {
        const {location} = this.props;
        const {pathname} = location;
        let title = '管理后台';
        (menus || []).forEach((item) => {
            if (item.path === pathname) {
                title = `${item.name} - 管理后台`;
            }
        });
        return title;
    }

    getCurrentMenuSelectedKeys = (props) => {
        const {location: {pathname}} = props || this.props;
        const keys = pathname.split('/').slice(1);
        if (keys.length === 1 && keys[0] === '') {
            return [this.menus[0].path];
        }
        return keys;
    };

    menuToggle = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    menuOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    };

    render() {
        const layout = (
            <Layout>
                <Sider trigger={null} collapsed={this.state.collapsed}>
                    <div className="logo"> React管理后台</div>
                    <Menu
                        selectedKeys={this.getCurrentMenuSelectedKeys()}
                        theme="dark"
                        mode="inline"
                        onOpenChange={this.menuOpenChange}
                        openKeys={this.state.openKeys}
                    >
                        {this.getMenuItems(this.menus)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon className="trigger" onClick={this.menuToggle} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </Header>
                    <div style={{width: '100%', margin: '4px 16px'}}>
                        <Breadcrumb separator="/">
                            <Breadcrumb.Item>
                                <Link to="/"><Icon type="home"/></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/auth/action2">
                                    <span>权限管理</span>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>账号管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {this.getRouteItems(this.menus)}
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle(this.menus)}>
                <ContainerQuery query={query}>
                    {
                        params => (
                            <div className={ClassNames(params)}>{layout}</div>
                        )
                    }
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}
