const jose = require('node-jose');

export const encrypt = async (publicKeyPem, plainText) => {
    if (typeof plainText !== 'string')
        throw new Error(`input 'plainText' must be a string`);

    const publicKeyJwk = await jose.JWK.asKey(publicKeyPem, 'pem');
    return await jose.JWE.createEncrypt({
            format: 'compact'
        }, publicKeyJwk)
        .update(plainText)
        .final();
    // return jwe
}

export const decrypt = async (privateKeyPem, jwe) => {
    if (typeof jwe !== 'string')
        throw new Error(`input 'jwe' must be a string`);

    const privateKeyJwk = await jose.JWK.asKey(privateKeyPem, 'pem');
    const decryptedContent = await jose.JWE.createDecrypt(privateKeyJwk)
        .decrypt(jwe);
    return decryptedContent.plaintext.toString();
    // return plain text
}