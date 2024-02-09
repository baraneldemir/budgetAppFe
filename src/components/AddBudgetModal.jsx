import { Button, Form, Modal } from "react-bootstrap"
import { useBudgets } from "../context/BudgetContext"
import { useRef } from "react"

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const { addBudget, getBudgets } = useBudgets()

    async function handleSubmit(e) {
        // dont reload the page form when clicked button page wont updated
        e.preventDefault()
        await addBudget({
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
                <Modal.Title>Yeni harcama kalemi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Isim</Form.Label>
                    <Form.Control ref={nameRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Maximum Bütçe</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="primary" type="submit">Ekle</Button>
                </Modal.Footer>
        </Form>
    </Modal>
  )
}

