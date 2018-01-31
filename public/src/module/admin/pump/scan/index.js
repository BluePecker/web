/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Row, Col, Form, List, Card, Switch} from 'antd';

import Inject from '../../../inject';

import Breadcrumb from '../../../../component/Breadcrumb';

import styles from './style.less';

class Scan extends React.Component {

    render() {
        const formLayout = {
            labelCol  : {
                xs: {span: 24},
                sm: {span: 12},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };

        const content = (
            <div>
                <Form>
                    <Row gutter={8}>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'1#水箱液位'}
                                {...formLayout}
                            >
                                <span>1.52m</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'浊度'}
                                {...formLayout}
                            >
                                <span>0.597NTU</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'温度'}
                                {...formLayout}
                            >
                                <span>30˚C</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'BC电压'}
                                {...formLayout}
                            >
                                <span>384V</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'2#水箱液位'}
                                {...formLayout}
                            >
                                <span>1.55m</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'余氯'}
                                {...formLayout}
                            >
                                <span>0.07mg/L</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'相对湿度'}
                                {...formLayout}
                            >
                                <span>51%</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'CA电压'}
                                {...formLayout}
                            >
                                <span>385V</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            {/*<Form.Item*/}
                            {/*label={'3#水箱液位'}*/}
                            {/*{...formLayout}*/}
                            {/*>*/}
                            {/*<span>1.52m</span>*/}
                            {/*</Form.Item>*/}
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'UV光强'}
                                {...formLayout}
                            >
                                <span>0W/cm³</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'电能'}
                                {...formLayout}
                            >
                                <span>15328kw/h</span>
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item
                                label={'AB电压'}
                                {...formLayout}
                            >
                                <span>389V</span>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );

        const extraContent = (
            <div className={styles.extraImg}>
                <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
            </div>
        );

        const list = [
            {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            }, {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            }, {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            }, {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            }, {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            }, {
                // 瞬时流量
                mf: 1.58,
                // 累计流量
                af: 34215,
                // 出水压力
                op: 0.61,
                // 设定压力
                sp: 0.60,
            },
        ];

        return (
            <Breadcrumb
                title="泵房总览-紫金城北区"
                content={content}
                extraContent={extraContent}
            >
                <List
                    grid={{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}}
                    dataSource={list}
                    renderItem={(item, num) => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                                }

                                actions={[
                                    <Form style={{padding: '0 8px'}}>
                                        <Row gutter={8}>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'1#水泵'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'照明'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'水箱'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'消毒'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'2#水泵'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'照明'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'水箱'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'消毒'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'3#水泵'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'照明'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'水箱'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} xs={24}>
                                                <Form.Item
                                                    label={'消毒'}
                                                    {...formLayout}
                                                >
                                                    <Switch defaultChecked size="small"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                ]}
                            >
                                <Card.Meta
                                    title={`${['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'][num + 1]}区设备`}
                                    description={
                                        <div>
                                            <Form>
                                                <Row gutter={8}>
                                                    <Col md={12} xs={24}>
                                                        <Form.Item
                                                            label={'瞬间流量'}
                                                            {...formLayout}
                                                        >
                                                            <span>{item.mf}m³/h</span>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <Form.Item
                                                            label={'出水压力'}
                                                            {...formLayout}
                                                        >
                                                            <span>{item.op}Mpa</span>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <Form.Item
                                                            label={'累计流量'}
                                                            {...formLayout}
                                                        >
                                                            <span>{item.af}m³</span>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        <Form.Item
                                                            label={'压力设定'}
                                                            {...formLayout}
                                                        >
                                                            <span>{item.sp}Mpa</span>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Breadcrumb>
        );
    }
}

//noinspection JSUnusedGlobalSymbols
export default Inject({namespace: 'admin/pump/scan', component: Scan});