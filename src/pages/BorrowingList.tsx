import { useEffect, useState } from "react";
import type { Borrowing } from "../types/borrowing";
import { getBorrowings } from "../api/borrowingApi";
import BorrowingTable from "../components/borrowingTable";

function BorrowingList() {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [loading, setLoading] = useState(true);

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
        <div style={{ padding: "20px" }}>
        <h2>Daftar Peminjaman Ruangan</h2>

        <BorrowingTable data={borrowings} />
        </div>
    );
}

export default BorrowingList;
