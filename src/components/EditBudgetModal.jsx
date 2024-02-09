import { Button, Form, Modal } from "react-bootstrap"
import { useBudgets } from "../context/BudgetContext"
import { useEffect, useRef } from "react"

export default function EditBudgetModal({show, handleClose, editingBudgetId,}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const { budgets, updateBudget, getBudgets } = useBudgets()

    useEffect(() => {
        if (editingBudgetId) {
            const editingBudget = budgets.find(b => b.id === editingBudgetId)
            if (editingBudget) {
                nameRef.current.value = editingBudget.name
                maxRef.current.value = editingBudget.max
            }
        }
    }, [editingBudgetId, budgets])

    async function handleSubmit(e) {
        // dont reload the page form when clicked button page wont updated
        e.preventDefault()
        await updateBudget({
            _id: editingBudgetId,
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        }) 
        handleClose()
        getBudgets()
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Update Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                </Form.Group>
                <Modal.Footer>
                     <Button variant="primary" type="submit">Add</Button>
                </Modal.Footer>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

