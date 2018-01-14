/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Layout, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';
import ClassNames from 'classnames';

import header from './header.less';

export default class Header extends React.Component {

    handleToggle = () => {
        const {onToggle} = this.props;
        onToggle();
    };

    render() {
        const {isMobile, collapsed, logo} = this.props;

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


                </div>
            </Layout.Header>
        );
    }
}