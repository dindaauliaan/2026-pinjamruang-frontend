import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import BorrowingList from "./pages/BorrowingList";
import BookingCreate from "./pages/BookingCreate";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/bookings" replace />} />
        <Route path="/bookings" element={<BorrowingList />} />
        <Route path="/bookings/create" element={<BookingCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
