import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import DisplayDecks from "../components/DisplayDecks";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import MainHeader from "../components/MainHeader";
import AddIcon from '@mui/icons-material/Add';

function Decks({userId}) {
  document.title = "Memoreact - Flash Cards"
  const [keyword, setKeyword] = useState("");
  const [decks, setDecks] = useState([]);

    //fetch public decks
    useEffect(() => {
      console.log(userId)
      fetch("http://localhost:3001/decks", { method: "GET" })
      .then((response) => response.json())
      .then((json) => {setDecks(json.filter((deck)=>deck.isPublic))})
      
    }, []);

  return (
    <Grid container spacing={2}>
      <MainHeader title="Flash Cards" subtitle="Find premade decks and even add them to your collection" />
    <Grid item xs={12} sx ={{ textAlign: 'center', mb:2}}>
      {userId !== null ? <Button color='secondary' component={Link} variant="contained" to="/flashcards/customize" startIcon={<AddIcon />}>Create a New Deck</Button> :

      <Button color='secondary' component={Link} variant="contained" to="/login" startIcon={<AddIcon />}>Sign in to create a New Deck</Button>}
    </Grid>
    <Grid container xs={12} sx ={{ justifyContent:'center', mt:2}}>
      <Grid item xs={8}>
      <ul>
        <li>Study - Explore a deck and memorize its content</li>
        <li>Test - Put your knowledge to the test!</li>
      </ul>
      </Grid>
    </Grid>
    <Grid xs={12} container alignItems="center"
  justifyContent="center">
    <Grid item xs={8}>
      <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth variant='filled' id="input-with-sx" label="Search by Deck Name" onChange={(event) => setKeyword(event.target.value)} variant="standard" />
      </Box>
      </Grid>
    </Grid>

    <Grid xs item>
      <DisplayDecks decks={keyword === "" ? decks : decks.filter((deck) =>
              deck.title.toLowerCase().startsWith(keyword)) } />
    </Grid>

  </Grid>
  );
}

export default Decks;
