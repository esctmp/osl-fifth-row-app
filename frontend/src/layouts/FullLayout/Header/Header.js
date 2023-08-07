import Logout from "@material-ui/icons/Logout";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
import { Auth } from 'aws-amplify';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Groups } from "../../../routes/Groups";
import { UserID } from "../../../routes/UserID";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";

const Header = (props) => {

  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };
  const handleCreateUser = () => {
    navigate('/osl/Createuser');
  };
  const handleSetting = () => {
    navigate('/Setting');
  };

  const[FRname,setFRname] = useState(null);
  const {userId,setUserId} = useContext(UserID);
  const {groups, setGroups} = useContext(Groups);
  console.log(userId);
  useEffect(()=>
  axios.get(`http://localhost:3000/users/getUser?user_id=${userId}`).then(function(response){
    console.log(response.data[0].name);
    setFRname(response.data[0].name);
    }).catch(error =>{
        console.error("Error fetching User: ",error);
    }))

  const CreateUser = () => {
    const {groups, setGroups} = useContext(Groups);
    if (groups.includes("OSL")){
      return(
        <MenuItem onClick={handleCreateUser}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
        </MenuItem>
      );
    } else {
      return null;
      } 
    };
  

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />  

        {/* ------------------------------------------- */}
        {/* Username */}
        {/* ------------------------------------------- */}
        <Box
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            height: "25px",
            width: "auto",
            right: 0,
            top: "70px !important",
            mr: 1,
            mt: 0.5,
          }}
        >
          <text 
            style={{
              color: 'black',
              fontFamily: "DM Sans",
            }}
          >
            {FRname}
          </text>
        </Box>
            
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.0)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >

            <Avatar     
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem>
          <Divider />
          <CreateUser />
          <MenuItem onClick={handleSetting}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Link to="/login">
            <MenuItem onClick={()=>{
              Auth.signOut()
              .then(data => console.log(data))
              .catch(err => console.log(err));
            }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;