import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../../component/Header';

import styles from './auth.less';

export default ({...restProps}) => (
    <div>
        <Header {...restProps} linkElement={Link}/>
        <div className={styles.content} style={{'height': '100%', background: '#fff'}}>
            Auth
        </div>
    </div>
);