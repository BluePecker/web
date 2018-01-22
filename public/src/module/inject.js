/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {connect} from 'react-redux';

export default (config = {}) => {
    let setting = {
        namespace: '',
        component: <div/>,
    };

    Object.keys(config).forEach(key => {
        setting[key] = config[key];
    });

    class Container extends React.Component {

        render() {
            return <this.props.setting.component {...this.props}/>;
        }

        // todo 添加一些勾子 componentDidMount...
    }

    Container.defaultProps = {setting};

    return connect((state, props) => {
        const {namespace} = setting;

        return Object.assign({}, {props}, {
            state: namespace ? state[namespace] : state
        });
    }, dispatch => {
        const {namespace} = setting;
        const method = (action, payload, global = false) => {
            dispatch({
                type: global ? action : [namespace, action].join('/'),
                ...payload
            });
        };

        let actions = require(`../model/${namespace}/action.js`);

        Object.keys(actions).forEach(key => {
            actions[key] = new Proxy(actions[key], {
                apply(target, ctx, args) {
                    return Reflect.apply(target, ctx, args.concat([method]));
                }
            });
        });

        //noinspection JSUnusedGlobalSymbols
        return {dispatch: method, ...actions};
    })(Container);
};