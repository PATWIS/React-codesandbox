import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    flex: 1
  },
  button: {
    margin: 20
  },
  paper: {
    height: 150,
    marginTop: 20
  },
  title: {
    padding: 20
  }
});

class Item extends React.Component {
  _handleDelete(data) {
    this.props._handleDelete(data);
  }

  goToEdit = () => {
    const { data, history } = this.props;
    this.props.history.push(`/item/${data.id}`);
  };

  render() {
    const { classes, data } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="title" gutterBottom>
          Title: {data.title}
        </Typography>
        <Button
          variant="raised"
          onClick={this.goToEdit}
          className={classes.button}
        >
          Edit
        </Button>
        <Button
          variant="raised"
          color="secondary"
          onClick={this._handleDelete.bind(this, data)}
          className={classes.button}
        >
          Delete
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(Item);
