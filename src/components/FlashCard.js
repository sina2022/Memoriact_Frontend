import React, { useNavigate } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";


function FlashCard({front, back, index, handleDelete, handleEdit, cardToEdit, setNewFront, setNewBack, handleSave, handleCancel}) {



  return (
    <Grow in={true} key={index}>
      <Card sx={{display: 'inline-block'}} class="createdCard">
        <CardContent id="grapefruit" class="createCardFront">
          {(cardToEdit?.back === back && cardToEdit?.front === front) ? 
          <>
            <TextField
            required
            sx ={{width: '90%', my: 2}}
            id="filled-multiline-static"
            label="FRONT"
            multiline
            rows={2}
            defaultValue={cardToEdit.front}
            placeholder="Key term or concept"
            variant="standard"
            onChange={event => setNewFront(event.target.value)} 
            />
            <TextField
            required
            sx ={{width: '90%', my: 2}}
            id="filled-multiline-static"
            label="BACK"
            multiline
            rows={3}
            defaultValue={cardToEdit.back}
            placeholder="Key term or concept"
            variant="standard"
            onChange={event => setNewBack(event.target.value)} 
            />
        </>
          
          
          : <>
          <TextField
          disabled
          sx ={{width: '90%', my: 2}}
          id="filled-multiline-static"
          label="FRONT"
          multiline
          rows={2}
          value={front}
          placeholder="Key term or concept"
          variant="standard"
          onChange={event => setNewFront(event.target.value)} 
          />
          <TextField
          disabled
          sx ={{width: '90%'}}
          id="filled-multiline-static"
          label="BACK"
          multiline
          rows={3}
          value={back}
          placeholder="Key notes"
          variant="standard"
          onChange={event => setNewBack(event.target.value)} 
          />
      </> }
          {/* <CardContent id="grapefruit" class="createCardBack" sx={{ height: '100%'}} > */}
            <Box sx={{ mt: 2}}>
              {(cardToEdit?.back === back && cardToEdit?.front === front) ? 

              <><Button variant="contained" size="small" onClick={() => handleSave(index)}>Save</Button>
              <Button size="small" onClick={handleCancel}>Cancel</Button></> : 

              <><Button size="small" onClick={() => handleEdit(index)}>Edit</Button>
              <Button size="small" onClick={() => handleDelete(index)}>Delete</Button></>}
              
            </Box>
          {/* </CardContent> */}

          
        </CardContent>
      </Card>
    </Grow>
  );
}

export default FlashCard;