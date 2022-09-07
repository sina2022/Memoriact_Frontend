import React, { useState, useRef, useEffect } from 'react';
import { useNavigate,  useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DisplayCards from '../components/DisplayCards';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MainHeader from '../components/MainHeader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SaveIcon from '@mui/icons-material/Save';
import {Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DisplaySuccessMessage from '../components/DisplaySuccessMessage';
import DisplayErrorMessage from '../components/DisplayErrorMessage';
import DeleteIcon from '@mui/icons-material/Delete';
import ColorLensIcon from '@mui/icons-material/ColorLens';

function CreateDeck({resultMessage, setResultMessage}) {

  const {id} = useParams();
  const navigate = useNavigate();
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [newFront, setNewFront] = useState()
  const [newBack, setNewBack] = useState()
  const [theme, setTheme] = useState("default")
  const [cardToEdit, setCardToEdit] = useState()
  // const [resultMessage, setResultMessage] = useState()
  const [deck, setDeck] = useState({
    title: '',
    cards: []
  })

  useEffect(()=>{
    console.log(localStorage.getItem('currentUser'));
    if (id && deck.cards.length === 0) {
      fetch("http://localhost:3001/decks/" + id, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {setDeck(json[0])})
    }
  }, [deck])

  

  const handleEdit = (index) => {
    let copyOfDeck = {...deck};
    let copyOfCard = copyOfDeck.cards[index];
    setCardToEdit(copyOfCard)
  }

  const handleSave = (index) => {
    let copyOfDeck = {...deck};
    copyOfDeck.cards[index] = {front: newFront ? newFront: cardToEdit.front, back: newBack ? newBack: cardToEdit.back}
    setDeck(copyOfDeck)
  }

  const handleSaveDeck = () => {

    // modify an existing deck
    if (id) {
      fetch("http://localhost:3001/decks", {
        method: "PUT",
        body: JSON.stringify({
          deck: deck
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          },
          })
          .then((data) => data.json())
          .then((json) => {
            if (json.modifiedCount === 1) setResultMessage(<DisplaySuccessMessage message={"Deck modified successfully!"} />)
            setTimeout(()=> setResultMessage(null), 3000)
          })
          .catch(() => {
          setResultMessage(<DisplayErrorMessage message={"Deck failed to update"} />)
          setTimeout(()=> setResultMessage(null), 3000)
          })
    }

    // otherwise create a new deck
    else{
      fetch("http://localhost:3001/createCustomizeDeck", {
        method: "POST",
        body: JSON.stringify({
          id: JSON.parse(localStorage.getItem('userId')),
          title: deck?.title,
          cards: deck?.cards,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          },
          })
          .then((data) => data.json())
          .then((json) => {console.log(json.decks[json.decks.length-1].deck._id)
            setResultMessage(<DisplaySuccessMessage message={"Deck created successfully!"} />)
            setTimeout(()=> setResultMessage(null), 3000)
            navigate("/dashboard")
          }
          )
          .catch(() => {
            console.log("hello")
            setResultMessage(<DisplayErrorMessage message={"Deck failed to create"} />)
            setTimeout(()=> setResultMessage(null), 3000)
            })
      }
  }

  const handleCancel = () => {
    setCardToEdit(null);
    setNewFront();
    setNewBack();
  }

  const handleDelete = (index) => {
    if (deck?.cards.length > 1) {
    let copy = {...deck};
    copy.cards = copy.cards.filter((c,i) => i !== index)
    setDeck(copy);
    }
  }

  const handleAddCard = () => {
    console.log(deck)
    let copy = {...deck};
    copy.cards.push({front: front, back: back});
    setDeck(copy);
    setBack('');
    setFront('');
    console.log(back);
    console.log(deck.cards);
  }



  return (
    <>
      <Grid container spacing={2} sx ={{ textAlign: 'center' }}>
        
        <MainHeader title="Customize Your Own Deck" subtitle="Customize a deck to fit your study needs" />
        {resultMessage}
        <Grid item xs={12} sx={{ml:26}} container justifyContent="start">
          <Button size='large' onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>Back</Button>
        </Grid>
        <Grid container xs={12} sx={{ justifyContent:'center'}}>
          <Grid item xs={6} sx={{ my: 2}}>
            <TextField required fullWidth id="filled-basic" label="NAME OF DECK" value={deck?.title} variant="standard" onChange={(e) => {
              let copy = {...deck};
              copy.title = e.target.value;
              setDeck(copy)
            }  } />
          </Grid>
        </Grid>


        <Grid container xs={12} sx={{  my: 2, justifyContent:'center'}}>
          <Grid container xs={5} sx={{ justifyContent:'end'}}>
            <div id={theme} class="cardFront d-flex align-items-center justify-content-center">
              <TextField
                required
                sx ={{width: '90%'}}
                id="filled-multiline-static"
                label="FRONT"
                multiline
                rows={6}
                value={front}
                placeholder="Key term or concept"
                variant="standard"
                onChange={event => setFront(event.target.value)}
              />
            </div>
          </Grid>
          <Grid container xs={6} sx={{ justifyContent:'start'}}> 
          <div id={theme} class="cardBack d-flex align-items-center justify-content-center">
            <TextField
              required
              sx ={{width: '90%'}}
              id="filled-multiline-static"
              label="BACK"
              multiline
              rows={6}
              value={back}
              placeholder="Key information"
              variant="standard"
              onChange={event => setBack(event.target.value)}
            />
          </div>
          <Grid
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ml:4}}
          >
            <Grid item xs>
              <FormControl onChange={(e)=>{setTheme(e.target.value)}}>
                <FormLabel id="themes-group-label">Preview Theme</FormLabel>
                <RadioGroup
                  aria-labelledby="themes-group-label"
                  defaultValue="default"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="default" control={(<Radio />)} 
                  label="Default" />
                  <FormControlLabel value="watermelon" control={<Radio />} label="Watermelon" />
                  <FormControlLabel value="grapefruit" control={<Radio />} label="Grapefruit" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs sx={{mt:1}}>
              <Button variant="outlined" size='small' startIcon={<ColorLensIcon />} onClick={handleAddCard}>
                Save Theme
              </Button>
            </Grid>

            <Grid container xs sx={{ justifyContent:'center', mt:4, mb:2}}>
              <Button startIcon={<SaveIcon />} variant="contained" color="secondary" onClick={handleSaveDeck} size="large" disabled={deck?.title == "" || deck?.cards.length === 0}>
                Save Deck
              </Button>
            </Grid> 
          </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} sx={{ justifyContent:'center'}}>
          <Grid container xs={5} sx={{ justifyContent:'end', mr:5 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCard} disabled={(front === "" || back === "")}>
              Add Card
            </Button>
          </Grid>
          <Grid container xs={5} sx={{ justifyContent:'start'}}>
            <Button variant="text" startIcon={<RestartAltIcon />} onClick={
              ()=>{
                setFront("")
                setBack("")
              }
            }>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h2 className="display-2 my-4">Added Cards</h2>
          { deck.cards.length > 0 ? <DisplayCards cards={deck?.cards} handleDelete = {handleDelete} handleEdit = {handleEdit} cardToEdit={cardToEdit} setNewFront={setNewFront} setNewBack={setNewBack} handleSave={handleSave}handleCancel={handleCancel}/>:
          <p className="fw-lighter mb-5">Looking a little empty, please add some cards...</p>}
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateDeck;