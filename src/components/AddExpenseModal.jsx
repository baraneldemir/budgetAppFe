import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets, UNCATEGORISED_BUDGET_ID } from "../context/BudgetContext"

export default function AddExpenseModal({show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    //use budgets hook allows access to budgets so we can map
    const { budgets, addExpense, getBudgets, getExpenses } = useBudgets()




    async function handleSubmit(e) {
        e.preventDefault()
        await addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value), 
            budgetId: budgetIdRef.current.value
        })
        handleClose()
        getExpenses()
        getBudgets()

    }
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Harcama</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Harcama ismi</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Miktar</Form.Label>
                    <Form.Control ref={amountRef} type="number" required min={0} setp={0.01}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId">
                    <Form.Label>Harcama Kalemi Seç</Form.Label>
                    <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                        <option id={UNCATEGORISED_BUDGET_ID}>Diger</option>
                        {budgets.map(budget => (
                            <option key={budget._id} value={budget._id}>
                                {budget.name}
                            </option>
                        ))}

                    </Form.Select>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Ekle</Button>
                </Modal.Footer>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
