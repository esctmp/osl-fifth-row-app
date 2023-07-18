import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";



//import reportWebVitals from './reportWebVitals';
import Spinner from "./views/Spinner/Spinner";
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>,
  document.getElementById("root") 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
