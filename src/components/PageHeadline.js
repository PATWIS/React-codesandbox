import React from "react";
import classNames from "classnames";
import Add from "material-ui-icons/Add";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
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
    fontSize: 20
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  }
});

const PageHeadline = props => {
  const { classes } = props;
  return (
    <div>
      <Toolbar>
        <Typography className={classes.flex} variant="headline" gutterBottom>
          Headline
        </Typography>
        <Link to="event/new" className={classes.link}>
          <Button size="small" className={classes.button} color="inherit">
            <Add className={classNames(classes.leftIcon, classes.iconSmall)} />
            Add new
          </Button>
        </Link>
      </Toolbar>
      <Divider light />
    </div>
  );
};

export default withStyles(styles)(PageHeadline);
