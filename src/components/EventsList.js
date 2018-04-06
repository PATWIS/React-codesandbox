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
    list: [],
    loading: true
  };

  deleteItem = data => {
    let url = `http://localhost:3000/items/${data.id}`;

    fetch(url, {
      method: "DELETE"
    }).then(() => {
      console.log(`item ${data.title} has deleted.`);

      this.setState(prevState => ({
        list: prevState.list.filter(el => el !== data.id)
      }));
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/items")
      .then(response => response.json())
      .catch(e => {
        console.log(e);
        this.setState({
          loading: false
        });
      })
      .then(json => {
        console.log(json);
        this.setState({
          list: json,
          loading: false
        });
      });
  }

  render() {
    const { history } = this.props;
    const { list, loading } = this.state;

    return (
      <div>
        <div>
          {loading ? (
            "loading..."
          ) : list ? (
            Object.keys(list).length === 0 && list.constructor === Object ? (
              <p>
                Please check if you create "list" object in your local db.json
              </p>
            ) : list.length === 0 ? (
              <p> There are no elements, please add new item.</p>
            ) : (
              list.map(e => (
                <Event
                  key={e.id}
                  _handleDelete={this.deleteItem}
                  history={history}
                  data={e}
                />
              ))
            )
          ) : (
            <div>
              <p>
                Please, run local json-server. You can find more info{" "}
                <a href="https://github.com/typicode/json-server">here</a>.{" "}
              </p>
              <p>Copy content from public/db.json</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
