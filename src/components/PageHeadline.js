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
  state = {
    value: 10
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState({
      login: this.props.login
    });
  }

  render() {
    const { classes, name, buttons } = this.props;
    const { login } = this.state;
    return (
      <div>
        <Toolbar>
          <Typography className={classes.flex} variant="headline" gutterBottom>
            {name}
          </Typography>
          {/*} <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.state.value}
              onChange={this.handleChange}
              inputProps={{
                name: "value",
                id: "category"
              }}
            >
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
            </Select>
          </FormControl>*/}
          {login && buttons}
        </Toolbar>
        <Divider light />
      </div>
    );
  }
}

export default withStyles(styles)(PageHeadline);
