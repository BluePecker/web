/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

export default class SliderMenu extends React.Component {

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

    selectedKeys(menu) {
        const {location} = this.props;
        const {pathname} = location;
        const route = pathname.replace(/\/$/, '');
        const defaultItem = `/${Object.keys(menu)[0] || ''}`;
        route.replace(/^\//, '').split('/').map(item => {
            menu = menu[item] ? (menu[item].children || menu[item]) : {};
        });
        return Object.keys(menu).length ? [route] : [defaultItem];
    }

    render() {
        const {metadata, openKeys, handleChange, collapsed} = this.props;
        return (
            <Menu
                onOpenChange={handleChange}
                theme="dark"
                mode="inline"
                {...(collapsed ? {} : {openKeys: openKeys})}
                openKeys={openKeys}
                selectedKeys={this.selectedKeys(metadata)}
            >
                {this.getNavMenuItems(metadata || {})}
            </Menu>
        );
    }
}