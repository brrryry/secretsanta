export function signIn(p1, {username, password}) {
    console.log("Signin triggered.");
    throw new Error({type: 'CredentialsSignin'});
}