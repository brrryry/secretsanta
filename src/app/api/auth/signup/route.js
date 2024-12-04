import { signUp } from '@/lib/auth'
 
export async function POST(req, res) {
  try {
    const { username, email, password } = await req.json();
    await signUp({ username, email, password })

 
    return Response.json({ success: true }, {status: 200})
  } catch (error) {
    return Response.json({error: error.error}, {status: error.status})
  }
}
