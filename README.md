# PinjamRuang Frontend

## Project Title
PinjamRuang – Frontend Sistem Peminjaman Ruangan Kampus

---

## Description
PinjamRuang adalah aplikasi berbasis web yang digunakan untuk mengelola peminjaman ruangan di lingkungan kampus.

Frontend ini dibangun menggunakan React + TypeScript dan terintegrasi dengan backend API untuk melakukan proses:

- Pengajuan peminjaman ruangan
- Pengelolaan data peminjaman
- Persetujuan atau penolakan peminjaman
- Pencarian dan penyaringan data

Project ini dibuat sebagai bagian dari tugas pengembangan aplikasi berbasis Web API.

---

## Features

- Create peminjaman ruangan
- Menampilkan daftar peminjaman
- Edit data peminjaman
- Soft Delete peminjaman
- Approve / Reject status peminjaman
- Search berdasarkan nama peminjam atau ruangan
- Toast notification untuk feedback user
- Confirmation dialog sebelum perubahan status

---

## Tech Stack

- React (Vite)
- TypeScript
- Material UI (MUI)
- Axios
- React Router DOM
- React Toastify

---

## Installation

Ikuti langkah berikut untuk menjalankan project secara lokal:

### 1. Clone repository

```bash
git clone https://github.com/dindaauliaan/2026-pinjamruang-frontend.git
cd 2026-pinjamruang-frontend

### 2. Install Depedencies
npm install

### 3. konfigurasi environment
VITE_API_URL=http://localhost:5281

### 4. Menjalankan Aplikasi
npm run dev

## Intregasi Backend

Endpoint yang digunakan:

- GET /borrowings
- POST /borrowings
- PUT /borrowings/{id}
- DELETE /borrowings/{id}
- PUT /borrowings/{id}/status


