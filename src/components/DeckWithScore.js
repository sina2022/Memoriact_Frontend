import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Link, Navigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom'

function DeckWithScore({ deckWithScore, handleDelete }) {
  const id = deckWithScore?.deck;
  const lastScore = deckWithScore?.lastScore;
  const [deck, setDeck] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(deckWithScore);
    async function getUserDeck() {
      const response = await fetch("http://localhost:3001/decks/" + id, {
        method: "GET",
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const deck = await response.json();
      setDeck(deck);
      console.log((deck[0].title));
    }
    getUserDeck();
    return;
  }
  , [deckWithScore]);
  // console.log(JSON.stringify(deck));

  // const title = deck.title;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  return (
    <Fade in={true} key={id}>
      <div
        className="deck d-flex align-items-center justify-content-center"
      >
        <Box>
          <Badge color="success" badgeContent={(lastScore) ? Math.floor(lastScore) + "%" : null}>
            <Stack spacing={1}>
              <Item>
                <h2>{deck[0]?.title}</h2>
              </Item>
              <Item>
                <ButtonGroup
                  size="large"
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    component={Link}
                    color="info"
                    to={"/flashcards/study/" + id}
                  >
                    Study
                  </Button>
                  <Button component={Link} to={"/flashcards/test/" + id}
                  onClick={() => {
                    sessionStorage.setItem('testId', null)
                    sessionStorage.setItem('testId', JSON.stringify(deckWithScore._id))
                  }}
                  >
                    Test
                  </Button>
                  <IconButton onClick={()=> navigate("/flashcards/customize/" + id)} aria-label="edit" sx={{ mx:2 }}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={()=> {handleDelete(deckWithScore._id)
                    // sessionStorage.setItem("toDelete", id)

                  }}aria-label="delete" sx={{ mr:2 }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ButtonGroup>
              </Item>
            </Stack>
          </Badge>
        </Box>
      </div>
    </Fade>
  );
}

export default DeckWithScore