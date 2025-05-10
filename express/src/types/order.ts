export interface orderData {
    berat: number;
    koli: number;
    pembayaran: string;
    total?: number;
    ket: string;
    image: string;
    tanggal: string | Date;
    id_user: number;
    id_wilayah: number;
}