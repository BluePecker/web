import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Breadcrumb, Tabs, Icon} from 'antd';

import styles from './header.less';

function getBreadcrumbName(breadcrumbs, url) {
    let name = '';
    Object.keys(breadcrumbs).forEach((item) => {
        const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
        const itemRegExp = new RegExp(itemRegExpStr);
        if (itemRegExp.test(url)) {
            name = breadcrumbs[item];
        }
    });
    return name;
}

export default class Container extends React.PureComponent {

    //noinspection JSUnusedGlobalSymbols
    static contextTypes = {
        location   : PropTypes.object,
        routes     : PropTypes.array,
        params     : PropTypes.object,
        breadcrumbs: PropTypes.object,
    };

    itemRender = (route, params, routes, paths) => {
        const {link = 'a'} = this.props;
        const last = route.indexOf(route) === routes.length - 1;
        /**
         * @typedef {{breadcrumbName: string}} route
         */
        return (last || !route.component) ? <span>{route.breadcrumbName}</span>
            : React.createElement(link, {
                to  : paths.join('/') || '/',
                href: paths.join('/') || '/',
            }, route.breadcrumbName);
    };

    onChange = (key) => {
        const {onTabChange} = this.props;
        onTabChange && onTabChange(key);
    };

    getBreadcrumbProps = () => {
        const {routes, params, location, breadcrumbs} = this.props;
        return {
            breadcrumbs: breadcrumbs || this.context.breadcrumbs,
            routes     : routes || this.context.routes,
            params     : params || this.context.params,
            location   : location || this.context.location,
        };
    };

    render() {
        const {routes, params, location, breadcrumbs} = this.getBreadcrumbProps();
        const {
            breadcrumbList, tabList, className, linkElement = 'a',
        } = this.props;
        const clsString = classNames(styles.header, className);
        let breadcrumb;
        if (routes && params) {
            breadcrumb = (
                <Breadcrumb
                    className={styles.breadcrumb}
                    routes={routes.filter(route => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender}
                />
            );
        } else if (location && location.pathname) {
            const pathSnippets = location.pathname.split('/').filter(i => i);
            const extraBreadcrumbItems = pathSnippets.map((_, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                return (
                    <Breadcrumb.Item key={url}>
                        {React.createElement(
                            (index === pathSnippets.length - 1) || index < 1 ? 'span' : linkElement,
                            {[linkElement === 'a' ? 'href' : 'to']: url},
                            breadcrumbs[url] ||
                            breadcrumbs[url.replace('/', '')] ||
                            getBreadcrumbName(breadcrumbs, url) ||
                            url
                        )}
                    </Breadcrumb.Item>
                );
            });

            const breadcrumbItems = [(
                <Breadcrumb.Item key="home">
                    {React.createElement(location.pathname === '/' ? 'span' : linkElement, {
                        [linkElement === 'a' ? 'href' : 'to']: '/',
                    }, <Icon type="home"/>)}
                </Breadcrumb.Item>
            )].concat(extraBreadcrumbItems);
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {breadcrumbItems}
                </Breadcrumb>
            );
        } else if (breadcrumbList && breadcrumbList.length) {
            breadcrumb = (
                <Breadcrumb className={styles.breadcrumb}>
                    {
                        breadcrumbList.map(item => (
                            <Breadcrumb.Item key={item.title}>
                                {item.href ? (
                                    React.createElement(linkElement, {
                                        [linkElement === 'a' ? 'href' : 'to']: item.href,
                                    }, item.title)
                                ) : item.title}
                            </Breadcrumb.Item>)
                        )
                    }
                </Breadcrumb>
            );
        } else {
            breadcrumb = null;
        }

        const tabDefaultValue = tabList && (tabList.filter(item => item.default)[0] || tabList[0]);

        return (
            <div className={clsString}>
                {breadcrumb}
                {
                    tabList &&
                    tabList.length &&
                    <Tabs
                        className={styles.tabs}
                        defaultActiveKey={(tabDefaultValue && tabDefaultValue.key)}
                        onChange={this.onChange}
                    >
                        {tabList.map(item => <Tabs tab={item.tab} key={item.key}/>)}
                    </Tabs>
                }
            </div>
        );
    }
}