import axios from "axios"
import type { Borrowing } from "../types/borrowing";



const API_URL = "http://localhost:5281/borrowings"

export const getBorrowings = async (
    status?: string,
    nama?: string
): Promise<Borrowing[]> => {
    const params: any = {}
    if (status) params.status = status
    if (nama) params.nama_peminjam = nama

    const response = await axios.get(API_URL, { params })
    return response.data
}

export const createBorrowing = async (data: Omit<Borrowing, "id">) => {
    return axios.post(API_URL, data)
}

export const updateBorrowingStatus = async (id: number, status: string) => {
    return axios.put(`${API_URL}/${id}/status`, { status })
}
