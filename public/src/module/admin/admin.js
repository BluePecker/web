import 'antd/dist/antd.less';
import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon} from 'antd';
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

    //noinspection JSUnusedGlobalSymbols
    static childContextTypes = {
        location   : PropTypes.object,
        breadcrumbs: PropTypes.object,
    };

    constructor(props) {
        super();
        this.menus = NavConfig;
        this.state = {
            openKeys: this.getCurrentMenuSelectedKeys(props),
        };
    }

    //noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {location} = this.props;
        const breadcrumbs = this.getBreadcrumbs(this.menus);
        return {location, breadcrumbs};
    }

    getBreadcrumbs(menus) {
        let fn = (data, parent = '') => {
            let breadcrumb = [];
            (data || []).filter(item => item.component || item.children).forEach(item => {
                item.route = `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
                breadcrumb.push(item, ...fn(item.children, item.route));
            });
            return breadcrumb;
        };
        let map = {};
        fn(menus).forEach(item => {
            map[item.route] = item.name;
        });
        return map;
    }

    getRouteItems(menus) {
        let fn = (data, parent = '') => {
            let routes = [];
            (data || []).forEach(item => {
                item.exact = true;
                item.route = `${parent}/${item.path || ''}`.replace(/\/+/g, '/');
                if (item.children && !item.component) {
                    routes.push(...fn(item.children, item.route));
                } else {
                    item.exact = item.children && item.component ? false : item.exact;
                    routes.push(item);
                }
            });
            return routes;
        };
        return fn(menus).map(item => (
            <Route key={item.route} path={item.route} exact={item.exact} component={item.component}/>
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
                    <div className="logo">
                    </div>
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
                <Layout style={{background: '#f0f2f5'}}>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon className="trigger" onClick={this.menuToggle} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </Header>
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
