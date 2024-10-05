'use client'

import { Database } from '@/models/database';
import { BaseEntity } from '@/models/database/Entity';
import { TopUpEntity } from '@/models/database/TopUpRequests';
import React, { memo, useCallback, useEffect, useState } from 'react'
import PaymentModal from './PaymentModal';
import TableHeaderCell from './TableHeaderCell';


type PaymentsTableProps = {
  allTopUps: BaseEntity<TopUpEntity>[]
  total: number
};

function PaymentsTable({ allTopUps, total }: PaymentsTableProps) {
  const [rows, setRows] = useState(allTopUps);
  const [totalAmount, setTotalAmount] = useState(total);

  const handleRemove = (date: string) => {
    Database.topUpRequests.remove(date);
    setRows((prev) => prev.filter((i) => i.createDate.toLocaleString() !== date))
  };

  const handleCreate = useCallback((({ amount, selectedUserId }: any) => {
    const newItem: TopUpEntity = {
      accountId: Math.random(),
      amount: amount,
      userId: Number(selectedUserId)
    }
    Database.topUpRequests.add(newItem, Number(selectedUserId));
    setRows(() => [...Database.topUpRequests.getAll()])
  }), [])

  useEffect(() => {
    setTotalAmount(rows.reduce((prev, curr) => prev + (curr.amount ?? 0), 0))
  }, [rows])

  return (
    <>
      <table className="table">
        <thead>
          <tr className='table_header'>
            <TableHeaderCell text="Дата" tooltip="topUpRequest.createDate" />
            <TableHeaderCell text="Пользователь" tooltip="user.userName" />
            <TableHeaderCell text="Аккаунт ID" tooltip="account.tfAccountId" />
            <TableHeaderCell text="Сумма (Аккаунт)" tooltip="account.amount" />
            <TableHeaderCell text="Тип" tooltip="account.type" />
            <TableHeaderCell text="Сумма (Пополнения)" tooltip="topUpRequest.amount" />
            <th>Действия</th>
          </tr>

        </thead>
        <tbody>
          {rows.map((item, idx) => {
            const acc = Database.accounts.getById(item.id);
            const user = Database.users.getById(item.id);
            return (
              <tr key={idx}>
                <td>{item.createDate.toLocaleString()}</td>
                <td>{user?.userName}</td>
                <td>{acc?.tfAccountId}</td>
                <td>{acc?.amount}</td>
                <td>{acc?.type}</td>
                <td>{item.amount}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.createDate.toLocaleString())}
                  >
                    удалить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      <div className='d-flex justify-content-between'>
        <h5>Общая сумма: {totalAmount}</h5>
        <PaymentModal handleCreate={handleCreate} />
      </div>
    </>

  )
}

export default memo(PaymentsTable)

