import React from 'react';
import DocumentTitle from 'react-document-title';

import Inject from '../inject';

class Admin extends React.Component {

    getPageTitle(menu = {

    }) {
        const {location} = this.props;
        const {pathname} = {location};
        let item = Object.assign({}, menu);
        pathname.split('/').substr(0, 2).forEach(name => {
            item = item[name] ? item[name] : {};
        });


        console.log(pathname);
        return '管理后台';
    }

    render() {
        const {dispatch, state} = this.props;

        return (
            <DocumentTitle title={this.getPageTitle(state.menu || {})}>
                <div>
                    <span>{state.username}</span>
                    <button onClick={() => dispatch('change', {username: 'Shuc324@gmail.com'})}>改变名字</button>
                </div>
            </DocumentTitle>
        );
    }
}

export default Inject({namespace: 'admin', component: Admin});
