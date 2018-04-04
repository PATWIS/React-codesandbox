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

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(json => {
        this.setState({
          list: [json]
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { value, list } = this.state;

    return (
      <div>
        <div>{list.map(e => <Event data={e} />)}</div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
