import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SyncModel from "@/model/sync.model";

export async function POST(request: Request) {
    const { 
        id, 
        oldId,
        settings,
        bangs,
    } = await request.json();

    try {
        connectDB();

        if (oldId) {
            await SyncModel.findOneAndDelete({ syncId: oldId });
        }

        if (!id) {
            return new NextResponse(null, { status: 400 });
        }

        await new SyncModel({
            syncId: id,
            settings,
            bangs
        }).save();
    } catch (error) {
        console.error("Error occurred while syncing data:", error);
        return new NextResponse(null, { status: 500 });
    }

    return NextResponse.json({
        message: "Sync data received",
        id,
        oldId,
        settings,
        bangs,
    }, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
        },
    });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return new NextResponse(null, { status: 400 });
    }

    try {
        connectDB();

        const syncData = await SyncModel.findOne({ syncId: id });

        if (!syncData) {
            return new NextResponse(null, { status: 404 });
        }

        return NextResponse.json(syncData, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Error occurred while fetching sync data:", error);
        return new NextResponse(null, { status: 500 });
    }
}