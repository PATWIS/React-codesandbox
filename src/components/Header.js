import React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  },

  title: {
    // marginRight: 25
    flex: 1
  },

  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  }
});

class Header extends React.Component {
  loginHandler = () => {
    this.props.loginHandler();
  };

  render() {
    const { classes, login } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              <Link to="/" className={classes.link}>
                App Example
              </Link>
            </Typography>
            <Button onClick={this.loginHandler.bind(this)} color="inherit">
              {login ? "Logout" : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
