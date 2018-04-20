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
    query: "",
    filtered_list: [],
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
        this.setState(prevState => {
          return {
            list: json,
            loading: false
          };
        });

        this.filterList();
      });
  }

  filterList = event => {
    // this.setState({
    //   loading: true
    // });
    clearTimeout(this.pending);
    let query = event ? event.target.value : this.state.query;

    this.pending = setTimeout(() => {
      this.setState(prevState => {
        let result;
        query === ""
          ? (result = prevState.list)
          : (result = prevState.list.filter(item => {
              if (query.length >= 3) {
                return (
                  item.name.toLowerCase().includes(query) ||
                  item.desc.toLowerCase().includes(query)
                );
              } else {
                return item;
              }
            }));

        return {
          filtered_list: result,
          loading: false
        };
      });
    }, 200);
  };

  render() {
    const { history, classes, login } = this.props;
    const { list, loading, filtered_list } = this.state;

    return (
      <div>
        <input type="text" placeholder="find" onChange={this.filterList} />
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
            filtered_list.map(e => (
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
              This App uses JSON-server API. Please, run json-server on
              localhost:3000.
            </p>
            <ul>
              <li>npm install json-server</li>
              <li>Create a db.json file</li>

              <li>copy content from public/db.json.</li>
              <li>json-server --watch db.json</li>
            </ul>
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
