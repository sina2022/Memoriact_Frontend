import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";


import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import DisplayUserDecksWithScore from "../components/DisplayUserDecksWithScore";
import MainHeader from "../components/MainHeader";
import AddIcon from '@mui/icons-material/Add';
import DisplaySuccessMessage from "../components/DisplaySuccessMessage";


function UserDecks({userId, resultMessage, setResultMessage}) {



  const [userDecks, setUserDecks] = useState([]);
  const [isLoaded, setIsLoaded] = useState();
  const titles = [];

  const [decks, setDecks] = useState([]);
  // const [deck, setDeck] = useState([]);
  
  const userDecksWithTitle = []
  // const [userDeckWithScore, setUserDeckWithScore] = useState([]);



  const handleDelete = (deckId) => {
      fetch("http://localhost:3001/decks/" + deckId, { method: "DELETE" })
        .then((data) => data.json())
        .then((json) => {if (json.modifiedCount === 1)
        setResultMessage(<DisplaySuccessMessage message="Deck successfully deleted" />)
        setTimeout(()=> setResultMessage(null), 3000)
        })
        .then(setIsLoaded(!isLoaded))
    }

  // const handleEdit = () => {
  //     fetch("http://localhost:3001/decks/", { method: "DELETE" })
  //       .then((data) => data.json())
  //       .then((json) => alert(JSON.stringify(json)));
  //   }

    useEffect(() => {

      // if (!isLoaded) {

      console.log(JSON.parse(localStorage.getItem("userId")))
      console.log(userId)
      fetch("http://localhost:3001/userDecks", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => response.json())
      // .then((json) => console.log(json.decks));
      .then((json) => {
        setUserDecks(json.decks);
      //   json.decks.map((userDeck) => {
      //     console.log(userDeck)
      //     fetch("http://localhost:3001/decks/" + userDeck.deck, { method: "GET" })
      //   .then((response) => response.json())
      //   .then((json) => {
      //   if (!titles.includes(json[0].title)) 
      //   titles.push(json[0].title)
      // })
      // }
      //   )
      })
      .then(() => {
      //   userDecksWithTitle = userDecks.map((e,i) => {e, titles[i]})
        setIsLoaded(true)
      //   console.log(titles)})
      //   .then(() => console.log(userDecksWithTitle))
      }
      )
    // }
}, [resultMessage])

    // useEffect(() => {
    //   fetch("http://localhost:3001/decks", { method: "GET" })
    //   .then((response) => response.json())
    //   .then((json) => {setDecks(json.filter((deck)=>userDecks.include(deck._id)))})
    // }, []);


  

  // useEffect(() => {
  //   async function getUseDecks() {
  //     const response = await fetch("http://localhost:3001/userDecks", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         id: userId,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     });

  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`;
  //       window.alert(message);
  //       return;
  //     }

  //     const userDecks = await response.json();
  //     setUserDecks(userDecks);
  //     console.log(">>", (userDecks));
  //   }
  //   getUseDecks();
  //   return;
  // }, []);


  // useEffect(() => {
  //   const userDecksWithScore = userDecks.map((deck) => {
  //       fetch("http://localhost:3001/decks/" + deck._id, { method: "GET" })
  //         .then((response) => response.json())
  //         .then((json) => setUserDecksWithScore(json, deck.lastScore));
  //     }
      
  // )}
  // )

  return (
  <Grid container spacing={2}>
      <MainHeader title="Your Flash Cards" subtitle="All your decks in one place. You may edit or delete your deck" />
      {resultMessage}
    <Grid item xs={12} sx ={{ textAlign: 'center', mb:2}}>
      <Button color='secondary' component={Link} variant="contained" to="/flashcards/customize" startIcon={<AddIcon />}>Create a New Deck</Button>
    </Grid>
    <Grid container xs={12} sx ={{ justifyContent:'center', mt:2}}>
      <Grid item xs={8}>

      </Grid>
    </Grid>
    <Grid xs container alignItems="center"
  justifyContent="center">
    <Grid item xs={8}>
      {/* <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth variant='filled' id="input-with-sx" label="Search by Deck Name" onChange={(event) => setKeyword(event.target.value)} variant="standard" />
      </Box> */}
      </Grid>
    </Grid>

    <Grid xs container alignItems="center"
  justifyContent="center">

      {userId ? <DisplayUserDecksWithScore decksWithScore={userDecks
        // keyword === "" ? decks : decks.filter((deck) =>
        //       deck.title.toLowerCase().startsWith(keyword)) 
              } handleDelete={handleDelete}/>: 
        <p className="fw-lighter my-5">This space would look better with some decks...</p>}
    </Grid>

  </Grid>
  );
}

export default UserDecks;
