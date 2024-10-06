import { BaseEntity } from "@/models/database/Entity";
import { TopUpEntity } from "@/models/database/TopUpRequests";
import { NextResponse } from "next/server";

export const fetchTopUpRequests = async (): Promise<BaseEntity<TopUpEntity>[]> => {
    const response = await fetch(`/api/get-all`);
    if (!response.ok) {
        throw new Error('Ошибка при получении запросов пополнения.');
    }
    return response.json();
};

export const createTopUpRequest = async (amount: number, selectedUserId: string): Promise<NextResponse> => {
    const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, selectedUserId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при создании запроса пополнения.');
    }

    return response.json();
};

export const removeTopUpRequest = async (date: Date): Promise<NextResponse> => {
    const response = await fetch('/api/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при удалении запроса пополнения.');
    }

    return response.json();
};