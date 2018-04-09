import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";

const styles = theme => ({
  root: {
    flex: 1
  },
  button: {
    width: 100,
    marginTop: 15
  },
  paper: {
    minHeight: 150,
    marginTop: 20,
    padding: 20
  },
  link: {
    color: "inherit",
    textDecoration: "none"
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
    const { classes, data, login } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={12} className={classes.root}>
          <Grid item xs={login ? 9 : 12}>
            <Typography variant="title" gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              {data.desc}
            </Typography>
          </Grid>

          {login && (
            <Grid container xs={3} direction="column" alignItems="flex-end">
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
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Item);
