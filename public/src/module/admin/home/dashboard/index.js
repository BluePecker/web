import React from 'react';
import {Avatar, Row, Col, Card, Switch, InputNumber, Badge, Form, Popover} from 'antd';

import styles from './index.less';
import Breadcrumb from '../../../../component/Breadcrumb';
import {WaterWave} from '../../../../component/Charts';

import Inject from '../../../inject';
import map from '../../../../assets/map.png';

class Dashboard extends React.Component {

    onSwitch = checked => {
        const {dispatch} = this.props;
        dispatch('status', {status: checked});
    };

    onNum1 = num => {
        const {dispatch} = this.props;
        dispatch('num1', {num1: num});
    };

    onNum2 = num => {
        const {dispatch} = this.props;
        dispatch('num2', {num2: num});
    };

    onNum3 = num => {
        const {dispatch} = this.props;
        dispatch('num3', {num3: num});
    };

    onNum4 = num => {
        const {dispatch} = this.props;
        dispatch('num4', {num4: num});
    };

    onFlow1 = num => {
        const {dispatch} = this.props;
        dispatch('flow1', {flow1: num});
    };

    onFlow2 = num => {
        const {dispatch} = this.props;
        dispatch('flow2', {flow2: num});
    };

    render() {
        const {state: {num1, num2, num3, num4, status, flow1, flow2}} = this.props;

        const content = (
            <div className={styles.pageHeaderContent}>
                <div className={styles.avatar}>
                    <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                </div>
                <div className={styles.describe}>
                    <div className={styles.contentTitle}>早安shuc324，祝你开心每一天！</div>
                    <div>数据管理员 | 泵站－技术部</div>
                </div>
            </div>
        );

        const extraContent = (
            <div className={styles.extraContent}>
                <div className={styles.statItem}>
                    <p>水泵总数</p>
                    <p>{num2}</p>
                </div>
                <div className={styles.statItem}>
                    <p>异常水泵</p>
                    <p>{num3}<span> / {num2}</span></p>
                </div>
                <div className={styles.statItem}>
                    <p>检修次数</p>
                    <p>{num4}</p>
                </div>
            </div>
        );

        const formItemLayout = {
            labelCol  : {
                xs: {span: 16},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 32},
                sm: {span: 16},
            },
        };

        const pItem = {
            labelCol  : {
                xs: {span: 24},
                sm: {span: 12},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
            style     : {
                marginBottom: 0
            },
        };

        const popover = (
            <Form>
                <Form.Item
                    {...pItem}
                    label={'瞬时流量:'}
                >
                    <span>{flow1}</span>
                </Form.Item>
                <Form.Item
                    {...pItem}
                    label={'本日流量:'}
                >
                    <span>{flow2}</span>
                </Form.Item>
            </Form>
        );

        return (
            <Breadcrumb
                title="泵站控制台DEMO"
                content={content}
                extraContent={extraContent}
            >
                <Row gutter={24}>
                    <Col xl={12} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="水泵分布" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <Popover content={popover} title="1号泵信息" trigger="hover">
                                <div
                                    style={{
                                        position: 'relative',
                                        zIndex  : 1000,
                                        top     : 160,
                                        display : 'inherit',
                                    }}
                                >
                                    <Badge status={status ? 'processing' : 'error'} text="1#"/>
                                </div>
                            </Popover>
                            <Badge status={'processing'} text="2#" style={{
                                position: 'relative',
                                zIndex  : 1000,
                                top     : 220,
                                left    : 55,
                                display : 'inherit',
                            }}
                            />
                            <img style={{
                                display  : 'inline-block',
                                maxWidth : '100%',
                                maxHeight: 387,
                                marginTop: -50,
                            }} src={map} alt="map"
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="设置1#" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <Form>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'瞬时流量'}
                                >
                                    <InputNumber min={0} defaultValue={flow1} onChange={this.onFlow1}/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'本日流量'}
                                >
                                    <InputNumber min={0} defaultValue={flow2} onChange={this.onFlow2}/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'状态开关'}
                                >
                                    <Switch size={'default'} defaultChecked={status} onChange={this.onSwitch}/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'水泵总数'}
                                >
                                    <InputNumber min={0} defaultValue={num2} onChange={this.onNum2}/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'异常水泵数'}
                                >
                                    <InputNumber min={0} defaultValue={num3} onChange={this.onNum3}/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={'检修次数'}
                                >
                                    <InputNumber min={0} defaultValue={num4} onChange={this.onNum4}/>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="泵流量" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <WaterWave
                                height={161}
                                title="流量"
                                color="#1890FF"
                                percent={num1}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="管理泵" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <Row style={{margin: '65px 0'}}>
                                <InputNumber min={1} max={100} defaultValue={num1} onChange={this.onNum1}/>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Breadcrumb>
        );
    }
}

export default Inject({namespace: 'admin_home_dashboard', component: Dashboard});