import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import {Layout} from 'antd';
import Menu from './menu';

import slider from './slider.less';

export default props => {
    const {mobile, onCollapse, collapsed} = props;

    const Slider = (
        <Layout.Sider
            className={slider.sider}
            trigger={null}
            collapsible
            breakpoint="md"
            onCollapse={onCollapse}
            width={256}
            collapsed={mobile ? false : collapsed}
        >
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