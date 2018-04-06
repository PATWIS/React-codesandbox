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
    list: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/items")
      .then(response => response.json())
      .then(json => {
        this.setState({
          list: json
        });
      });
  }

  render() {
    const { classes, history } = this.props;
    const { value, list } = this.state;

    return (
      <div>
        <div>
          {list.map(e => <Event key={e.id} history={history} data={e} />)}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
