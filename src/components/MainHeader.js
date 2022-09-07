import React from 'react';
import Grid from "@mui/material/Grid";


function MainHeader({title, subtitle}) {
  return (
  <Grid item xs={12} sx={{ textAlign: "center" }}>
    <h1 id="mainTitle">
      {title}
    </h1>
    <h5 id="mainSubtitle">
      {subtitle}
    </h5>
  </Grid>
  );
}

export default MainHeader;