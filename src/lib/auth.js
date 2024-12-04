import {promises as fs} from 'fs';
import bcrypt from 'bcrypt';
import {uuid} from 'uuidv4';

import {addUserData, getUserData} from './data.js';


const saltRounds = 10;

export async function checkCode({code}) {
    //get code in data/conf.json
    const correctCode = process.env.CORRECT_CODE;

    console.log(correctCode);

    const codeMatch = await bcrypt.compare(code, correctCode);

    if(codeMatch) return true;
    
    throw ({error: 'invalid code', status: 401});
}

export async function signIn({username, password}) {
    const userData = await getUserData(username, true);

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if(passwordMatch) return true;

    throw ({error: 'invalid user (or password)', status: 401});
}

export async function signUp({username, email, password}) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        username: username,
        email: email,
        password: hashedPassword
    }

    await addUserData(userData);
}