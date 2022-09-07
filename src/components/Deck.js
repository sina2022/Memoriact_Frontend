import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Deck({ deck }) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  // Dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fade in={true}>
      <div
        className="deck d-flex align-items-center justify-content-center"
        key={deck?.title}
      >
        <Box>
            <Stack spacing={2} sx={{ pt:1}}>
              <Item>
                <h2>{deck?.title}</h2>
              </Item>
              <Item>
                <small>{deck?.lastScore}</small>
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
                    to={"/flashcards/study/" + deck?._id}
                  >
                    Study
                  </Button>
                  <Button component={Link} to={"/flashcards/test/" + deck?._id}>
                    Test
                  </Button>
                </ButtonGroup>
              </Item>
            </Stack>
        </Box>
      </div>
    </Fade>
  );
}

export default Deck;
