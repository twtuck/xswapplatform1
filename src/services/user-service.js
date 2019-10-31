
import { API } from 'aws-amplify';

const baseApiUrl = 'platform';
const APIName = 'MyAPIGatewayAPI';

export const getUserProfile = (token) => {

    return new Promise((resolve, reject) => {
        API
            .get(`${APIName}`, `${baseApiUrl}/userprofile`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.Item);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export const updateUserProfile = (userProfile, token) => {
    
    return new Promise((resolve, reject) => {
        API
            .put(`${APIName}`, `${baseApiUrl}/userprofile`, 
            {   headers: { Authorization: `Bearer ${token}`},
                body: {
                    userProfile
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export const getUsers = (token) => {

    return new Promise((resolve, reject) => {
        API
            .get(`${APIName}`, `${baseApiUrl}/users`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.Items);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};