import { Database } from '@/models/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const topUpRequests = Database.topUpRequests.getAll();
        return NextResponse.json(topUpRequests);
    } catch (error) {
        console.error('Error fetching top-up requests:', error); 
        return NextResponse.json({ error: 'Internal server error: ' + String(error) }, { status: 500 });
    }
}