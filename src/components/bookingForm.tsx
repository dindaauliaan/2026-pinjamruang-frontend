import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRooms } from "../api/rooms";
import { 
  TextField, 
  Button, 
  MenuItem, 
  Stack, 
  Box, 
  CircularProgress 
} from "@mui/material";

// Definisi Type untuk TypeScript agar VS Code tidak error
interface Room {
  id: number;
  name: string;
}

interface BookingFormProps {
  onSubmit: (data: any) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data ?? []);
      })
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {/* Input Nama */}
        <TextField
          label="Nama Peminjam"
          fullWidth
          variant="outlined"
          {...register("namaPeminjam", { required: "Nama wajib diisi" })}
          error={!!errors.namaPeminjam}
          helperText={errors.namaPeminjam?.message as string}
        />

        {/* Dropdown Ruangan */}
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

        {/* Input Keperluan */}
        <TextField
          label="Keperluan"
          fullWidth
          multiline
          rows={3}
          {...register("keperluan", { required: "Keperluan harus diisi" })}
          error={!!errors.keperluan}
          helperText={errors.keperluan?.message as string}
        />

        {/* Input Tanggal */}
        <TextField
          label="Tanggal Pinjam"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register("tanggal", { required: "Tanggal wajib dipilih" })}
          error={!!errors.tanggal}
          helperText={errors.tanggal?.message as string}
        />

        {/* Tombol Action */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ fontWeight: "bold", textTransform: "none", borderRadius: 2 }}
          >
            Simpan Peminjaman
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}