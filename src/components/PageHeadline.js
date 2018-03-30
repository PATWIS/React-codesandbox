import React from "react";
import classNames from "classnames";
import Add from "material-ui-icons/Add";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

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
  state = {
    value: 10
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Toolbar>
          <Typography className={classes.flex} variant="title" gutterBottom>
            Headline
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={this.state.value}
              onChange={this.handleChange}
              inputProps={{
                name: "value",
                id: "age-simple"
              }}
            >
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
            </Select>
          </FormControl>
          {/*<Link to="event/new" className={classes.link}>
            <Button className={classes.button} color="primary">
              <Add
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Add new
            </Button>
          </Link>*/}
        </Toolbar>
        <Divider light />
      </div>
    );
  }
}

export default withStyles(styles)(PageHeadline);
