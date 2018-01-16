import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import {Layout} from 'antd';
import {Link} from 'react-router-dom';
import ClassNames from 'classnames';

import Menu from './menu';

import slider from './slider.less';

export default props => {
    const {mobile, onCollapse, collapsed, logo} = props;

    const Slider = (
        <Layout.Sider
            className={ClassNames(slider.sider)}
            trigger={null}
            collapsible
            breakpoint="md"
            onCollapse={onCollapse}
            width={256}
            collapsed={mobile ? false : collapsed}
        >
            <div className={ClassNames(slider.logo)} key="logo">
                <Link to="/">
                    <img src={logo} alt="logo"/>
                    <h1>泵房管理后台</h1>
                </Link>
            </div>
            <Menu {...props}/>
        </Layout.Sider>
    );

    return mobile ? (
        <DrawerMenu
            open={!collapsed}
            parent={null}
            level={null}
            iconChild={null}
            width="256px"
            onMaskClick={() => onCollapse(true)}
        >
            {Slider}
        </DrawerMenu>
    ) : Slider;
};