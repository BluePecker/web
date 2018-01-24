/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Form, Tabs, Input, AutoComplete, Icon, Checkbox, Button, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import styles from './style.less';
import logo from '../../../assets/logo.svg';

import Footer from '../../../component/Footer';
import Inject from '../../inject';

class Login extends React.Component {

    render() {
        const {
            state: {metadata, username, password, mobile, autoLogin},
            passwordOnChange, usernameOnChange, usernameOnSelect, mobileOnChange, autoLoginOnChange
        } = this.props;

        const table = (
            <Tabs className={styles.tabs}>
                <Tabs.TabPane key="account" tab="账号登录">
                    <Form.Item>
                        <Input.Group compact style={{height: 32}}>
                            <AutoComplete
                                dataSource={metadata}
                                onChange={usernameOnChange}
                                onSelect={usernameOnSelect}
                                style={{width: '100%'}}
                            >
                                <Input
                                    value={username.value}
                                    placeholder="用户名"
                                    maxLength="24"
                                    prefix={<Icon type="user" className={styles.inputIcon}/>}
                                />
                            </AutoComplete>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            value={password.value}
                            type="password"
                            placeholder="密码"
                            maxLength="16"
                            prefix={<Icon type="lock" className={styles.inputIcon}/>}
                            onChange={passwordOnChange}
                        />
                    </Form.Item>
                </Tabs.TabPane>
                <Tabs.TabPane key="mobile" tab="快捷登录">
                    <Form.Item
                        hasFeedback={mobile.status}
                        validateStatus={mobile.status}
                        help={mobile.message}
                        style={{height: 32, marginBottom: 24, textAlign: 'left'}}
                    >
                        <Input
                            placeholder="手机号"
                            maxLength="11"
                            prefix={<Icon type="mobile" className={styles.inputIcon}/>}
                            value={mobile.value}
                            onChange={mobileOnChange}
                        />
                    </Form.Item>
                    <Row gutter={8}>
                        <Col span={14}>
                            <Form.Item
                                hasFeedback={'error'}
                                validateStatus={'error'}
                                help={'验证码错误'}
                                style={{textAlign: 'left'}}
                            >
                                <Input
                                    placeholder="验证码"
                                    maxLength="6"
                                    prefix={<Icon type="mail" className={styles.inputIcon}/>}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item>
                                <Button
                                    className={styles.captcha}
                                >
                                    {'获取验证码'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        );

        return (
            <DocumentTitle title={'登录-管理后台'}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.name}>
                            <Link to="/">
                                <img alt="logo" className={styles.logoImg} src={logo}/>
                                <span className={styles.title}>BAMBOO管理后台</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>简洁 / 高效 / 智能 / 安全</div>
                    </div>

                    <div className={styles.main}>
                        <Form layout={'horizontal'}>
                            <div>
                                {table}
                            </div>
                            <Form.Item className={styles.additional}>
                                <Checkbox checked={autoLogin} onChange={autoLoginOnChange}>自动登录</Checkbox>
                                <a className={styles.forgot} href="">忘记密码</a>
                                <Button size="large" className={styles.submit} type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Footer
                        className={styles.footer}
                        links={[{
                            key        : 'Pro 首页',
                            title      : 'Pro 首页',
                            href       : 'http://pro.ant.design',
                            blankTarget: true,
                        }, {
                            key        : 'github',
                            title      : <Icon type="github"/>,
                            href       : 'https://github.com/ant-design/ant-design-pro',
                            blankTarget: true,
                        }, {
                            key        : 'Ant Design',
                            title      : 'Ant Design',
                            href       : 'http://ant.design',
                            blankTarget: true,
                        }]}
                        copyright={
                            <div>
                                Copyright <Icon type="copyright"/> 2018 蚂蚁金服体验技术部出品
                            </div>
                        }
                    />
                </div>
            </DocumentTitle>
        );
    }
}

export default Inject({namespace: 'user/login', component: Login});