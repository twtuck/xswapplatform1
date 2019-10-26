
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://a6a3klo627.execute-api.ap-southeast-1.amazonaws.com/dev/platform';

export const getUserProfile = (token) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/userprofile`, { headers: { Authorization: `Bearer ${token}`} })
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
        axios
            .put(`${baseApiUrl}/userprofile`, null, 
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
        axios
            .get(`${baseApiUrl}/users`, { headers: { Authorization: `Bearer ${token}`} })
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