import { dbCarousel } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/carousel/{id}:
 *  get:
 *   summary: Get cariusel item by id
 *   tags:
 *    - carousel
 *   parameters:
 *     - in: path
 *       name: id
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
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const carousel = await dbCarousel.findOne({ "_id": new ObjectId(id) });
    if (!carousel) {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(carousel, { status: 200 });
}
/**
 * @swagger
 * /api/carousel/{id}:
 *  put:
 *   summary: Update a carousel item by id
 *   tags:
 *    - carousel
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
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
 */
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, image } = await request.json();
    if (!(id && title && description && image)) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const carouselFromDb = await dbCarousel.findOne({ "_id": new ObjectId(id) });
        if (!carouselFromDb) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    try {
        await dbCarousel.updateOne({ "_id": new ObjectId(id) }, { $set: { "title": title, "description": description, "image": image } });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
/**
 * @swagger
 * /api/carusel/{id}:
 *  delete:
 *   summary: Delete a carousel item by id
 *   tags:
 *    - carousel
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const carouselFromDb = await dbCarousel.findOne({ "_id": new ObjectId(id) });
        if (!carouselFromDb) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        await dbCarousel.deleteOne({ "_id": new ObjectId(id) });
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}