import React, { useState } from "react";
import Deck from "./Deck";
import Grid from "@mui/material/Grid";
//import getAllDecks from "./DbData";

function DisplayDecks({ decks }) {
  return (
    <Grid container justifyContent="center" sx={{mt:2, mb:10}}>
      {decks?.map((deck) => (
        <Deck deck={deck} />
      ))}
    </Grid>
  );
}

export default DisplayDecks;
