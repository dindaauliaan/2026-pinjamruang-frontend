import Navbar from "./components/navbar";
import './App.css'
import BorrowingList from "./pages/BorrowingList"



function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: 0, padding: 0 }}>
      <Navbar />
      <BorrowingList />
    </div>
  )
}
export default App
