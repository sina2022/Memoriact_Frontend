import React from 'react';
import Slide from '@mui/material/Slide';

function StudyCard({front, back}) {
  return (
    // <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <div id="studyCard" class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front d-flex align-items-center justify-content-center">
          {front}
        </div>
        <div class="flip-card-back d-flex align-items-center justify-content-center">
          {back}
        </div>
      </div>
    </div>
    // </Slide>
  );
}

export default StudyCard;