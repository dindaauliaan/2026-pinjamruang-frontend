import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingList from "./pages/BorrowingList";
import BookingCreate from "./pages/BookingCreate";
import BookingEdit from "./pages/BookingEdit"; // 👈 PASTIKAN BARIS INI ADA
import BorrowingList from "./pages/BorrowingList";
import Navbar from "./components/navbar";
import { useState } from "react";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/bookings" element={<BorrowingList searchTerm={searchTerm} />} />
        <Route path="/bookings/create" element={<BookingCreate />} />
        {/* Route untuk edit */}
        <Route path="/edit/:id" element={<BookingEdit />} /> 
        <Route path="/bookings" element={
            // Oper searchTerm ke BookingList untuk memfilter data
            <BookingList searchTerm={searchTerm} /> 
        } />

      </Routes>
    </Router>
  );
}

export default App;