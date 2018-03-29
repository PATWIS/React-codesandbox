import React from "react";
import PageHeadline from "../components/PageHeadline";
import Grid from "material-ui/Grid";

export const Home = props => {
  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <PageHeadline />
        </Grid>
      </Grid>
    </div>
  );
};
