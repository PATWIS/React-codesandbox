import React from "react";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";

const styles = theme => ({
  flex: {
    flex: 1
  }
});

class Nav extends React.Component {
  state = {
    value: "home"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Tabs value={value} onChange={this.handleChange} className={classes.flex}>
        <Tab to={"/"} component={Link} value="home" label="home" />
        <Tab to={"/about"} component={Link} value="about" label="about" />
      </Tabs>
    );
  }
}

export default withStyles(styles)(Nav);
