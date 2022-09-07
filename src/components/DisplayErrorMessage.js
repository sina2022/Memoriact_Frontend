import React from 'react';

function DisplayErrorMessage({message}) {
  return (
    <div id="errorMsg">
      {message}
    </div>
  );
}

export default DisplayErrorMessage;