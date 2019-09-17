import React from 'react';

import styles from './Layout.module.css'

import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className={styles.content}>{props.children}</main>
    </Aux>
);

export default layout;