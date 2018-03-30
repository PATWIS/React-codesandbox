import React from "react";
import { withStyles } from "material-ui/styles";
import Event from "./Event";

const styles = theme => ({
  root: {
    flex: 1
  }
});

class EventsList extends React.Component {
  state = {
    value: "home",
    list: [0, 1]
  };

  render() {
    const { classes } = this.props;
    const { value, list } = this.state;

    return (
      <div>
        <div>{list.map(e => <Event />)}</div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
