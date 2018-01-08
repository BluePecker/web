import React from 'react';
import {Table, Form, Col, Input, Cascader, DatePicker} from 'antd';
import {Link} from 'react-router-dom';
import Header from '../../../component/Header';
import SearchForm from '../../../component/SearchForm';

import styles from './account.less';

const columns = [{
    title    : 'No.',
    dataIndex: 'no',
    key      : 'no',
    width    : 40,
    fixed    : 'left',
}, {
    title    : '昵称',
    dataIndex: 'name',
    key      : 'name',
    width    : 100,
}, {
    title    : '年龄',
    dataIndex: 'age',
    key      : 'age',
    width    : 50,
}, {
    title    : 'Street',
    dataIndex: 'street',
    key      : 'street',
    width    : 100,
}, {
    title    : '权限',
    dataIndex: 'building',
    key      : 'building',
    width    : 50,
}, {
    title    : 'Door No.',
    dataIndex: 'number',
    key      : 'number',
    width    : 50,
}, {
    title    : 'Company Address',
    dataIndex: 'companyAddress',
    key      : 'companyAddress',
    width    : 50,
}, {
    title    : 'Company Name',
    dataIndex: 'companyName',
    key      : 'companyName',
    width    : 50,
}, {
    title    : '操作',
    dataIndex: 'gender',
    key      : 'gender',
    width    : 60,
    fixed    : 'right',
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        no            : i,
        key           : i,
        name          : 'John Brown',
        age           : i + 1,
        street        : '管理员',
        building      : 'C',
        number        : 2035,
        companyAddress: 'Lake Street 42',
        companyName   : 'SoftLake Co',
        gender        : 'M',
    });
}

const options = [{
    value   : 'zhejiang',
    label   : 'Zhejiang',
    children: [{
        value   : 'hangzhou',
        label   : 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }, {
            value   : 'xiasha',
            label   : 'Xia Sha',
            disabled: true,
        }],
    }],
}, {
    value   : 'jiangsu',
    label   : 'Jiangsu',
    children: [{
        value   : 'nanjing',
        label   : 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
        }],
    }],
}];


class AdvancedSearchForm extends SearchForm {
    // To generate mock Form.Item
    getFields() {
        const {getFieldDecorator} = this.props.form;
        return [
            <Col span={8} key={'username'} style={{'block': 'none'}}>
                <Form.Item label={`用户名`}>
                    {getFieldDecorator(`用户名`)(
                        <Input placeholder="用户名"/>
                    )}
                </Form.Item>
            </Col>,
            <Col span={8} key={'role'} style={{'block': 'none'}}>
                <Form.Item label={`身份`}>
                    {getFieldDecorator(`身份`)(
                        <Cascader options={options} placeholder="请选择身份" showSearch/>
                    )}
                </Form.Item>
            </Col>,
            <Col span={8} key={'datetime'} style={{'block': 'none'}}>
                <Form.Item label={`创建日期`}>
                    {getFieldDecorator(`创建日期`)(
                        <DatePicker/>
                    )}
                </Form.Item>
            </Col>
        ];
    }
}

const Search = Form.create()(AdvancedSearchForm);

export default class Account extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <div>
                <Header {...this.props} linkElement={Link}/>
                <div className={styles.content}>
                    <div style={{padding: '18px 0'}}>
                        <Search/>
                        {/*<Cascader*/}
                        {/*options={options}*/}
                        {/*placeholder="Please select"*/}
                        {/*showSearch*/}
                        {/*size="large"*/}
                        {/*/>*/}
                        {/*<Input size="large" placeholder="large size"/>*/}
                        {/*<Input size="large" placeholder="large size"/>*/}
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered={false}
                        size="middle"
                        scroll={{x: '130%', y: 640}}
                        pagination={{defaultCurrent: 1, total: 500, showQuickJumper: true}}
                    />
                </div>
            </div>
        );
    }
}