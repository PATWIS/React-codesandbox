import React from "react";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import IconButton from "material-ui/IconButton";

const styles = theme => ({
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonAdd: {
    width: 10,
    padding: 0
  },
  leftIcon: {
    // marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class AddNewBtn extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Link to="add-new" className={classes.link}>
        <IconButton color="primary" className={classes.button} aria-label="Add">
          <Add className={classNames(classes.leftIcon, classes.iconSmall)} />
        </IconButton>
      </Link>
    );
  }
}

class CancelBtn extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Link to="/" className={classes.link}>
        <Button
          size="small"
          variant="raised"
          className={classes.button}
          color="default"
        >
          Cancel
        </Button>
      </Link>
    );
  }
}

class SaveBtn extends React.Component {
  render() {
    const { classes, onClickHandler } = this.props;
    return (
      <Button
        onClick={onClickHandler}
        size="small"
        variant="raised"
        className={classes.button}
        color="primary"
      >
        Save
      </Button>
    );
  }
}

const AddNew = withStyles(styles)(AddNewBtn);
const Cancel = withStyles(styles)(CancelBtn);
const Save = withStyles(styles)(SaveBtn);

export { AddNew, Cancel, Save };
