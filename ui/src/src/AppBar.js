import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
  bar: {
    marginBottom: '1em'
  }
});

const NavBar = (props) => {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          UTokyoWiFiスピードテスト
      </Toolbar>
      </AppBar>
  );
}

export default NavBar;
