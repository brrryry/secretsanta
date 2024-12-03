import { signIn } from '@/lib/auth'
 
export async function POST(req, res) {
  try {
    const { email, password } = req.body
    await signIn('credentials', { email, password })

 
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error);
    if (error.type === 'CredentialsSignin') {
    
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {status: 401})
    } else {
      return new Response(JSON.stringify({ error: 'An error occurred' }), {status: 500})
    }
  }
}
