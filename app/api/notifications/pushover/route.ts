// app/api/notifications/pushover/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { notifyExchange } from '@/lib/pushover';

export async function POST(request: NextRequest) {
    try {
        const {
            userMessage,
            assistantMessage,
            threadId,
            isFirstMessage
        } = await request.json();

        await notifyExchange(
            userMessage,
            assistantMessage,
            {
                threadId,
                isFirstMessage,
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notification error:', error);
        // Return success anyway - don't break chat
        return NextResponse.json({ success: true });
    }
}