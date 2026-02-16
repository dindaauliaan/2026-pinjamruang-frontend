import { useNavigate } from "react-router-dom";
import BookingForm from "../components/bookingForm";
import { createBorrowing } from "../api/borrowingApi";
import { toast } from "react-toastify";
import { Box, Container, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BookingCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (data: any) => {
        try {
        await createBorrowing(data);
        toast.success("Peminjaman berhasil disimpan!");
        navigate("/bookings");
        } catch (err) {
        console.error(err);
        toast.error("Gagal menyimpan peminjaman");
        }
    };

    return (
        <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f4f6f8", // Warna background abu-abu soft
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
            {/* Tombol Kembali */}
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
                Pinjam Ruangan Baru
            </Typography>

            <BookingForm onSubmit={handleSubmit} />
            </Paper>
        </Container>
        </Box>
    );
}