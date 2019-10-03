import React, {Component} from 'react';
import styles from './Layout.module.css'

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/NavigationItems/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/NavigationItems/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleHandler = () => {
        // !!!!!
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}})
    };

    render () {
        return (
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer close={this.sideDrawerClosedHandler}
                            open={this.state.showSideDrawer}/>
                <main className={styles.content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;