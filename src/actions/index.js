import * as actionTypes from './types';
import { messaging } from 'firebase';


/* User Actions */

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user,
        }
    };
};


export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}

/* Channel Actions */

export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

// export const setMessageSeen = message => {
//     return {
//         type: actionTypes.SET_MESSAGE_SEEN,
//         payload: {

//         }
//     }
// }

export const setPrivateChannel = isPrivateChannel => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}