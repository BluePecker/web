import React from 'react';
import {connect} from 'react-redux';

class Admin extends React.Component {

    render() {
        const {dispatch, state} = this.props;
        return (
            <div>
                <span>{state.username}</span>
                <button onClick={() => dispatch({type: 'change', username: 'Shuc324@gmail.com'})}>改变名字</button>
            </div>
        );
    }
}

export default connect((state) => {
    return {state: state.test};
})(Admin);
