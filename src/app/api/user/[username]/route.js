import { getUserData } from "@/lib/data";


export async function GET(req, {params}) {
    try {
        const username = (await params).username;

        const userData = await getUserData(username);

        return Response.json(userData, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.error }, { status: error.status });
    }
}