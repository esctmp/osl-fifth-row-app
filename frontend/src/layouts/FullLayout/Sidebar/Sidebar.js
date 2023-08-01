import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import { UserID } from "../../../routes/UserID";
import LogoIcon from "../Logo/LogoIcon";
// import Menuitems from "./data";
import FREitems from "./FREitems";
import OSLitems from "./OSLitems";
import Rootitems from "./ROOTitems";


const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };


  const {userId,setUserId} = useContext(UserID);
  const [groupType,setGroupType] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  useEffect(()=>
  axios.get(`http://localhost:3000/users/getUser?user_id=${userId}`).then(function(response){
    setGroupType(response.data[0].user_type);
    }).catch(error =>{
        console.error("Error fetching EXCO: ",error);
    }))

  useEffect(() => {
      if (groupType === "FRE"){
        setMenuItems(FREitems);  
      } else if (groupType === "OSL"){
        setMenuItems(OSLitems);  
      } else if (groupType === "ROOT"){
        setMenuItems(Rootitems);
      }
      
      
    }, [groupType]);

    console.log(menuItems)

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      {/* <Link to="/"> */}
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon />
        </Box>
      {/* </Link> */}

      <Box>
        <List
          sx={{
            mt: 4,
          }}
        >
          {menuItems.map((item, index) => {
            //{/********SubHeader**********/}

            return (
              <List component="li" disablePadding key={item.title}>
                <ListItem
                  onClick={() => handleClick(index)}
                  button
                  component={NavLink}
                  to={item.href}
                  selected={pathDirect === item.href }
                  sx={{
                    mb: 1,
                    ...(pathDirect === item.href && {
                      color: "white",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  {/* If sub-heading, more padding */}
                  {item?.type == "sub-heading" 
                    ? <ListItemText sx={{ml: 3}}>{item.title}</ListItemText>
                    : <ListItemText sx={{ml: 0}}>{item.title}</ListItemText>
                  }
                </ListItem>
              </List>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer> 
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
