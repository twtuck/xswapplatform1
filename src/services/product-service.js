
import { API } from 'aws-amplify';

const baseApiUrl = 'products';
const APIName = 'MyAPIGatewayAPI';

export const createProducts = (appId, product, token) => {

    const body = [
        {
            "title" : "Clash of Clan",
            "avatarUrl" : "https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/04/c3/90/04c3907c-6638-20cb-0116-88adf62d6d3f/AppIcon-0-1x_U007emarketing-0-85-220-6.png/246x0w.jpg",
            "platform" : [ "iOS", "Android" ],
            "rate" : 1.5
        },
        {
            "title" : "Candy crush",
            "avatarUrl" : "https://i.pinimg.com/originals/da/ae/a0/daaea05f83a70b6502303e733334a329.png",
            "platform" : [ "iOS", "Android" ],
            "rate" : 1.4
        }
    ]
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