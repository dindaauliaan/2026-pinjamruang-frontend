import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingList from "./pages/BorrowingList";
import BookingCreate from "./pages/BookingCreate";
import BookingEdit from "./pages/BookingEdit"; // 👈 PASTIKAN BARIS INI ADA
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/create" element={<BookingCreate />} />
        {/* Route untuk edit */}
        <Route path="/edit/:id" element={<BookingEdit />} /> 
      </Routes>
    </Router>
  );
}

export default App;