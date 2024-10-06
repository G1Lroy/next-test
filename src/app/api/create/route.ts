import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/models/database';
import { TopUpEntity } from '@/models/database/TopUpRequests';

export async function POST(req: NextRequest) {
    try {
        const { amount, selectedUserId } = await req.json();

        const newItem: TopUpEntity = {
            accountId: (Math.random() * 100),
            amount: amount,
            userId: Number(selectedUserId),
        };

        Database.topUpRequests.add(newItem, Number(selectedUserId));

        return NextResponse.json({ message: 'Запрос пополнения успешно создан' }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Ошибка при создании запроса пополнения' + err }, { status: 500 });
    }
}