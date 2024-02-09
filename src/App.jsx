import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useEffect, useState } from "react"
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import EditBudgetModal from "./components/EditBudgetModal";
import EditExpenseModal from "./components/EditExpenseModal";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(null)
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
  const [editingBudgetId, setEditingBudgetId] = useState(null)
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false)
  const [editingExpenseId, setEditingExpenseId] = useState(null)


  const { budgets, getBudgets, getBudgetExpenses, } = useBudgets()

  function openEditBudgetModalId(budgetId) {
    setShowEditBudgetModal(true)
    setEditingBudgetId(budgetId)
  }

  function openEditExpenseModalId(expense) {
    setShowEditExpenseModal(true)
    setEditingExpenseId(expense)
  }

  function openAddExpenseModalId(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  } 


  useEffect(() => {
    getBudgets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
        <>  
          <Container className='my-4'>
            <Stack direction="horizontal" gap="2" className="mb-4">
              <h1 className='me-auto'>Hesap Kitap</h1>
              <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Bütçe ekle</Button>
              <Button variant='outline-primary' onClick={() => setShowAddExpenseModal(true)}>Harcama ekle</Button>
            </Stack>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start"
              }}
            >
              {budgets.map( budget => {
                if(budget.name !== "Kategorisiz Bütçe") {
                const exp = getBudgetExpenses(budget._id)
                const amount = exp ? exp.reduce((total, e) => total + e.amount, 0) : 0
                return(
                  <BudgetCard 
                  key={budget._id} 
                  name={budget.name} 
                  amount={amount} 
                  max={budget.max} 
                  onAddExpenseClick ={() => openAddExpenseModalId(budget._id)}
                  onViewExpensesClick ={() => setViewExpensesModalBudgetId(budget._id)}
                  />
                )
                }
                return null
              })}
              <UncategorisedBudgetCard 
                onAddExpenseClick={() =>
                   openAddExpenseModalId(UNCATEGORISED_BUDGET_ID)} 
                onViewExpensesClick ={() => 
                  setViewExpensesModalBudgetId(UNCATEGORISED_BUDGET_ID)}
              />
              <TotalBudgetCard />
            </div>
          </Container>
          <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
          <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => {
            setShowAddExpenseModal(false)
            setAddExpenseModalBudgetId()
            }}/>
            <ViewExpensesModal openEdit={openEditBudgetModalId} openEditExpense={openEditExpenseModalId} budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId(null)}  />
            <EditBudgetModal show={showEditBudgetModal}  handleClose={() => {
              setShowEditBudgetModal(false)
              setEditingBudgetId(null)
            }}
            editingBudgetId={editingBudgetId}
              />
            <EditExpenseModal show={showEditExpenseModal} handleClose={() => {
              setShowEditExpenseModal(false)
              setEditingExpenseId(null)
            }}
            editingExpenseId={editingExpenseId}
            />

        </>
      );
    }
    export default App;













