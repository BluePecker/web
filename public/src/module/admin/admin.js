import React from 'react';

import Inject from '../inject';

class Admin extends React.Component {

    render() {
        const {dispatch, state} = this.props;
        return (
            <div>
                <span>{state.username}</span>
                <button onClick={() => dispatch('change', {username: 'Shuc324@gmail.com'})}>改变名字</button>
            </div>
        );
    }
}

export default Inject({namespace: 'admin', component: Admin});
