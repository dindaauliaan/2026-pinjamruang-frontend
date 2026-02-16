import axios from "axios";
import type { Borrowing } from "../types/borrowing";

// 1. Tentukan Base URL
const API_URL = "http://localhost:5281/borrowings";

// 2. Fungsi GET Semua Data
export const getBorrowings = async (
    status?: string,
    nama?: string
): Promise<Borrowing[]> => {
    const params: any = {};
    if (status) params.status = status;
    if (nama) params.nama_peminjam = nama;

    const response = await axios.get(API_URL, { params });
    return response.data;
};

// 3. Fungsi POST (Tambah Data)
export const createBorrowing = async (data: Omit<Borrowing, "id">) => {
    return axios.post(API_URL, data);
};

// 4. Fungsi GET Detail (Untuk Mode Edit)
export const getBorrowingById = (id: number) => {
    // Diganti dari axiosInstance ke axios agar tidak error
    return axios.get(`${API_URL}/${id}`); 
};

// 5. Fungsi PUT (Update Data)
export const updateBorrowing = async (
    id: number,
    data: Omit<Borrowing, "id" | "room" | "status" | "roomName">
) => {
    return axios.put(`${API_URL}/${id}`, data);
};

// 6. Fungsi DELETE
export const deleteBorrowing = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};