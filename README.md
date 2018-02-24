## Nodejs web框架
---

#### 项目概要

	本项目通过抽象数据层和UI交互层以达到快捷/高效/清晰开发的目的。
#### 项目结构

	├── bootstrap          项目启动目录，负责一些初始化工作同时启动api转发功能
	├── build              编译文件目录
	├── config             配置目录
	│   ├── development    开发环境配置
	│   ├── local          个人环境配置
	│   └── production     正式环境配置
	├── public
	│   └── src
	│       ├── assets     静态资源目录
	│       ├── component  组件
	│       │   ├── Slider
	│       │   └── ...
	│       ├── model      数据层
	│       │   ├── user   注: 数据层有作用域的概念。model/user/login的变量只在module/user/login 生效
	│       │   └── ...
	│       └── module     UI层
	│           ├── user
	│           └── ...
	├── runtime            日志
	│   └── logs
	└── utils              常用工具函数

> a. 数据模型 public/src/model/user/login/index.js

示例代码:

```
// import fetch from '../../fetch';
//noinspection JSUnusedGlobalSymbols
export default (state, dispatch) => {
    class Reducer {
        defaultState = {
            metadata : [],
            username : {
                status : '',
                value  : '',
                message: '',
            },
            password : {
                status : '',
                value  : '',
                message: '',
            },
            autoLogin: true,
            mobile   : {
                status : '',
                value  : '',
                message: '',
            },
            captcha  : {
                status : '',
                value  : '',
                message: '',
            },
            // 获取验证码倒计时
            count    : 0,
            loginType: 'account',
            loading  : false,
        };

        //noinspection JSUnusedGlobalSymbols
        username = (state, payload) => {
            const {username} = payload;
            return Object.assign({}, state, {
                username: {
                    status : '',
                    value  : username,
                    message: ''
                },
            });
        };

        //noinspection JSUnusedGlobalSymbols
        password = (state, payload) => {
            return Object.assign({}, state, {
                password: {
                    value: payload.password,
                },
            });
        };

        //noinspection JSUnusedGlobalSymbols
        autoComplete = (state, payload) => {
            const {username} = payload;
            return Object.assign({}, state, {
                username: {
                    status : '',
                    value  : username,
                    message: ''
                },
                metadata: payload.metadata,
            });
        };

        //noinspection JSUnusedGlobalSymbols
        autoLogin = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        mobile = (state, payload) => {
            const {mobile} = payload;
            if (mobile === '') {
                payload['mobile'] = {
                    status : '',
                    value  : payload.mobile,
                    message: '',
                };
            } else {
                let reg, match = mobile;
                switch (mobile.length) {
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

                if (mobile.length === 11 && reg.test(match)) {
                    payload['mobile'] = {
                        status : 'success',
                        value  : payload.mobile,
                        message: '',
                    };
                } else {
                    payload['mobile'] = reg.test(match) ? {
                        status : '',
                        value  : payload.mobile,
                        message: '',
                    } : {
                        status : 'error',
                        value  : payload.mobile,
                        message: '手机号格式错误',
                    };
                }
            }
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        captcha = (state, payload) => {
            const {captcha} = payload;
            if (captcha.length === 6) {
                payload['captcha'] = /^\d{6}$/.test(captcha) ? {
                    status : 'success',
                    value  : captcha,
                    message: '',
                } : {
                    status : 'error',
                    value  : captcha,
                    message: '六位纯数字验证码',
                };
            } else {
                payload['captcha'] = captcha.length && !/^\d+$/.test(captcha) ? {
                    status : 'error',
                    value  : captcha,
                    message: '六位纯数字验证码',
                } : {
                    status : '',
                    value  : captcha,
                    message: '',
                };
            }
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        decrease = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        tableSwitch = (state, payload) => {
            return Object.assign({}, state, payload);
        };

        //noinspection JSUnusedGlobalSymbols
        loading = (state, payload) => {
            return Object.assign({}, state, payload);
        };
    }

    class Dispatch {
        //noinspection JSUnusedGlobalSymbols
        tableOnChange = (key) => {
            dispatch('tableSwitch', {loginType: key});
        };

        //noinspection JSUnusedGlobalSymbols
        usernameOnChange = (value) => {
            dispatch('autoComplete', {
                username: value,
                metadata: !value || value.indexOf('@') >= 0 ? [] : /\d/g.test(value) ? [
                    `${value}@qq.com`,
                    `${value}@gmail.com`,
                    `${value}@163.com`,
                ] : [
                    `${value}@gmail.com`,
                    `${value}@163.com`,
                ],
            });
        };

        //noinspection JSUnusedGlobalSymbols
        usernameOnSelect = (value) => {
            dispatch('username', {username: value});
        };

        //noinspection JSUnusedGlobalSymbols
        passwordOnChange = (e) => {
            dispatch('password', {password: e.target.value});
        };

        //noinspection JSUnusedGlobalSymbols
        mobileOnChange = (e) => {
            dispatch('mobile', {mobile: e.target.value});
        };

        //noinspection JSUnusedGlobalSymbols
        autoLoginOnChange = (e) => {
            dispatch('autoLogin', {autoLogin: e.target.checked});
        };

        //noinspection JSUnusedGlobalSymbols
        onGetCaptcha = () => {
            let count = 60;
            dispatch('decrease', {count});
            this.interval = setInterval(() => {
                if (--count === 0) {
                    clearInterval(this.interval);
                    dispatch('decrease', {count: 0});
                } else {
                    dispatch('decrease', {count});
                }
            }, 1000);
        };

        //noinspection JSUnusedGlobalSymbols
        login = () => {
            // fetch('logic', Object.assign(state, {
            //     resource: 'user/login'
            // })).then(res => console.log(res)).catch(err => console.log(err));
            dispatch('loading', {loading: true});
        };
    }

    return {Reducer: Reducer, Dispatch: Dispatch};
};
```

