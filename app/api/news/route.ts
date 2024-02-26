import { getNews } from "@/lib/news";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 *  /api/news:
 *    get:
 *      summary: Get news
 *      tags: [news]
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */
export async function GET(
    request: NextRequest) {
    const news = await getNews();
    return NextResponse.json(news, { status: 200 });
}