import { useEffect, useState } from "react";
import type { Borrowing } from "../types/borrowing";
import { getBorrowings } from "../api/borrowingApi";
import BorrowingTable from "../components/borrowingTable";
import { Box, Typography, Paper, Button } from "@mui/material"; // Tambahkan import Button & Paper
import { useNavigate } from "react-router-dom";

// 1. Definisikan interface props agar menerima searchTerm dari App.tsx
interface BorrowingListProps {
  searchTerm: string;
}

function BorrowingList({ searchTerm }: BorrowingListProps) {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 2. Hapus baris "const [searchTerm, setSearchTerm] = useState("")" yang ada di sini tadi!
    // Karena kita sekarang pakai searchTerm yang dikirim dari props (Navbar).

    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

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

    // 3. Logika filter tetap sama, tapi sekarang dia pakai searchTerm dari props
    const filteredBorrowings = borrowings.filter((item) => {
    // 1. Pastikan searchTerm ada dan merupakan string, jika tidak beri string kosong
    const search = (searchTerm || "").toLowerCase();

    // 2. Gunakan optional chaining (?.) dan default value untuk properti item
    const name = (item?.namaPeminjam || "").toLowerCase();
    
    // 3. CEK ULANG: Apakah di API namanya 'roomName' atau 'room.name'? 
    // Jika item.roomName undefined, kita beri fallback string kosong
    const room = (item?.roomName || "").toLowerCase();

    const matchesSearch = name.includes(search) || room.includes(search);

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
    });

    if (loading) return <p>Loading...</p>;

    return (
        <Box sx={{ minHeight: "calc(100vh - 64px)", bgcolor: "#f5f5f5", p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Daftar Peminjaman Ruangan
            </Typography>

            {/* 4. Bungkus tombol Tambah agar tidak mepet */}
            <Box sx={{ mb: 3 }}>
                <Button 
                    variant="contained" 
                    onClick={() => navigate("/bookings/create")}
                    sx={{ bgcolor: "#1a1a1a", color: "white", "&:hover": { bgcolor: "#333" } }}
                >
                    + Tambah Peminjaman
                </Button>
            </Box>

            <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <BorrowingTable data={filteredBorrowings} />
            </Paper>
        </Box>
    );
}

export default BorrowingList;