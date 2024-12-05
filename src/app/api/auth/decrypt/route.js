import { decrypt } from "@/lib/data";

export async function POST(req, res) {
    //decrypt string
    let newRequest = await req.json();
    const {ciphertext} = newRequest;

    try {
        let data = await decrypt(ciphertext);
        return Response.json(data, {status: 200});
    } catch(error) {
        return Response.json({error: error.error}, {status: error.status});
    }
}
