import React from "react";
import DeckWithScore from "./DeckWithScore";
import Grid from "@mui/material/Grid";
//import getAllDecks from "./DbData";

function DisplayUserDecksWithScore({ decksWithScore, handleDelete }) {
  return (
    <Grid container justifyContent="center" sx={{mt:2, mb:10}}>
      {decksWithScore.map((deckWithScore) => (
        <DeckWithScore deckWithScore={deckWithScore} handleDelete={handleDelete} />
      ))}
    </Grid>
  );
}

export default DisplayUserDecksWithScore;
