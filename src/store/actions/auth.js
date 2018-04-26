import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    };
};




export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};


export const signup = ( email, password, first_name, last_name, username, account_type ) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            username: username,
            account_type: account_type,
            returnSecureToken: true
        }

        let url = 'https://e2e-eld-test.herokuapp.com/api/People';


        axios.post(url, authData)
            .then(response => {
                console.log(response);
                
        })
        .catch(err => {
            console.log(err);
            
        });
    };
};


export const login = ( email, password ) => {
    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }        

        let url = 'https://e2e-eld-test.herokuapp.com/api/People/login';
        

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.id, response.data.userId));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail());
        });
        
    };
};