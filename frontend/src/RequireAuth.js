import React,{useContext, useEffect} from 'react';
import useLoginStatus from './useLoginStatus';
import FullLayout from './layouts/FullLayout/FullLayout';
import {useNavigate} from "react-router-dom";
import {UserLoggedIn} from './routes/UserLoggedIn';

const RequireAuth = ({ children }) => {
    const {userLoggedIn} = useContext(UserLoggedIn);
    useLoginStatus();
    const nav = useNavigate();
    useEffect(() => {
        if (!userLoggedIn) {
            nav("/login");
        }
    }, [userLoggedIn, nav]);

    if (!userLoggedIn) {
        return null;
    }
    return <FullLayout>{children}</FullLayout>;
};

export default RequireAuth;