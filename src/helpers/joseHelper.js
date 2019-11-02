const jose = require('jose');

async function encrypt(publicKeyPem, plainText) {
    if (typeof plainText !== 'string')
        throw new Error(`input 'plainText' must be a string`);

    const publicKeyJwk = await jose.JWK.asKey({
        key: publicKeyPem, 
        format: 'pem'
    });
    return await jose.JWE.encrypt(plainText, publicKeyJwk);
    // return jwe
}

async function decrypt(privateKeyPem, jwe) {
    if (typeof jwe !== 'string')
        throw new Error(`input 'jwe' must be a string`);

    const privateKeyJwk = await jose.JWK.asKey({
        key: privateKeyPem, 
        format: 'pem'
    });
    const output = await jose.JWE.decrypt(jwe, privateKeyJwk);
    return output.toString();
    // return plain text
}