> b. UI层结构 public/src/module/user/login/index.js

示例代码:

```
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
            state: {loading, metadata, username, password, mobile, autoLogin, captcha, count, loginType},
            tableOnChange, usernameOnChange, usernameOnSelect, passwordOnChange, mobileOnChange, autoLoginOnChange, captchaOnChange, onGetCaptcha, login
        } = this.props;

        const table = (
            <Tabs className={styles.tabs} activeKey={loginType} onChange={tableOnChange}>
                <Tabs.TabPane key="account" tab="账号登录">
                    <Form.Item>
                        <Input.Group compact>
                            <AutoComplete
                                dataSource={metadata}
                                onChange={usernameOnChange}
                                onSelect={usernameOnSelect}
                                style={{width: '100%'}}
                            >
                                <Input
                                    value={username.value}
                                    placeholder="11位手机号或邮箱"
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
                            placeholder="11位手机号码"
                            maxLength="11"
                            prefix={<Icon type="mobile" className={styles.inputIcon}/>}
                            value={mobile.value}
                            onChange={mobileOnChange}
                        />
                    </Form.Item>
                    <Row gutter={8}>
                        <Col span={14}>
                            <Form.Item
                                hasFeedback={captcha.status}
                                validateStatus={captcha.status}
                                help={captcha.message}
                                style={{textAlign: 'left'}}
                            >
                                <Input
                                    placeholder="短信验证码"
                                    maxLength="6"
                                    prefix={<Icon type="mail" className={styles.inputIcon}/>}
                                    value={captcha.value}
                                    onChange={captchaOnChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item>
                                <Button
                                    disabled={count}
                                    className={styles.captcha}
                                    onClick={onGetCaptcha}
                                >
                                    {!count ? '获取验证码' : `${('0' + count).substr(-2)}s`}
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
                                <span className={styles.title}>供水管理后台</span>
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
                                <Button
                                    size="large"
                                    className={styles.submit}
                                    type="primary"
                                    loading={loading}
                                    onClick={login}
                                >
                                    {loading ? '登录中...' : '登录'}
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
```

> c. UI层样式 public/src/module/user/login/style.less

示例代码:

```
@import "~antd/lib/style/themes/default.less";

.container {
  background: #f0f2f5 no-repeat center url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  width: 100%;
  min-height: 100%;
  background-size: 100%;
  padding: 110px 0 144px 0;
  position: relative;
  .top {
    text-align: center;
    .name {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
        .logoImg {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @heading-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
    }
    .desc {
      font-size: @font-size-base;
      color: @text-color-secondary;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .main {
    width: 236px;
    margin: 0 auto;
    text-align: center;
    .tabs {
      padding: 0 2px;
      margin: 0 -2px;
      :global {
        .has-error:hover .ant-input:not(.ant-input-disabled) {
          border-color: #f04134;
        }
        .ant-row {
          height: 32px;
        }
        .ant-tabs .ant-tabs-bar {
          border-bottom: 0;
          margin-bottom: 24px;
          text-align: center;
          .ant-form-item {
            margin-bottom: 24px;
            .ant-form-explain {
              position: absolute;
            }
          }
        }
      }
      .captcha {
        display: block;
        width: 100%;
        margin-top: 4px;
        padding: 0 8px 0 8px;
      }
      .ant-tabs-tab {
        margin: 0 8px 0 8px
      }
    }

    .inputIcon {
      font-size: @font-size-base;
      color: @disabled-color;
    }

    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color .3s;

      &:hover {
        color: @primary-color;
      }
    }

    .other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .register {
        float: right;
      }
    }

    .additional {
      text-align: left;

      .forgot {
        float: right;
      }

      .submit {
        width: 100%;
        margin-top: 24px;
      }

      :global {
        .ant-form-item-control {
          line-height: 22px;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%
  }
}
```

> d. 组件 public/src/component/Slider

略