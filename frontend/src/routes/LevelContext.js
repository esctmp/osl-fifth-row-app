import { createContext } from 'react';

let defaultUserData = {
    user_id: 0
}
export const LevelContext = createContext(defaultUserData);