
import { API } from 'aws-amplify';

const baseApiUrl = 'template';
const APIName = 'MyAPIGatewayAPI';

export const createTemplate = (appId, template, token) => {

    return new Promise((resolve, reject) => {
        API
            .post(`${APIName}`, `${baseApiUrl}/create`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    appId: {appId}
                },
                body: {
                    template
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