export interface Room {
    id: number
    nama: string
}

export interface Borrowing {
    id: number
    roomId: number
    room: Room
    namaPeminjam: string 
    keperluan: string
    tanggal: string
    status: "pending" | "approved" | "rejected"
    roomName: string
}
