
import { API } from 'aws-amplify';

const baseApiUrl = 'platform';
const APIName = 'MyAPIGatewayAPI';

export const getUserProfile = (token) => {

    return new Promise((resolve, reject) => {
        API
            .get(`${APIName}`, `${baseApiUrl}/userprofile`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data.Item);
                console.log(result.data.Item);
                console.log(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export const updateUserProfile = (userProfile, token) => {
    const { name, userUid } = userProfile;

    return new Promise((resolve, reject) => {
        API
            .put(`${APIName}`, `${baseApiUrl}/userprofile`, 
            {   headers: { Authorization: `Bearer ${token}`},
                data: {
                    userName: name,
                    userUid: userUid
                }
            })
            .then((result) => {
                resolve(result.data);
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
                resolve(result.data.Items);
                console.log(result.data.Items);
                console.log(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};