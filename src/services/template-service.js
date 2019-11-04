
import { API } from 'aws-amplify';

const baseApiUrl = 'template';
const APIName = 'MyAPIGatewayAPI';

export const createTemplate = (appId, template, token) => {

    //const template = JSON.parse(template);
    console.log(appId);

    return new Promise((resolve, reject) => {
        API
            .post(`${APIName}`, `${baseApiUrl}/create`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    appId
                },
                body: {
                    appId, template
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