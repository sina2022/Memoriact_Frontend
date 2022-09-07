import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link, useNavigate } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  alignItems: "center"
}));


function TestCard({front, back, handleFlip, id, handleRight, handleWrong, score}) {

  const navigate = useNavigate();


  return (
    <div id={id} class="flip-card" onClick={handleFlip}>
      <div class="flip-card-inner">
        <div class="flip-card-front d-flex align-items-center justify-content-center">
          {front ? front : 
          <>
          <Stack spacing={2}>
            <h2>Thumbs up for making it to the end!</h2>
            <h4>Here's how you did: </h4>
            <Box>
              {score < 60 && <CircularProgressWithLabel value={score} size={120}  variant='determinate' color='error' />}
              
              {(score >= 60 && score < 80) && <CircularProgressWithLabel value={score} size={120}  variant='determinate' color='warning' />}

              {(score >= 80 && score <= 100) && <CircularProgressWithLabel value={score} size={120}  variant='determinate' color='success' />}
            </Box>
            CORRECT
            <Box display="flex"
      justifyContent="center">
            <Stack className="cardButtons" direction="row" sx ={{ mb:2 }}spacing={2}>
          
                <Button variant='contained' size='large' color='primary' onClick={()=> navigate(-1)}>
                  Choose Another Deck
                </Button>
             
        
                <Button variant="contained" size="large" color='secondary' onClick={() => window.location.reload()}>
                  Retry
                </Button>
       
            </Stack>
            </Box>
          </Stack>
          </>}
        </div>
        <div class="flip-card-back d-flex align-items-center justify-content-center">
          <Stack spacing={2}  direction="column">
            {back}
            <Box display="flex"
      justifyContent="center" sx ={{ }}>
           {/* <Stack 
  justifyContent="flex-end"
  alignItems="center" sx ={{ mt:20 }}>
            Did you get it right or wrong
            </Stack> */}
            <Stack className="cardButtons" direction="row" spacing={20} sx ={{ mb:2 }}>
              <IconButton aria-label="correct" size="large" color="success" onClick={handleRight}>
                <ThumbUpRoundedIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="wrong" color="error" size="large" onClick={handleWrong}>
                <ThumbDownRoundedIcon fontSize="inherit" />
              </IconButton>
            </Stack> 
            </Box>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default TestCard;

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

