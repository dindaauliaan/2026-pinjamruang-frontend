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
} from "@mui/material";
import type { Borrowing } from "../types/borrowing";

interface Props {
    data: Borrowing[];
}

function BorrowingTable({ data }: Props) {
    if (data.length === 0) {
        return <p>Tidak ada data peminjaman.</p>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "success";
            case "rejected":
                return "error";
            case "pending":
                return "warning";
            default:
                return "default";
        }
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} stickyHeader>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#1976d2' }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Nama Peminjam</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Ruangan</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Tanggal</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Keperluan</TableCell>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                                <TableCell>{item.namaPeminjam || "-"}</TableCell>
                                <TableCell>{item.roomName}</TableCell>
                                <TableCell>
                                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </TableCell>
                                <TableCell>{item.keperluan}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.status}
                                        color={getStatusColor(item.status) as any}
                                        variant="filled"
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BorrowingTable;
