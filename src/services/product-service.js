
import { API } from 'aws-amplify';

const baseApiUrl = 'products';
const APIName = 'MyAPIGatewayAPI';

export const createProducts = (product, appId, token) => {

    return new Promise((resolve, reject) => {
        API
            .post(`${APIName}`, `${baseApiUrl}/create`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    appId: {appId}
                },
                body: {
                    product
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