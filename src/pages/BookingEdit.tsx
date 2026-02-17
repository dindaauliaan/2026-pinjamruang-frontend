import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/bookingForm";
import { updateBorrowing, getBorrowingById } from "../api/borrowingApi";
import { toast } from "react-toastify";
import { Box, Container, Paper, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BookingEdit() {
    const { id } = useParams(); // Mengambil ID dari URL (/edit/3)
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ambil data lama saat halaman dimuat
    useEffect(() => {
        const loadData = async () => {
            try {
                if (id) {
                    const res = await getBorrowingById(Number(id));
                    setInitialData(res.data);
                }
            } catch (err) {
                toast.error("Gagal mengambil data peminjaman");
                navigate("/bookings"); // Lempar balik ke list jika data tidak ditemukan
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, navigate]);

    // Fungsi untuk handle submit update
    const handleUpdate = async (data: any) => {
        try {
            await updateBorrowing(Number(id), data);
            toast.success("Peminjaman berhasil diperbarui!");
            navigate("/bookings"); // Kembali ke tabel setelah sukses
        } catch (err) {
            console.error(err);
            toast.error("Gagal memperbarui peminjaman");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f4f6f8", 
                p: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper 
                    elevation={4} 
                    sx={{ 
                        p: 4, 
                        borderRadius: 4,
                        position: "relative"
                    }}
                >
                    {/* Tombol Back */}
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ position: "absolute", left: 16, top: 16 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{ fontWeight: "bold", mb: 4, color: "#1976d2" }}
                    >
                        Edit Peminjaman
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <BookingForm onSubmit={handleUpdate} initialData={initialData} />
                    )}
                </Paper>
            </Container>
        </Box>
    );
}