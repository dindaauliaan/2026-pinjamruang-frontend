import type { Borrowing } from "../types/borrowing";

interface Props {
    data: Borrowing[];
}

function BorrowingTable({ data }: Props) {
    if (data.length === 0) {
        return <p>Tidak ada data peminjaman.</p>;
    }

    return (
        <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
            <tr>
            <th>Nama Peminjam</th>
            <th>Ruangan</th>
            <th>Tanggal</th>
            <th>Keperluan</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
            <tr key={item.id}>
                <td>{item.namaPeminjam || "-"}</td>
                <td>{item.roomName}</td>
                <td>{item.tanggal}</td>
                <td>{item.keperluan}</td>
                <td>
                <span
                    style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    color: "white",
                    backgroundColor:
                        item.status === "approved"
                        ? "green"
                        : item.status === "rejected"
                        ? "red"
                        : "orange",
                    }}
                >
                    {item.status}
                </span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default BorrowingTable;
