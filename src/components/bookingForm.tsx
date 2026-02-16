import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRooms } from "../api/rooms";
import { useParams } from "react-router-dom";
import { updateBorrowing } from "../api/borrowingApi";
import { toast } from "react-toastify";
import { 
    TextField, 
    Button, 
    MenuItem, 
    Stack, 
    Box, 
    CircularProgress 
} from "@mui/material";

// 1. Definisi Type harus di luar komponen
interface Room {
    id: number;
    name: string;
}

interface BookingFormProps {
    onSubmit: (data: any) => void;
    initialData?: any; // Tambahan untuk mempassing data lama saat edit
}

export default function BookingForm({ onSubmit, initialData }: BookingFormProps) {
    // 2. SEMUA HOOKS harus di dalam fungsi komponen
    const { id } = useParams();
    const isEditMode = Boolean(id);
    
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset, // Digunakan untuk mengisi form saat edit
        formState: { errors },
    } = useForm();

    // 3. Effect untuk mengambil daftar ruangan
    useEffect(() => {
        getRooms()
            .then((res) => {
                setRooms(res.data ?? []);
            })
            .catch(() => setRooms([]))
            .finally(() => setLoading(false));
    }, []);

    // 4. Effect untuk mengisi form jika dalam mode EDIT
    useEffect(() => {
        if (isEditMode && initialData) {
            reset(initialData);
        }
    }, [initialData, reset, isEditMode]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
                <TextField
                    label="Nama Peminjam"
                    fullWidth
                    {...register("namaPeminjam", { required: "Nama wajib diisi" })}
                    error={!!errors.namaPeminjam}
                    helperText={errors.namaPeminjam?.message as string}
                />

                <TextField
                    select
                    label="Pilih Ruangan"
                    fullWidth
                    defaultValue=""
                    {...register("roomId", { 
                        required: "Silakan pilih ruangan", 
                        valueAsNumber: true 
                    })}
                    error={!!errors.roomId}
                    helperText={errors.roomId?.message as string}
                >
                    {loading ? (
                        <MenuItem disabled><CircularProgress size={20} /></MenuItem>
                    ) : (
                        rooms.map((room) => (
                            <MenuItem key={room.id} value={room.id}>
                                {room.name}
                            </MenuItem>
                        ))
                    )}
                </TextField>

                <TextField
                    label="Keperluan"
                    fullWidth
                    multiline
                    rows={3}
                    {...register("keperluan", { required: "Keperluan harus diisi" })}
                    error={!!errors.keperluan}
                    helperText={errors.keperluan?.message as string}
                />

                <TextField
                    label="Tanggal Pinjam"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("tanggal", { required: "Tanggal wajib dipilih" })}
                    error={!!errors.tanggal}
                    helperText={errors.tanggal?.message as string}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ fontWeight: "bold", textTransform: "none", borderRadius: 2 }}
                >
                    {isEditMode ? "Perbarui Peminjaman" : "Simpan Peminjaman"}
                </Button>
            </Stack>
        </Box>
    );
}