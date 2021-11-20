import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function MenuDemo() {
  const [anchorEl, open] = React.useState(null);
  const handleClick = (event) => {
    open(event.currentTarget);
  };

  const handleClose = () => {
    open(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ paddingLeft: "600px" }}>Material UI Menu</Toolbar>
      </AppBar>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="Menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>About</MenuItem>
          <MenuItem onClick={handleClose}>Contact</MenuItem>
        </Menu>
      </div>
    </>
  );
}
