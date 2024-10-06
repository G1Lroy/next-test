import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/models/database';
import { setCookie } from 'cookies-next';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const isAuthenticated = await Database.authenticate(username, password);

        if (!isAuthenticated) {
            return NextResponse.json({ message: 'Логин или пароль неверен' }, { status: 401 });
        }

        const response = NextResponse.json({ message: 'Login successful' });
        setCookie('userToken', username, {
            req,
            res: response,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        return response;
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
