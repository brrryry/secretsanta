import { signIn, setCookie } from '@/lib/auth'
import {encrypt} from '@/lib/data';

 
export async function POST(req, res) {
  try {
    let newRequest = await req.json();
    const {username, password} = newRequest;

    await signIn({ username, password })

    const cookieData = {
      username: username,
      time: Date.now()
    }


    const cookie = await encrypt(cookieData);



    return Response.json({success: true, cookie: cookie}, {status: 200})
  
  } catch (error) {

    return Response.json({error: error.error}, {status: error.status})
  }
}
