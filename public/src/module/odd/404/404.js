import React from 'react';
import Odd from '../../../component/Odd';

export default class NotFound extends React.Component {
    render() {
        return (
            <Odd type="404" {...props}/>
        );
    }
}