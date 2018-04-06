import React from "react";
import PageHeadline from "../components/PageHeadline";
import ItemsList from "../components/ItemsList";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import { AddNew } from "../components/Buttons";

const styles = theme => ({
  root: {
    minHeight: "80vh",
    padding: 10
  },
  content: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Home = props => {
  const { classes, history } = props;
  return (
    <Grid className={classes.root} justify="center" container>
      <Grid item xs={12} sm={11} md={8} className={classes.content}>
        <PageHeadline name={"Items List"} buttons={<AddNew />} />
        <ItemsList history={history} />
        {/*<Button variant="fab" color="primary" className={classes.fab}>
          <AddIcon />
        </Button> */}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Home);
