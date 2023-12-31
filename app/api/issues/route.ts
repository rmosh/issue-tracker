import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from 'zod';

const createIssueSchema = z.object({
    title: z.string().min(1,'title field is required').max(255),
    description: z.string().min(1,' description field is required').max(255),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createIssueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const newIssue = await prisma.issue.create({
            data: { title: body.title, Description: body.description }, // Update property names here
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
