/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Layout, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

import header from './header.less';

export default class Header extends React.Component {

    handleToggle = () => {
        const {onToggle} = this.props;
        onToggle();
    };

    render() {
        const {isMobile, collapsed, logo} = this.props;

        return (
            <Layout.Header className={header.header}>
                {isMobile && (
                    [
                        (
                            <Link to="/" className={header.logo} key="logo">
                                <img src={logo} alt="logo" width="32"/>
                            </Link>
                        ),
                        <Divider type="vertical" key="line"/>,
                    ]
                )}
                <Icon
                    className={header.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.handleToggle}
                />
            </Layout.Header>
        );
    }
}