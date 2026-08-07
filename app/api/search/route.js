import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
        return NextResponse.json([]);
    }

    const users = await User.aggregate([
        {
            $match: {
                profileUpdated: true,
                username: {
                    $regex: `^${q}`,
                    $options: "i"
                }
            }
        },
        {
            $project: {
                _id: 0,
                username: 1,
                profilepic: 1,
                name: 1
            }
        },
        {
            $limit: 5
        }
    ]);

    return NextResponse.json(users);
}