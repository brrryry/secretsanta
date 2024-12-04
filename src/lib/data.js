import {promises as fs} from 'fs';
import AES from 'crypto-js/aes';
import ENC from 'crypto-js/enc-utf8';

export async function getUserData(username, withPassword = false) {
    const res = await fs.readFile(`src/data/users.json`);
    const data = JSON.parse(res);


    const user = data[username];



    if(user) {
        if (!withPassword) delete user.password;
        return user;
    } 

    throw ({error: 'invalid user (or password)', status: 401});
}

export async function getUsers() {
    const res = await fs.readFile(`src/data/users.json`);
    let data = JSON.parse(res);

    data = Object.keys(data).map(key => {
        return {
            username: key,
            email: data[key].email
        }
    });

    return data;
}


export async function addUserData(userData) {
    const {email, password} = userData;
    let res = await fs.readFile(`src/data/users.json`);
    let data = JSON.parse(res);

    //if username exists error
    if(data[userData.username]) throw ({error: 'username already exists', status: 401});

    data[userData.username] = {
        email: email,
        password: password
    };


    await fs.writeFile(`src/data/users.json`, JSON.stringify(data));
}

export async function updateNotes(username, notes) {
    let res = await fs.readFile(`src/data/users.json`);
    let data = JSON.parse(res);

    data[username].notes = notes;

    await fs.writeFile(`src/data/users.json`, JSON.stringify(data));
}


export async function encrypt(data) {
    const ciphertext = AES.encrypt(JSON.stringify(data), process.env.secret).toString();
    return ciphertext;
}

export async function decrypt(ciphertext) {
    try {
        const decrypted = AES.decrypt(ciphertext, process.env.SECRET).toString(ENC);
        return JSON.parse(decrypted);
    } catch (error) {
        throw {error: 'faulty decryption. is your cookie invalid?', status: 401};
    }
}

