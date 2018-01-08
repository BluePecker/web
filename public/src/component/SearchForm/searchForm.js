import React from 'react';
import {Form, Row, Col, Input, Button, Icon} from 'antd';

import styles from './searchForm.less';

const FormItem = Form.Item;

export default class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    };

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`)(
                            <Input placeholder="placeholder"/>
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        return (
            <Form className={styles.antAdvancedSearchForm} onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" icon="search" htmlType="submit">查询</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                        <Button style={{marginLeft: 8,border : 0,background: '#fbfbfb'}} shape="circle" type="dashed" onClick={this.toggle}>
                            <Icon type={this.state.expand ? 'up' : 'down'}/>
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}