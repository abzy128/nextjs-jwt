import { dbCarousel } from "@/lib/mongo";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/carousel:
 *  post:
 *   summary: Create a new carousel item
 *   tags:
 *    - carousel
 *   responses:
 *    200:
 *     description: Success
 *   500:
 *     description: Internal server error
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 * 
 */
export async function POST(
    request: Request) {
    const carousel = await request.json();
    if (!(carousel.description && carousel.title && carousel.image)) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const result = await dbCarousel.insertOne(carousel);
        if (!result) {
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
        const insertedItem = await dbCarousel.findOne({ _id: result.insertedId });
        return NextResponse.json(insertedItem, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
/**
 * @swagger
 * /api/carousel:
 *  get:
 *   summary: Get all carousel items
 *   tags:
 *    - carousel
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: Request) {
    try {
        const carousel = await dbCarousel.find().toArray();
        if (!carousel) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        return NextResponse.json(carousel, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}