import { getUsers } from "@/lib/data";


export async function GET(req, {params}) {
    try {

        const userData = await getUsers();

        return Response.json(userData, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.error }, { status: error.status });
    }
}