import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { baseTheme } from './assets/global/Theme-variable'
import {UserID} from "./routes/UserID"
import {UserLoggedIn} from "./routes/UserLoggedIn"
import Themeroutes from "./routes/Router";
const App = () => {
  const [userId,setUserId] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <UserID.Provider value ={{userId,setUserId}}>
    <UserLoggedIn.Provider value={{userLoggedIn, setUserLoggedIn}}>
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
    </UserLoggedIn.Provider>
    </UserID.Provider>
  );
};

export default App;