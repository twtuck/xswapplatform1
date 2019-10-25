
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://m876ampgkh.execute-api.ap-southeast-1.amazonaws.com/dev/platform';

export const getUserProfile = (token) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/userprofile`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data.Items);
                console.log(result.data.Items);
                console.log(result.data);
                return;
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
                return;
            });
    });
};