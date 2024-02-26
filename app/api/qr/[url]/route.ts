import { createQRCode } from "@/lib/qr";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * /api/qr/{url}:
 *  get:
 *   summary: Get QR code using url
 *   tags:
 *    - qr
 *   parameters:
 *     - in: path
 *       name: url
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: NextRequest, { params }: { params: { url: string } }) {
    const { url } = params;
    const qr = await createQRCode(url);
    return NextResponse.json(qr, { status: 200 });
}