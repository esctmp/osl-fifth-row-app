import React,{useContext, useEffect} from 'react';
import useLoginStatus from './useLoginStatus';
import FullLayout from './layouts/FullLayout/FullLayout';
import {useNavigate} from "react-router-dom";
import {UserLoggedIn} from './routes/UserLoggedIn';
import {Groups} from "./routes/Groups";

const RequireAuth = ({ children,allowedGroups }) => {
    const {userLoggedIn} = useContext(UserLoggedIn);
    const {groups} = useContext(Groups);
    useLoginStatus();
    const nav = useNavigate();
    useEffect(() => {
        if (!userLoggedIn) {
            nav("/login");
        }
    }, [userLoggedIn, nav]);
    if (allowedGroups.includes(groups[0])){
        return <FullLayout>{children}</FullLayout>;}
    else{
        nav("/login");
        return null;
    }
};

export default RequireAuth;