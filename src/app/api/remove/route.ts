import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/models/database';

export async function DELETE(req: NextRequest) {
    try {
        const { date } = await req.json();

        Database.topUpRequests.remove(date);

        return NextResponse.json({ message: 'Запрос пополнения успешно удалён' });
    } catch (err) {
        return NextResponse.json({ error: 'Ошибка при удалении запроса пополнения' + err }, { status: 500 });
    }
}