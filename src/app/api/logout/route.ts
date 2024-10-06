import { deleteCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = NextResponse.json({ message: 'Logout successful' });
    deleteCookie('userToken', { req, res: response });
    return response
}