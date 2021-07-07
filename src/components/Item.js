import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import Switch from "material-ui/Switch";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Menu, { MenuItem } from "material-ui/Menu";

const styles = theme => ({
  root: {
    flex: 1
  },
  flex: {
    flex: 1
  },
  button: {
    width: 100,
    marginTop: 15
  },
  toolbar: {
    padding: 0
  },
  paper: {
    minHeight: 150,
    marginTop: 20,
    padding: 10
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  }
});

class Item extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  _handleDelete(data) {
    this.props._handleDelete(data);
  }

  goToEdit = () => {
    const { data, history } = this.props;
    history.push(`/item/${data.id}`)
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, data, login } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {data.name}
          </Typography>
          {login && (
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.goToEdit}>Edit</MenuItem>
                <MenuItem onClick={this._handleDelete.bind(this, data)}>
                  Delete
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>

        <Typography variant="subheading" gutterBottom>
          {data.desc}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Item);
