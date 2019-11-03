
import { API } from 'aws-amplify';

const baseApiUrl = 'products';
const APIName = 'MyAPIGatewayAPI';

export const createProducts = (appId, product, token) => {

    const body = JSON.parse(product);
    console.log(appId);

    return new Promise((resolve, reject) => {
        API
            .post(`${APIName}`, `${baseApiUrl}/create`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    appId
                },
                body
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