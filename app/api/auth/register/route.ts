import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbUsers } from "@/lib/mongo";
export async function POST(request: Request) {
    const body = await request.json();
    const username = body.username;
    const password = await bcrypt.hash(body.password, 10);
    const checkUserExists = await dbUsers.findOne({ username: username });
    if (checkUserExists) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }
    const userId = await dbUsers.insertOne({ username: username, password: password }).then((result) => result.insertedId);
    if (userId) {
        return NextResponse.json({ message: "User created" }, { status: 201 });
    }
    return NextResponse.json({ message: "Error" }, { status: 500 });
}