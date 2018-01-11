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
        return Object.assign({}, {props}, {
            state: setting.namespace ? state[setting.namespace] : state
        });
    }, dispatch => {
        //noinspection JSUnusedGlobalSymbols
        return {
            dispatch: (action, payload, global = false) => {
                dispatch({
                    type: global ? action : [setting.namespace, action].join('/'),
                    ...payload
                });
            },
        };
    })(Container);
};