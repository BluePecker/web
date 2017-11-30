import React from 'react';
import classNames from 'classnames';
import {Breadcrumb, Layout as Content} from 'antd';

export default ({className, breadcrumb}) => {
    return (
        <Content className={classNames(className)}>
            <Breadcrumb separator="/" routes={} params={} linkRender={} nameRender={}/>
        </Content>
    );
};