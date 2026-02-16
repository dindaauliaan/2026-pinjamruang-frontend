import { useEffect, useState } from "react";
import type { Borrowing } from "../types/borrowing";
import { getBorrowings } from "../api/borrowingApi";
import BorrowingTable from "../components/borrowingTable";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BorrowingList() {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBorrowings();
    }, []);

    const fetchBorrowings = async () => {
        try {
        const data = await getBorrowings();
        setBorrowings(data);
        } catch (error) {
        console.error("Gagal mengambil data peminjaman", error);
        } finally {
        setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
    <Box
        sx={{
        minHeight: "100vh",   // 🔥 penting
        bgcolor: "#f5f5f5",
        p: 3                  // kasih padding biar tidak mepet
        }}
    >
        <h2 style={{ marginBottom: "20px" }}>
        Daftar Peminjaman Ruangan
        </h2>

        <Box
        sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: 2,
            boxShadow: 1
        }}
        >
        <button onClick={() => navigate("/bookings/create")}>
        + Tambah Peminjaman
        </button>
        <BorrowingTable data={borrowings} />
        </Box>
    </Box>
    );

}

export default BorrowingList;

