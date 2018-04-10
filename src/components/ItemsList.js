import React from "react";
import { withStyles } from "material-ui/styles";
import Item from "./Item";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500
  },
  progress: {
    margin: theme.spacing.unit * 2,
    textAlign: "center"
  }
});

class ItemsList extends React.Component {
  state = {
    list: [],
    loading: true
  };

  deleteItem = data => {
    let url = `http://localhost:3000/items/${data.id}`;

    fetch(url, {
      method: "DELETE"
    }).then(() => {
      console.log(`item ${data.name} has deleted.`);
      this.setState(prevState => ({
        list: prevState.list.filter(el => el.id !== data.id)
      }));
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/items")
      .then(response => response.json())
      .catch(e => {
        this.setState({
          loading: false
        });
      })
      .then(json => {
        this.setState({
          list: json,
          loading: false
        });
      });
  }

  render() {
    const { history, classes, login } = this.props;
    const { list, loading } = this.state;

    return (
      <div>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : list ? (
          Object.keys(list).length === 0 && list.constructor === Object ? (
            <p>
              Please check if have you created "list" object in your local
              db.json
            </p>
          ) : list.length === 0 ? (
            <p> There are no elements, please add new item.</p>
          ) : (
            list.map(e => (
              <Item
                login={login}
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
              Please, run local json-server and copy content from
              public/db.json.
            </p>
            <p>
              You can find more info here:
              https://github.com/typicode/json-server
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ItemsList);
