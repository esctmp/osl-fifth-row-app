import React,{useContext, useEffect,useState} from 'react';
import useLoginStatus from './useLoginStatus';
import FullLayout from './layouts/FullLayout/FullLayout';
import {useNavigate} from "react-router-dom";
import {UserLoggedIn} from './routes/UserLoggedIn';
import {Groups} from "./routes/Groups";
import {Auth} from "aws-amplify"
import {UserID} from "./routes/UserID"

const RequireAuth = ({ children, allowedGroups }) => {
    const [authStatus, setAuthStatus] = useState('checking'); // initial state is 'checking'
    const {groups, setGroups} = useContext(Groups);
    const {setUserId} = useContext(UserID);
    const navigate = useNavigate();
    let group;
  
    useEffect(() => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          group = user.attributes["custom:user_type"];
          if (!group){
            group = user.signInUserSession.accessToken.payload["cognito:groups"];}
          const uid = user.username;
          setGroups(group);
          setUserId(uid);
          setAuthStatus('logged-in'); // user is logged in, set status to 'logged-in'
        })
        .catch(error => {
          console.error(error);
          setAuthStatus('logged-out'); // user is not logged in, set status to 'logged-out'
        });
    }, []);
  
    useEffect(() => {
      if (authStatus === 'logged-out') {
        navigate('/login');
      } else if (authStatus === 'logged-in' && !(allowedGroups && groups && (allowedGroups.includes(groups[0])||allowedGroups[0]==groups))) {
        navigate('/login');
      }
    }, [authStatus, allowedGroups, groups, navigate]);
  
    // Wait for the auth status to be either 'logged-in' or 'logged-out'
    if (authStatus === 'checking') {
      return null;
    }
  
    // The rest of your component...
    if (authStatus === 'logged-in' && allowedGroups && groups && (allowedGroups.includes(groups[0])||allowedGroups[0]==groups)){
      return <FullLayout>{children}</FullLayout>;
    } else {
      return null;
    }
  };
  
  export default RequireAuth;