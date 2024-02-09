import { Button, Form, Modal } from "react-bootstrap"
import { useEffect, useRef } from "react"
import { useBudgets, } from "../context/BudgetContext"

export default function EditExpenseModal({show, handleClose, defaultBudgetId, editingExpenseId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    //use budgets hook allows access to budgets so we can map
    const { expenses, updateExpense, getBudgets, getExpenses } = useBudgets()


    useEffect(() => {
        if (editingExpenseId) {
            const editingExpense = expenses.find(e => e.id === editingExpenseId)
            if (editingExpense) {
                descriptionRef.current.value = editingExpense.description
                amountRef.current.value = editingExpense.amount
            }
           
        }
    }, [editingExpenseId, expenses])


    async function handleSubmit(e) {
        e.preventDefault()
        await updateExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value), 
            budgetId: editingExpenseId.budgetId
        }, editingExpenseId._id)
        handleClose()
        getExpenses()
        getBudgets()
    }
    
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Harcamayi güncelle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Aciklama</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Miktar</Form.Label>
                    <Form.Control ref={amountRef} type="number" required min={0} setp={0.01}/>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Ekle</Button>
                </Modal.Footer>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
