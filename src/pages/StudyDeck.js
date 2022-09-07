import React, { useEffect, useState} from 'react';
import DisplayCards from '../components/DisplayCards';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StudyCard from '../components/StudyCard';
import {useParams} from "react-router-dom";
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
// import { UserIdContext } from "../App";
import MainHeader from '../components/MainHeader';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";



function StudyCards() {
  // const [userId, setUserId] = useContext(UserIdContext)
  const {id} = useParams();
  const [deck, setDeck] = useState()
  const navigate = useNavigate();
  

  useEffect(()=>{

    document.title = `Memoreact - Study ${deck?.title}`
    if (deck == null) {
      fetch("http://localhost:3001/decks/" + id, { method: "GET" })
        .then((response) => response.json())
        .then((json) => setDeck(json[0]))
    }
      console.log(deck);
    })

  return (
    <Fade in={true}>
    <Grid container spacing={2}>
    <MainHeader title={"Study - " + deck?.title} subtitle="Hover over any card to reveal its back" />
      <Grid item xs={12} sx={{ml:26}} container justifyContent="start">
        <Button size='large' onClick={()=>navigate(-1)} startIcon={<ArrowBackIcon />}>Back</Button>
      </Grid>
      <Grid item xs={12} container justifyContent="center">

        {deck?.cards?.map((card) => {
          return <StudyCard front={card.front} back={card.back} />
        })}
      </Grid>
    </Grid>
    </Fade>
  );
}

export default StudyCards;


