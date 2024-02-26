import { SignJWT, jwtVerify } from "jose";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}
const jwtSecretKey = new TextEncoder().encode(JWT_SECRET);

export async function getJWTToken(userId: string) {
    const jwt = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer("https://github.com/abzy128/")
        .setExpirationTime("1h")
        .sign(jwtSecretKey);
    return jwt;
}

export async function verifyJWTToken(token: string) {
    return await jwtVerify(token, jwtSecretKey, {
        issuer: "https://github.com/abzy128/",
        algorithms: ["HS256"],
    });
}
export async function checkIfAdmin(token: string): Promise<boolean> {
    const username = (await verifyJWTToken(token)).payload.userId;
    return username === "admin";
}