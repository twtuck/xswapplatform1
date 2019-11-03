
import { API } from 'aws-amplify';

const baseApiUrl = 'products';
const APIName = 'MyAPIGatewayAPI';

export const createProducts = (product, token) => {

    return new Promise((resolve, reject) => {
        API
            .post(`${APIName}`, `${baseApiUrl}/create`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};