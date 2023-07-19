import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { baseTheme } from './assets/global/Theme-variable'
import {UserID} from "./routes/UserID"
import Themeroutes from "./routes/Router";
const App = () => {
  const [userId,setUserId] = useState(null);
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <UserID.Provider value ={{userId,setUserId}}>
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
    </UserID.Provider>
  );
};

export default App;
