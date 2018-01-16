import React from 'react';
import {Avatar, Row, Col, Card, Switch} from 'antd';

import styles from './index.less';
import Breadcrumb from '../../../../component/Breadcrumb';
import {WaterWave} from '../../../../component/Charts';

export default class Dashboard extends React.Component {

    onChange = checked => {
        console.log(checked);
    };

    render() {

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
                    <p>56</p>
                </div>
                <div className={styles.statItem}>
                    <p>异常水泵</p>
                    <p>4<span> / 56</span></p>
                </div>
                <div className={styles.statItem}>
                    <p>检修次数</p>
                    <p>2,223</p>
                </div>
            </div>
        );

        return (
            <Breadcrumb
                title="泵站控制台DEMO"
                content={content}
                extraContent={extraContent}
            >
                <Row gutter={24}>
                    <Col xl={6} lg={12} md={24} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="泵1" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <WaterWave
                                height={161}
                                title="流量"
                                percent={34}
                            />
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="泵2" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <WaterWave
                                height={161}
                                title="流量"
                                percent={34}
                            />
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="管理泵2" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <Switch size={'default'} defaultChecked onChange={this.onChange} checkedChildren="开" unCheckedChildren="关"/>
                        </Card>
                    </Col>
                </Row>
            </Breadcrumb>
        );
    }
}