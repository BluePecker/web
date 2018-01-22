/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Form, Tabs, Input, AutoComplete, Icon} from 'antd';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import styles from './style.less';
import logo from '../../../assets/logo.svg';

import Inject from '../../inject';

class Login extends React.Component {


    render() {
        // const {state: {metadata}} = this.props;

        const account = (
            <Form.Item>
                <Input.Group compact>
                    {/*<AutoComplete*/}
                    {/*size="large"*/}
                    {/*dataSource={metadata}*/}
                    {/*onChange={this.usernameOnChange}*/}
                    {/*// onSelect={this.usernameOnSelect}*/}
                    {/*>*/}
                    <Input
                        placeholder="用户名"
                        maxLength="24"
                        prefix={<Icon type="user" className={styles.inputIcon}/>}
                    />
                    {/*</AutoComplete>*/}
                </Input.Group>
            </Form.Item>
        );

        const mobile = (
            <Form.Item>

            </Form.Item>
        );

        return (
            <DocumentTitle title={'登录-管理后台'}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.name}>
                            <Link to="/">
                                <img alt="logo" className={styles.logoImg} src={logo}/>
                                <span className={styles.title}>通用管理后台</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>

                    <div className={styles.main}>
                        <Form layout={'horizontal'}>
                            <div>
                                <Tabs className={styles.tabs}>
                                    <Tabs.TabPane key="account" tab="账号登录">
                                        {account}
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key="mobile" tab="快捷登录">
                                        {mobile}
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Form>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Inject({namespace: 'user/login', component: Login});