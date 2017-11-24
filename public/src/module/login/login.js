import React from 'react';
import {Form, Tabs, Input, Icon, Row, Col, Button, Checkbox} from 'antd';
import DocumentTitle from 'react-document-title';
import Footer from './../../component/Footer';

import styles from './login.less';

export default class Login extends React.Component {
    state = {
        type: 'account'
    };

    onSwitch = key => {
        this.setState({type: key});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {type} = this.state;
        this.props.form.validateFields({force: true},
            (err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type   : `login/${type}Submit`,
                        payload: values,
                    });
                }
            }
        );
    };

    render() {
        const count = 60;

        return (
            <DocumentTitle title={"登录"}>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <Form onSubmit={this.handleSubmit}>
                            <Tabs className={styles.tabs} defaultActiveKey="account" activeKey={this.state.type} onChange={this.onSwitch}>
                                <Tabs.TabPane tab="账号登录" key="account">
                                    <Form.Item
                                        hasFeedback
                                        validateStatus="error"
                                        help="用户名格式错误"
                                    >
                                        <Input
                                            id="error"
                                            size="large"
                                            prefix={<Icon type="user" className={styles.inputIcon}/>}
                                            placeholder="用户名"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input
                                            size="large"
                                            prefix={<Icon type="lock" className={styles.inputIcon}/>}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    </Form.Item>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="快捷登录" key="mobile">
                                    <Form.Item>
                                        <Input
                                            size="large"
                                            prefix={<Icon type="mobile" className={styles.inputIcon}/>}
                                            placeholder="手机号"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Row gutter={8}>
                                            <Col span={16}>
                                                <Input
                                                    size="large"
                                                    prefix={<Icon type="mail" className={styles.inputIcon}/>}
                                                    placeholder="验证码"
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    disabled={count}
                                                    className={styles.getCaptcha}
                                                    size="large"
                                                    onClick={this.onGetCaptcha}
                                                >
                                                    {count ? `${count} s` : '获取验证码'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Tabs.TabPane>
                            </Tabs>
                            <Form.Item className={styles.additional}>
                                <Checkbox checked>自动登录</Checkbox>
                                <a className={styles.forgot} href="">忘记密码</a>
                                <Button size="large" className={styles.submit} type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Footer copyright={<div>Copyright <Icon type="copyright"/> 2017 蚂蚁金服体验技术部出品</div>}/>
                </div>
            </DocumentTitle>
        );
    }
}