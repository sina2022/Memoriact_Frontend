import React, {useState} from 'react';
import FlashCard from './FlashCard';
import Grid from '@mui/material/Grid';

function DisplayCards({cards, handleDelete, handleEdit, cardToEdit, setNewFront, setNewBack, handleSave,handleCancel}) {

  return (
      <Grid container justifyContent="center" sx={{mt:2, mb:10}}>
        {cards?.map((card, i) => {
          return <FlashCard front={card.front} back={card.back} index={i} handleDelete={handleDelete} handleEdit={handleEdit} cardToEdit={cardToEdit} setNewFront={setNewFront} setNewBack={setNewBack} handleSave={handleSave}handleCancel={handleCancel}/>
        })}
      </Grid>
  );
}

export default DisplayCards;