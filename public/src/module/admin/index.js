/**
 * @typedef {{Component:class}} React
 */
import "antd/dist/antd.less";
import React from 'react';
import ClassNames from 'classnames';
import {Layout, Menu, Icon} from 'antd';
import {ContainerQuery} from 'react-container-query';
import DocumentTitle from 'react-document-title';
import {Link, Route} from 'react-router-dom';
import {enquireScreen as EnquireScreen} from 'enquire-js';
import PropTypes from 'prop-types';

import Inject from '../inject';

import Logo from '../../assets/logo.svg';
import Avatar from '../../assets/avatar.png';
import Slider from '../../component/Slider';
import Header from '../../component/Header';
import Footer from '../../component/Footer';

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

    //noinspection JSUnusedGlobalSymbols
    static childContextTypes = {
        location: PropTypes.object,
        nameMap : PropTypes.object,
    };

    //noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {location} = this.props;
        const {nameMap} = this.breadcrumbNameMap();
        return {nameMap, location};
    }

    breadcrumbNameMap() {
        const {state: {menu}} = this.props;
        const traverse = (menu, father = '', map = {}) => {
            Object.keys(menu).forEach(route => {
                let unique = `${father}/${route}`;
                map[unique] = menu[route];
                typeof menu[route].children === 'object' && traverse(menu[route].children, unique, map);
            });
            return map;
        };
        return {nameMap: traverse(menu)};
    }

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
        return `${traverse(menu)[unique] || '管理后台'}-无锡水务中控`;
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
        keys = keys || [];
        keys.length && (keys = this.routes(keys[keys.length - 1]));
        const {handleExpand} = this.props;
        handleExpand(keys);
    };

    handleExpand = () => {
        const {handleExpand, location} = this.props;
        const {pathname} = location;
        handleExpand(this.routes(pathname));
    };

    handleToggle = () => {
        const {handleCollapsed, state: {collapsed}} = this.props;
        handleCollapsed();
        // 临时修复bug
        collapsed ? this.handleExpand() : this.handleChange();
    };

    handleCollapse = () => {
        const {handleCollapsed} = this.props;
        handleCollapsed();
    };

    componentDidMount() {
        const {handleMobile} = this.props;
        EnquireScreen(bool => handleMobile(bool));
        // 初始化该展开的菜单
        this.handleExpand();
    }

    builderRoute() {
        const {state: {menu}} = this.props;
        const traverse = (menu, father = '', map = {}) => {
            Object.keys(menu).forEach(route => {
                let unique = `${father}/${route}`;
                typeof menu[route].children !== 'object' ? (map[unique] = menu[route]) : traverse(menu[route].children, unique, map);
            });
            return map;
        };

        return Object.keys(traverse(menu)).map(item =>
            <Route key={item} path={item} component={require(`.${item}`).default}/>
        );
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
                        {this.builderRoute()}
                        <Footer copyright={<div>Copyright <Icon type="copyright"/> 2018 无锡市自来水有限公司</div>}/>
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
