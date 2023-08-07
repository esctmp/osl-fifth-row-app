import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import { Groups } from "../../../routes/Groups";
import LogoIcon from "../Logo/LogoIcon";
// import Menuitems from "./data";
import FREitems from "./FREitems";
import OSLitems from "./OSLitems";
import Rootitems from "./ROOTitems";


const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));


  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const {groups, setGroups} = useContext(Groups);
  const [menuItems, setMenuItems] = useState([]);  

  useEffect(() => {
      if (groups.includes("FRE")){
        setMenuItems(FREitems);  
      } else if (groups.includes("OSL")){
        setMenuItems(OSLitems);  
      } else if (groups.includes("ROOT")){
        setMenuItems(Rootitems);
      }
      
    }, [groups]);

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon data-testid = "logo"/>
        </Box>

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
                <ListItem data-testid={item.title}
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

  // permenant sidebar if screen size is bigger than breakpoint lg
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
