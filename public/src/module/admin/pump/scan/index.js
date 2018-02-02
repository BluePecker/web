/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Row, Col, Form, List, Card, Switch, Icon, InputNumber} from 'antd';

import Inject from '../../../inject';

import Breadcrumb from '../../../../component/Breadcrumb';

import styles from './style.less';

class Scan extends React.Component {

    componentDidMount() {
        const {beginSync} = this.props;
        beginSync();
    }

    componentWillUnmount() {
        const {stopSync} = this.props;
        stopSync();
    }

    render() {
        const {state: {data: {common, area}}} = this.props;

        const formLayout = {
            labelCol  : {
                xs: {span: 4},
                sm: {span: 16},
            },
            wrapperCol: {
                xs: {span: 4},
                sm: {span: 6},
            },
        };

        const content = (
            <div>
                <Form>
                    <Row>
                        {
                            Object.keys(common.metadata || {}).map((key, index) => {
                                const {comment, value, unit} = common['metadata'][key];
                                return (
                                    <Col md={6} xs={24} style={{display: index >= 12 ? 'none' : 'block'}}>
                                        <Form.Item
                                            label={comment.substr(0, 8)}
                                            {...formLayout}
                                        >
                                            <span>
                                                {`${value}${unit}`}
                                            </span>
                                        </Form.Item>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Form>
                <div style={{width: '100%', height: 18, textAlign: 'center'}}>
                    <Icon type="down" style={{color: '#b2b2b3'}}/>
                </div>
            </div>
        );

        const extraContent = (
            <div className={styles.extraImg}>
                <img alt='' src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
            </div>
        );

        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );

        return (
            <Breadcrumb
                title="泵房总览-紫金城北区"
                content={content}
                extraContent={extraContent}
            >
                <Card
                    style={{marginTop: 24}}
                    bordered={false}
                    bodyStyle={{padding: '8px 32px 32px 32px'}}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={area}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <IconText type="clock-circle-o" text={item['updateTime'].toString().replace(/(T)|(\.000Z)/g, ' ')}/>
                                ]}
                            >
                                <List.Item.Meta
                                    title={`${item.area}设备`}
                                />
                                <Row gutter={8}>
                                    <Col span={8}>
                                        <img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
                                    </Col>
                                    <Col span={16}>
                                        <List
                                            grid={{gutter: 8, xs: 2, sm: 2, md: 2, lg: 2, xl: 4, xxl: 6}}
                                            dataSource={Object.keys(item.metadata || {}).map(key => item.metadata[key])}
                                            renderItem={item => {
                                                let context = (<span>{`${item.value}${item.unit}`}</span>);
                                                switch (item['ctrlType'].toLowerCase()) {
                                                case 'switch':
                                                    context = (
                                                        <Switch
                                                            size={'small'}
                                                            checked={Boolean(item.value)}
                                                            id={item.id}
                                                            onChange={function (e) {
                                                                console.log(e, this);
                                                            }}
                                                        />
                                                    );
                                                    break;
                                                case 'number':
                                                    context = (
                                                        <InputNumber
                                                            min={0}
                                                            step={0.001}
                                                            size={'small'}
                                                            value={item.value}
                                                            id={item.id}
                                                        />
                                                    );
                                                    break;
                                                }
                                                return (
                                                    <List.Item>
                                                        <Form.Item
                                                            label={item.comment}
                                                            {...formLayout}
                                                        >
                                                            {context}
                                                        </Form.Item>
                                                    </List.Item>
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Card>
            </Breadcrumb>
        );
    }
}

//noinspection JSUnusedGlobalSymbols
export default Inject({namespace: 'admin/pump/scan', component: Scan});