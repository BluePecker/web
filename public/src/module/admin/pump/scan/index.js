/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Row, Col, Form} from 'antd';

import Inject from '../../../inject';

import Breadcrumb from '../../../../component/Breadcrumb';

import styles from './style.less';

class Scan extends React.Component {

    render() {
        const formLayout = {
            labelCol: {
                xs: { span: 24 },
                xs: { span: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                xs: { span: 12 },
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
                                <span>0W/cm^3</span>
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


        return (
            <Breadcrumb
                title="泵房总览-紫金城北区"
                content={content}
                extraContent={extraContent}
            >
            </Breadcrumb>
        );
    }
}

//noinspection JSUnusedGlobalSymbols
export default Inject({namespace: 'admin/pump/scan', component: Scan});