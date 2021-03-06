
import { API } from 'aws-amplify';

const baseApiUrl = 'platform';
const APIName = 'MyAPIGatewayAPI';

export const getUserProfile = (token) => {

    return new Promise((resolve, reject) => {
        API
            .get(`${APIName}`, `${baseApiUrl}/userprofile`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.Item);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export const getServerKey = () => {

    return new Promise((resolve, reject) => {
        API.get(`${APIName}`, `${baseApiUrl}/serverKey`, null)
        .then((result) => {
            resolve(result.serverPublicKey);
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
        })
        .catch(error => {
            console.log(error);
            reject(error.message);
        });
    });
};