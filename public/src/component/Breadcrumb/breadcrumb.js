/**
 * @typedef {{Component:class,createElement:function}} React
 */
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Breadcrumb, Tabs} from 'antd';
import classNames from 'classnames';
import styles from './breadcrumb.less';

const {TabPane} = Tabs;

class PageHeader extends React.Component {

    //noinspection JSUnusedGlobalSymbols
    static contextTypes = {
        routes  : PropTypes.array,
        params  : PropTypes.object,
        location: PropTypes.object,
        nameMap : PropTypes.object,
    };

    onChange = (key) => {
        const {onTabChange} = this.props;
        onTabChange && onTabChange(key);
    };

    getBreadcrumbProps = () => {
        const {location, nameMap} = this.props;

        return {
            location: location || this.context.location,
            nameMap : nameMap || this.context.nameMap,
        };
    };

    render() {
        const {location: {pathname}, nameMap} = this.getBreadcrumbProps();
        const {
            title, logo, action, content, extraContent,
            tabList, className, tabActiveKey,
        } = this.props;
        const clsString = classNames(styles.pageHeader, className);
        let breadcrumb;
        if (pathname) {
            const snippets = pathname.split('/').filter(i => i);
            let route = '';
            const items = snippets.map(item => {
                route = `${route}/${item}`;
                const name = nameMap[route].name;
                return (
                    <Breadcrumb.Item key={route}>
                        {React.createElement((route !== pathname) ? Link : 'span', {to: route}, name)}
                    </Breadcrumb.Item>
                );
            });
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {[(
                        <Breadcrumb.Item key="home">
                            {React.createElement(Link, {to: '/'}, '首页')}
                        </Breadcrumb.Item>
                    )].concat(items)}
                </Breadcrumb>
            );
        }

        let tabDefaultValue;
        (tabActiveKey !== undefined && tabList) && (tabDefaultValue = tabList.filter(item => item.default)[0] || tabList[0]);
        const activeKeyProps = {
            defaultActiveKey: tabDefaultValue && tabDefaultValue.key,
        };
        (tabActiveKey !== undefined) && (activeKeyProps.activeKey = tabActiveKey);

        return (
            <div className={clsString}>
                {breadcrumb}
                <div className={styles.detail}>
                    {logo && <div className={styles.logo}>{logo}</div>}
                    <div className={styles.main}>
                        <div className={styles.row}>
                            {title && <h1 className={styles.title}>{title}</h1>}
                            {action && <div className={styles.action}>{action}</div>}
                        </div>
                        <div className={styles.row}>
                            {content && <div className={styles.content}>{content}</div>}
                            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                        </div>
                    </div>
                </div>
                {
                    tabList &&
                    tabList.length && (
                        <Tabs
                            className={styles.tabs}
                            {...activeKeyProps}
                            onChange={this.onChange}
                        >
                            {
                                tabList.map(item => <TabPane tab={item.tab} key={item.key}/>)
                            }
                        </Tabs>
                    )
                }
            </div>
        );
    }
}

export default ({children, wrapperClassName, top, ...restProps}) => (
    <div style={{margin: '-24px -24px 0'}} className={wrapperClassName}>
        {top}
        <PageHeader key="pageHeader" {...restProps} linkElement={Link}/>
        {children ? <div className={styles.content} style={{margin: '24px 24px 0 24px'}}>{children}</div> : null}
    </div>
);
