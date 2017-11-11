import React from 'react';
import Odd from '../../../component/Odd';

export default class Forbidden extends React.Component {
    render() {
        return (
            <Odd type="403" {...props}/>
        );
    }
}