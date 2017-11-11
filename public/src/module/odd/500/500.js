import React from 'react';
import Odd from '../../../component/Odd';

export default class Error extends React.Component {
    render() {
        return (
            <Odd type="500" {...props}/>
        );
    }
}