import React from 'react';
import {Form, Tabs, Input, Icon, Row, Col, Button, Checkbox, AutoComplete} from 'antd';
import DocumentTitle from 'react-document-title';
import Footer from './../../component/Footer';

import styles from './login.less';

export default class Login extends React.Component {
    state = {
        username: '',
        mobile  : '',
        password: '',
        smsCode : '',

        count    : 0,
        ms       : 'success',
        loginType: 'account',
        autoLogin: true,

        emailDataSource: []
    };

    tableOnSwitch = loginType => {
        this.setState({loginType});
    };

    usernameOnChange = (value) => {
        this.setState({
            username       : value,
            emailDataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@qq.com`,
            ],
        });
    };

    usernameOnSelect = (value) => {
        this.setState({username: value});
    };

    mobileOnChange = (e) => {
        const {value} = e.target;
        if (value === '') {
            this.setState({
                ms: 'success'
            });
        } else {
            let reg, match = value;
            switch (value.length) {
            case 1:
                reg = /^(1)$/;
                break;
            case 2:
                reg = /^(13|14|15|17|18)$/;
                break;
            case 3:
                reg = /^(13[0-9]|14[57]|15[012356789]|17[678]|18[0-9])$/;
                break;
            default:
                match = match.substr(3, 8);
                reg = /^[0-9]+$/;
            }

            reg.test(match) ? this.setState({
                ms: 'success'
            }) : this.setState({
                ms: 'error'
            });
        }

        this.setState({mobile: value});
    };

    smsCodeOnChange = (e) => {
        const {value} = e.target;
        if (value === '' || /^[0-9]+$/.test(value)) {
            this.setState({smsCode: value});
        }
    };

    onGetCaptcha = () => {
        let count = 59;
        this.setState({count});
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({count});
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {loginType} = this.state;
        this.proms.form.validateFields({force: true},
            (err, values) => {
                if (!err) {
                    this.proms.dispatch({
                        type   : `login/${loginType}Submit`,
                        payload: values,
                    });
                }
            }
        );
    };

    render() {

        return (
            <DocumentTitle title={"登录"}>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <div className={styles.header}/>
                        <Form onSubmit={this.handleSubmit}>
                            <Tabs className={styles.tabs} defaultActiveKey="account" activeKey={this.state.loginType} onChange={this.tableOnSwitch}>
                                <Tabs.TabPane tab="账号登录" key="account">
                                    <Form.Item>
                                        <Input.Group compact style={{height: 32}}>
                                            <AutoComplete
                                                size="large"
                                                dataSource={this.state.emailDataSource}
                                                onChange={this.usernameOnChange}
                                                onSelect={this.usernameOnSelect}
                                            >
                                                <Input
                                                    prefix={<Icon type="user" className={styles.inputIcon}/>}
                                                    placeholder="用户名"
                                                    maxLength="24"
                                                />
                                            </AutoComplete>
                                        </Input.Group>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input
                                            size="large"
                                            prefix={<Icon type="lock" className={styles.inputIcon}/>}
                                            type="password"
                                            placeholder="密码"
                                            maxLength="16"
                                        />
                                    </Form.Item>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="快捷登录" key="mobile">
                                    <Form.Item
                                        hasFeedback={this.state.ms === "error"}
                                        validateStatus={this.state.ms}
                                        help={this.state.ms === "error" ? "手机号格式错误" : ""}
                                    >
                                        <Input
                                            size="large"
                                            prefix={<Icon type="mobile" className={styles.inputIcon}/>}
                                            placeholder="手机号"
                                            maxLength="11"
                                            onChange={this.mobileOnChange}
                                            value={this.state.mobile}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Row gutter={8}>
                                            <Col span={15}>
                                                <Input
                                                    size="large"
                                                    prefix={<Icon type="mail" className={styles.inputIcon}/>}
                                                    placeholder="验证码"
                                                    maxLength="6"
                                                    onChange={this.smsCodeOnChange}
                                                    value={this.state.smsCode}
                                                />
                                            </Col>
                                            <Col span={9}>
                                                <Button
                                                    disabled={this.state.count}
                                                    size="large"
                                                    onClick={this.onGetCaptcha}
                                                    className={styles.getCaptcha}
                                                >
                                                    {this.state.count ? `${this.state.count} s` : '获取验证码'}
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
                    <Footer copyright={<div>Copyright <Icon type="copyright"/> 2017 大推手（成都）科技有限公司</div>}/>
                </div>
            </DocumentTitle>
        );
    }
}