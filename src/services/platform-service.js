
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

export const getServerKey = (token) => {

    return new Promise((resolve, reject) => {
        API.get(`${APIName}`, `${baseApiUrl}/serverKey`, { headers: { Authorization: `Bearer ${token}`} })
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
    const { firstName, lastName } = userProfile;

    return new Promise((resolve, reject) => {
        API.put(`${APIName}`, `${baseApiUrl}/userprofile`, 
        {   headers: { Authorization: `Bearer ${token}`},
            body: {
                firstName: firstName,
                lastName: lastName
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
        API.get(`${APIName}`, `${baseApiUrl}/users`, { headers: { Authorization: `Bearer ${token}`} })
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