import { Database } from "@/models/database"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

interface PaymentModalProps {
  handleCreate: (data: { amount: number; selectedUserId: string }) => void
}

function PaymentModal({ handleCreate }: PaymentModalProps) {
  const [selectedUserId, setSelectedUserId] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState(1);

  const handleShow = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);


  return (
    <>
      <button className="btn btn-primary btn-sm"
        onClick={handleShow}
      >
        Создать новую заявку
      </button>
      <Modal show={modalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание новой заявки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="userSelect" className="form-label">Выберите пользователя</label>
            <select
              id="userSelect"
              className="form-select"
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option disabled value="">Выберите пользователя</option>
              {Database.users.getAll().map(user => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="amountSlider" className="form-label">Выберите сумму (слайдер)</label>
            <input
              type="range"
              id="amountSlider"
              className="form-range"
              min="1"
              max="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div>Текущая сумма: {amount}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button disabled={!selectedUserId} variant="primary" onClick={() => {

            handleCreate({ amount, selectedUserId })
            handleClose()
          }
          } >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PaymentModal