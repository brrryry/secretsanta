import { checkCode } from '@/lib/auth'
 
export async function POST(req, res) {
  try {
    const {code} = await req.json();


    await checkCode({ code })
    return Response.json({ success: true }, {status: 200})
  } catch (error) {
    return Response.json({error: error.error}, {status: error.status})
  }
}
