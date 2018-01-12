import React from 'react';
import ClassNames from 'classnames';
import {Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin} from 'antd';
import {ContainerQuery} from 'react-container-query';
import DocumentTitle from 'react-document-title';

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

    getPageTitle(menu) {
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

    render() {
        const {dispatch, state} = this.props;

        const layout = (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    breakpoint="md"
                    width={256}
                    style={ClassNames(style.sider)}
                >

                </Sider>
                <Layout>
                    <Header>

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
            <DocumentTitle title={this.getPageTitle(state.menu || {})}>
                <ContainerQuery query={query}>
                    {params => <div className={ClassNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default Inject({namespace: 'admin', component: Admin});
