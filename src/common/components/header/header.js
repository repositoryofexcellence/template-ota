import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Grid, Row, Col} from 'react-styled-flexboxgrid';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {Link} from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,

    },
    appBar:{
        boxShadow:"none"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        display:'none'
    },
    list: {
        width: 250,
    },
};


class Header extends React.Component {
    state = {
        left: false,

    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>hey</List>
                <Divider/>
                <List>hey</List>
            </div>
        );

        return (
            <div>
                <div className={classes.root}>
                    <AppBar className={classes.appBar} position="static" color="inherit">
                       <Grid>
                           <Row>
                               <Col md={12}>
                            <Toolbar >
                                <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton}
                                            color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                <Typography className="logo" variant="title" color="inherit">
                                    <Link to="/">
                                    <div className="logo-one">Demiroğlu</div>
                                    <div className="logo-two">Reisen</div>
                                    </Link>
                                </Typography>
                            </Toolbar>
                               </Col>
                           </Row>
                    </Grid>

                    </AppBar>
                </div>

                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
