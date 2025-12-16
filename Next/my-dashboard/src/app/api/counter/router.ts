import { NextResponse } from "next/server";

export async function GET(reuqest:Request){


    return NextResponse.json({
        count:100
    });
}