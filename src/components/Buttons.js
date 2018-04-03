import React from "react";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";

const styles = theme => ({
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    // fontSize: 20
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
      <Link to="event/new" className={classes.link}>
        <Button variant="raised" className={classes.button} color="primary">
          <Add className={classNames(classes.leftIcon, classes.iconSmall)} />
          Add new
        </Button>
      </Link>
    );
  }
}

class CancelBtn extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Link to="/" className={classes.link}>
        <Button variant="raised" className={classes.button} color="default">
          Cancel
        </Button>
      </Link>
    );
  }
}

const AddNew = withStyles(styles)(AddNewBtn);
const Cancel = withStyles(styles)(CancelBtn);

export { AddNew, Cancel };
