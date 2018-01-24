/**
 * @typedef {{Component:class}} React
 */
import React from 'react';
import {connect} from 'react-redux';
import store from '../model';

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
    }, (dispatch) => {
        const {namespace} = setting;
        const method = (action, metadata, global = false) => {
            dispatch({
                type: global ? action : [namespace, action].join('/'),
                ...metadata
            });
        };

        let actions = {}, model = require(`../model/${namespace}/`).default;
        model = new (model(store.getState()[namespace], method).Dispatch);

        Object.keys(model).forEach(key => {
            actions[key] = new Proxy(model[key], {
                apply(target, ctx, args) {
                    return Reflect.apply(target, ctx, args);
                }
            });
        });

        //noinspection JSUnusedGlobalSymbols
        return {dispatch: method, ...actions};
    })(Container);
};