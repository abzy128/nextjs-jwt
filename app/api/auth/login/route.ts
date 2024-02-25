import { NextResponse } from "next/server";
import { getJWTToken } from "@/lib/auth";
import bcrypt from "bcrypt";
import { dbUsers } from "@/lib/mongo";
export async function POST(request: Request) {
    const body = await request.json();
    const username = body.username;
    const password = body.password
    const user = await dbUsers.findOne({ username: username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = await getJWTToken(username);
        const oneHourInSeconds = 60 * 60;
        const expirationDate = new Date(Date.now() + oneHourInSeconds * 1000);
        return new NextResponse("Logged in", {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; Expires=${expirationDate.toUTCString()}; HttpOnly; Path=/; SameSite=Strict; Secure`,
            },
        });
    }
    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
}