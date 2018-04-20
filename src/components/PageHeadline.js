import React from "react";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";

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

class PageHeadline extends React.Component {
  render() {
    const { classes, name, buttons, login } = this.props;

    return (
      <div>
        <Toolbar>
          <Typography className={classes.flex} variant="headline" gutterBottom>
            {name}
          </Typography>

          {login && buttons}
        </Toolbar>
        <Divider light />
      </div>
    );
  }
}

export default withStyles(styles)(PageHeadline);
