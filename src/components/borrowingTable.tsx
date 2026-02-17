import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Box, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, Stack,Typography, IconButton, Tooltip} 
from "@mui/material";
import type { Borrowing } from "../types/borrowing";
import { useNavigate } from "react-router-dom";
import { deleteBorrowing, updateBorrowingStatus } from "../api/borrowingApi";
import { toast } from "react-toastify";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
    data: Borrowing[];
}

function BorrowingTable({ data }: Props) {
    const navigate = useNavigate();
    
    // --- STATE UNTUK DELETE ---
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // --- STATE UNTUK STATUS (Approve/Reject) ---
    const [openStatus, setOpenStatus] = useState(false);
    const [statusId, setStatusId] = useState<number | null>(null);
    const [targetStatus, setTargetStatus] = useState<"approved" | "rejected" | null>(null);

    if (data.length === 0) return <p>Tidak ada data peminjaman.</p>;

    // --- HANDLER DELETE ---
    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteBorrowing(deleteId);
                toast.success("Data berhasil dihapus");
                window.location.reload(); 
            } catch (error) {
                toast.error("Gagal menghapus data");
            }
        }
        setOpenDelete(false);
    };

    // --- HANDLER STATUS ---
    const handleOpenStatusDialog = (id: number, status: "approved" | "rejected") => {
        setStatusId(id);
        setTargetStatus(status);
        setOpenStatus(true);
    };

    const confirmStatusUpdate = async () => {
        if (!statusId || !targetStatus) return;
        try {
            await updateBorrowingStatus(statusId, targetStatus);
            toast.success(`Status berhasil diperbarui menjadi ${targetStatus}`);
            window.location.reload(); // Menggunakan reload agar data terbaru ditarik dari API
        } catch {
            toast.error("Gagal memperbarui status");
        }
        setOpenStatus(false);
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Nama Peminjam</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Ruangan</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Keperluan</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Persetujuan</TableCell>
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
                                        size="small"
                                        color={item.status === "approved" ? "success" : item.status === "rejected" ? "error" : "warning"} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        {item.status === "pending" ? (
                                            <>
                                                <Tooltip title="Setujui">
                                                    <IconButton 
                                                        color="success" 
                                                        onClick={() => handleOpenStatusDialog(item.id, "approved")}
                                                    >
                                                        <CheckCircleIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Tolak">
                                                    <IconButton 
                                                        color="error" 
                                                        onClick={() => handleOpenStatusDialog(item.id, "rejected")}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <Typography variant="caption" color="text.secondary">Selesai</Typography>
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="contained" size="small" onClick={() => navigate(`/edit/${item.id}`)}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteClick(item.id)}>
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- DIALOG KONFIRMASI HAPUS --- */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogContent>Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Batal</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>Hapus</Button>
                </DialogActions>
            </Dialog>

            {/* --- DIALOG KONFIRMASI STATUS (APPROVE/REJECT) --- */}
            <Dialog open={openStatus} onClose={() => setOpenStatus(false)}>
                <DialogTitle>Konfirmasi Status</DialogTitle>
                <DialogContent>
                    Apakah Anda yakin ingin {targetStatus === "approved" ? "menyetujui" : "menolak"} peminjaman ini?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenStatus(false)}>Batal</Button>
                    <Button 
                        color={targetStatus === "approved" ? "success" : "error"} 
                        variant="contained" 
                        onClick={confirmStatusUpdate}
                    >
                        Ya, {targetStatus === "approved" ? "Setujui" : "Tolak"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default BorrowingTable;