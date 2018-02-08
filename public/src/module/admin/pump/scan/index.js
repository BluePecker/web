/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {Row, Col, Form, List, Card, Switch, Icon, InputNumber, Modal} from 'antd';

import Inject from '../../../inject';

import Breadcrumb from '../../../../component/Breadcrumb';

import ti1 from '../../../../assets/ti1.png';
import './style.less';

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
        const {state: {data: {common, area}, input}, inputHandle, submitHandle, switchHandle} = this.props;

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
                            Object.keys(common.metadata || {}).map((key) => {
                                const {id, comment, value, unit, ctrlType} = common['metadata'][key];
                                let context = (<span>{`${value.toFixed(3)}${unit}`}</span>);
                                switch (ctrlType.toLowerCase()) {
                                case 'switch':
                                    context = (
                                        <Switch
                                            size={'small'}
                                            checked={Boolean(value)}
                                            onChange={(value) => switchHandle(id, value)}
                                        />
                                    );
                                    break;
                                case 'number':
                                    context = (
                                        <a
                                            onClick={() => {
                                                Modal.confirm({
                                                    title     : `设置${comment}`,
                                                    content   : (
                                                        <div
                                                            style={{
                                                                textAlign: 'center',
                                                                padding  : '8px 0'
                                                            }}
                                                        >
                                                            <InputNumber
                                                                min={0}
                                                                value={input}
                                                                onChange={inputHandle}
                                                            />
                                                        </div>
                                                    ),
                                                    okText    : '确认',
                                                    cancelText: '取消',
                                                    onOk() {
                                                        submitHandle(id);
                                                    },
                                                    onCancel() {
                                                        inputHandle(0);
                                                    },
                                                });
                                            }}
                                        >{`${value.toFixed(3)}${unit}`}</a>);
                                    break;
                                }
                                return (
                                    <Col md={4} xs={24}>
                                        <Form.Item
                                            label={comment.substr(0, 8)}
                                            {...formLayout}
                                        >
                                            <span>
                                                {context}
                                            </span>
                                        </Form.Item>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Form>
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
                title="泵房总览-采菱家园2期"
                content={content}
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
                                        <img width={272} alt="logo" src={ti1}/>
                                    </Col>
                                    <Col span={16}>
                                        <List
                                            grid={{gutter: 8, xs: 2, sm: 2, md: 2, lg: 2, xl: 4, xxl: 6}}
                                            dataSource={Object.keys(item.metadata || {}).map(key => item.metadata[key])}
                                            renderItem={item => {
                                                let context = (<span>{`${item.value.toFixed(3)}${item.unit}`}</span>);
                                                switch (item['ctrlType'].toLowerCase()) {
                                                case 'switch':
                                                    context = (
                                                        <Switch
                                                            size={'small'}
                                                            checked={Boolean(item.value)}
                                                            onChange={(value) => switchHandle(item.id, value)}
                                                        />
                                                    );
                                                    break;
                                                case 'number':
                                                    context = (
                                                        <a
                                                            onClick={() => {
                                                                Modal.confirm({
                                                                    title     : `设置${item.comment}`,
                                                                    content   : (
                                                                        <div
                                                                            style={{
                                                                                textAlign: 'center',
                                                                                padding  : '8px 0'
                                                                            }}
                                                                        >
                                                                            <InputNumber
                                                                                min={0}
                                                                                value={input}
                                                                                onChange={inputHandle}
                                                                            />
                                                                        </div>
                                                                    ),
                                                                    okText    : '确认',
                                                                    cancelText: '取消',
                                                                    onOk() {
                                                                        submitHandle(item.id);
                                                                    },
                                                                    onCancel() {
                                                                        inputHandle(0);
                                                                    },
                                                                });
                                                            }}
                                                        >{`${item.value.toFixed(3)}${item.unit}`}</a>);
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