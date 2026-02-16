import { useState } from "react"; // 🔥 Ditambahkan
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Box,
    Button,
    Dialog,        // 🔥 Ditambahkan
    DialogTitle,   // 🔥 Ditambahkan
    DialogContent, // 🔥 Ditambahkan
    DialogActions,
    Stack, // // 🔥 Ditambahkan
} from "@mui/material";
import type { Borrowing } from "../types/borrowing";
import { useNavigate } from "react-router-dom";
import { deleteBorrowing } from "../api/borrowingApi"; // 🔥 Pastikan import ini ada
import { toast } from "react-toastify";             // 🔥 Pastikan import ini ada

interface Props {
    data: Borrowing[];
}

function BorrowingTable({ data }: Props) {
    const navigate = useNavigate();
    
    // 1. State harus di dalam fungsi komponen
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (data.length === 0) {
        return <p>Tidak ada data peminjaman.</p>;
    }

    // 2. Handler Fungsi di dalam komponen
    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedId) {
            try {
                await deleteBorrowing(selectedId);
                toast.success("Data berhasil dihapus");
                // Daripada reload satu halaman, lebih baik panggil ulang fungsi fetch data jika ada
                window.location.reload(); 
            } catch (error) {
                toast.error("Gagal menghapus data");
            }
        }
        setOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved": return "success";
            case "rejected": return "error";
            case "pending":  return "warning";
            default:         return "default";
        }
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            {/* Sesuaikan warna header agar teks terlihat */}
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Nama Peminjam</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Ruangan</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Keperluan</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                                <TableCell>{item.namaPeminjam || "-"}</TableCell>
                                <TableCell>{item.roomName}</TableCell>
                                <TableCell>
                                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                        day: "numeric", month: "long", year: "numeric",
                                    })}
                                </TableCell>
                                <TableCell>{item.keperluan}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={item.status} 
                                        color={getStatusColor(item.status) as any} 
                                        size="small" 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/edit/${item.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteClick(item.id)} // 🔥 Gunakan fungsi yang benar
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 3. Dialog ditaruh sekali saja di luar table, bukan di dalam loop map */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>
                    Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Batal</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default BorrowingTable;