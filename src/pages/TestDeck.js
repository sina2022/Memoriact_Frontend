import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TestCard from '../components/TestCard';
import PropTypes from 'prop-types';
import Fade from '@mui/material/Fade';
import {useParams} from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';
import MainHeader from '../components/MainHeader';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import DisplaySuccessMessage from '../components/DisplaySuccessMessage';
import DisplayErrorMessage from '../components/DisplayErrorMessage';



function TestDeck({resultMessage, setResultMessage}) {

  const {id} = useParams();
  const [deck, setDeck] = useState()
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [pos, setPos] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState();
  const [newCards, setNewCards] = useState([]);


  useEffect(()=>{
    if (deck == null) {
      fetch("http://localhost:3001/decks/" + id, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {setDeck(json[0]); setCardsRemaining(json[0].cards.length - 1)})
    }
  })

  

  useEffect(() => {
    console.log(sessionStorage.getItem('testId'))
    if (score > 0 && cardsRemaining === -1) {
      fetch("http://localhost:3001/addScore", {
        method: "POST",
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem('userId')),
          lastScore: `${score/deck.cards.length * 100}`,
          id: JSON.parse(sessionStorage.getItem('testId')),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          },
          })
          .then((data) => (data.json()))
          .then((json) => {if (json._id) {
            setResultMessage(<DisplaySuccessMessage message={"Score saved!"} />)
            setTimeout(()=> setResultMessage(null), 3000)
          }})
          .catch(() => {
            setResultMessage(<DisplayErrorMessage message={"Score failed to save"} />)
            setTimeout(()=> setResultMessage(null), 3000)
            })
      }
    }, [cardsRemaining])

  // useEffect(()=>{
  //   setCardsRemaining(deck.cards.length - 1)
  //   },[deck])

  const handleFlip = () => {if ((pos < deck.cards.length) && (!isFlipped)) {
    setIsFlipped(!isFlipped);
  }}

  const handleRight = () => {
    setNewCards(newCards.concat(deck.cards[pos]));
    setIsFlipped(!isFlipped);
    setScore(score + 1);
    setTimeout(()=> {
      setPos(pos + 1);
      setCardsRemaining(cardsRemaining - 1);
    }, 200);
    console.log(deck.cards[pos].front);


  }

  const handleWrong = () => {
    let temp = newCards.concat(deck.cards[pos]);
    temp[pos].isWrong = true;
    setNewCards(temp);
    setIsFlipped(!isFlipped);
    setTimeout(()=> {
      setPos(pos + 1);
      setCardsRemaining(cardsRemaining - 1);
    }, 200);
    // console.log(newCards[pos].isWrong);

  }

  return (<>
    {deck && <Fade in={true}>
    <Grid container spacing={2}>
      <MainHeader title={"Test - " + deck?.title} subtitle="Bonne chance!" />
      {resultMessage}
      <Grid item xs={12} sx={{ml:26}} container justifyContent="start">
        <Button size='large' onClick={()=>navigate(-1)} startIcon={<ArrowBackIcon />}>Back</Button>
      </Grid>
      <Grid
        // xs={12} 
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        // sx={{mt:2}}
      >
      { pos > 0 ?
        <Box sx ={{ 
        ml:30, 
        width: '400px',
        height: '224px',
        backgroundColor: 'lightgray',
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        padding: '5px',
        boxShadow: newCards[pos - 1]?.isWrong ? '0px 10px 75px -15px rgba(255,16,39,0.57)' : ''
        }}>
          <h5>{newCards[newCards.length - 1]?.front}</h5>
          <p>{newCards[newCards.length - 1]?.back}</p>
          {/* <h5>{deck?.cards[pos - 1].front}</h5>
          <p>{deck?.cards[pos - 1].back}</p> */}
        </Box> :
        <Box sx ={{ 
          ml:30, 
          width: '400px',
          height: '224px',
          backgroundColor: '#F5F5F5',
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          }}></Box>}

       { cardsRemaining > 0 ? <Box sx ={{ 
        mr:30, 
        width: '400px',
        height: '224px',
        backgroundColor: 'lightgray',
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        }}>
            <p>Cards Remaining:</p>
            <Box sx={{ width: '80%' }}>
              <LinearProgressWithLabel value={(cardsRemaining/deck.cards.length)*100} />
            </Box>
            {/* <CircularProgressWithLabel value={(cardsRemaining/deck.cards.length)*100} /> */}
        </Box> :     
        <Box sx ={{ 
          mr:30, 
          width: '400px',
          height: '224px',
          backgroundColor: '#F5F5F5',
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          }}><p>Cards Remaining:</p>
          <Box sx={{ width: '80%' }}>
            <LinearProgressWithLabel value={0} />
          </Box></Box>}
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        justifyContent="center"
      >
        <TestCard front={deck.cards[pos]?.front} back={deck.cards[pos]?.back} handleFlip={handleFlip} id={isFlipped ? "flipTestCard" : "testCard" }
        handleRight={handleRight} handleWrong={handleWrong} score={score/deck.cards.length * 100}/>
      </Grid>  
    </Grid>
    </Fade>
    
        }</>);
}
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};


export default TestDeck;