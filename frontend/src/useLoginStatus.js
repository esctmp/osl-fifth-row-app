import { useEffect, useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import {UserLoggedIn} from './routes/UserLoggedIn';

function useLoginStatus() {
    const { setUserLoggedIn} = useContext(UserLoggedIn);
    useEffect(() => {
        checkUserStatus();
    }, []);
    const checkUserStatus = async () => {
        try {
            await Auth.currentAuthenticatedUser();
            setUserLoggedIn(true);
        } catch (error) {
            console.log('User is not logged in');
            setUserLoggedIn(false);
        }
    }
}

export default useLoginStatus;