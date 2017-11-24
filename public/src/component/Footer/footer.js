import React from 'react';
import classNames from 'classnames';
import styles from './footer.less';

export default ({className, links, copyright}) => {
    const clsString = classNames(styles.footer, className);
    return (
        <div className={clsString}>
            {
                links && (
                    <div className={styles.links}>
                        {links.map(link => (
                            <a
                                key={link.title}
                                target={link.blankTarget ? '_blank' : '_self'}
                                href={link.href}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                )
            }
            {copyright && <div className={styles.copyright}>{copyright}</div>}
        </div>
    );
};