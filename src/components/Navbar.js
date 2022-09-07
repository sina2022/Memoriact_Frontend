import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Navbar(userId, setUserId) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => console.log(userId.userId));


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div class="container-fluid">
          <a class="navbar-brand ms-4" href="/">Memoreact</a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              
              { userId.userId.userId && <li class="nav-item ms-2">
                <a class="nav-link active" aria-current="page" href="/flashcards/customize">Create Deck</a>
              </li>}

              <li class="nav-item ms-2">
                <a class="nav-link active" aria-current="page" href="/flashcards">Flash Cards</a>
              </li>
              <li class="nav-item ms-2">
                <a class="nav-link" href="/about">About Us</a>
              </li>
            </ul>
            <div class="d-flex">

              { userId.userId.userId ? 


              <><Tooltip title="Account settings" className="me-3">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{JSON.parse(localStorage.getItem("userName")).charAt(0).toUpperCase()}</Avatar>
            {/* <Avatar sx={{ width: 32, height: 32 }}>{userId?.userId?.userName?.charAt(0).toUpperCase()}</Avatar> */}
          </IconButton>
        </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <a class="btn" href="/dashboard">Your Cards</a>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <a class="btn" href="/" onClick={()=> {localStorage.setItem("userId", null);
          localStorage.setItem("userName", null); setUserId(null)}}>Log out</a>
        </MenuItem>
      </Menu></>
              
              : 

              
              <><a class="btn btn-outline-primary" href="/login" role="button">Log In</a>
              <a class="btn btn-primary px-3 ms-3 me-4" href="/register" role="button">Sign Up</a></>}



            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;